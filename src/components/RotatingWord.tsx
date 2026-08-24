import { useEffect, useRef } from 'react';
import type { ThemeId } from '../data/themes';
import { marchLikeGear } from './InvaderGlyph';
import { ThemeGlyph } from './ThemeGlyph';
import './RotatingWord.css';

const INTERVAL = 3000;
const OUT_DURATION = 300;
const IN_DURATION = 460;
const EASE = 'cubic-bezier(0.33, 0, 0.15, 1)';
// Degrees the inline glyph turns on each word swap, and how long the turn takes.
// The sprite marches over the same window — see marchLikeGear.
const GLYPH_TURN = -120;
const GLYPH_DURATION = 760;

interface Props {
  words: readonly string[];
  theme: ThemeId;
  paused: boolean;
}

/**
 * The headline's cycling word. Driven by the Web Animations API against the DOM
 * node rather than React state — the text swaps at the midpoint of the out
 * animation, which is easier to time imperatively than through a render.
 */
export function RotatingWord({ words, theme, paused }: Props) {
  const wordRef = useRef<HTMLSpanElement>(null);
  const glyphRef = useRef<SVGSVGElement>(null);
  const arcade = theme === 'arcade';

  useEffect(() => {
    if (paused || words.length < 2) return;

    let index = 0;
    let turn = 0;
    let stopMarch: (() => void) | undefined;

    const spinGear = (glyph: SVGSVGElement) => {
      const from = turn;
      turn += GLYPH_TURN;
      glyph.animate([{ transform: `rotate(${from}deg)` }, { transform: `rotate(${turn}deg)` }], {
        duration: GLYPH_DURATION,
        easing: 'cubic-bezier(0.5, 0, 0.2, 1)',
        fill: 'forwards',
      });
    };

    const timer = setInterval(() => {
      const word = wordRef.current;
      if (!word) return;

      const out = word.animate(
        [
          { transform: 'translateY(0)', opacity: 1 },
          { transform: 'translateY(-105%)', opacity: 0 },
        ],
        { duration: OUT_DURATION, easing: EASE, fill: 'forwards' },
      );

      const glyph = glyphRef.current;
      if (glyph) {
        if (arcade) {
          stopMarch?.();
          stopMarch = marchLikeGear(glyph, GLYPH_TURN, GLYPH_DURATION);
        } else {
          spinGear(glyph);
        }
      }

      out.onfinish = () => {
        index = (index + 1) % words.length;
        word.textContent = words[index];
        out.cancel();
        word.animate(
          [
            { transform: 'translateY(105%)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 },
          ],
          { duration: IN_DURATION, easing: EASE },
        );
      };
    }, INTERVAL);

    return () => {
      clearInterval(timer);
      stopMarch?.();
    };
  }, [words, paused, arcade]);

  return (
    <>
      <ThemeGlyph ref={glyphRef} theme={theme} size="0.62em" className="rotating-word__glyph" />I
      build{' '}
      <span className="rotating-word__mask">
        <span ref={wordRef} className="rotating-word__word">
          {words[0]}
        </span>
      </span>
      <br />
      software systems
    </>
  );
}
