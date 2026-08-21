import { useEffect, useRef } from 'react';
import { GearGlyph } from './GearGlyph';
import './RotatingWord.css';

const INTERVAL = 3000;
const OUT_DURATION = 300;
const IN_DURATION = 460;
const EASE = 'cubic-bezier(0.33, 0, 0.15, 1)';
/** Degrees the inline glyph turns on each word swap. */
const GLYPH_TURN = -120;

interface Props {
  words: readonly string[];
  paused: boolean;
}

/**
 * The headline's cycling word. Driven by the Web Animations API against the DOM
 * node rather than React state — the text swaps at the midpoint of the out
 * animation, which is easier to time imperatively than through a render.
 */
export function RotatingWord({ words, paused }: Props) {
  const wordRef = useRef<HTMLSpanElement>(null);
  const glyphRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (paused || words.length < 2) return;

    let index = 0;
    let turn = 0;

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
        const from = turn;
        turn += GLYPH_TURN;
        glyph.animate([{ transform: `rotate(${from}deg)` }, { transform: `rotate(${turn}deg)` }], {
          duration: 760,
          easing: 'cubic-bezier(0.5, 0, 0.2, 1)',
          fill: 'forwards',
        });
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

    return () => clearInterval(timer);
  }, [words, paused]);

  return (
    <>
      <GearGlyph ref={glyphRef} size="0.62em" className="rotating-word__glyph" />I build{' '}
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
