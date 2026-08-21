import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { normalizeSkill } from '../lib/skills';

interface SkillHighlightValue {
  isActive: (name: string) => boolean;
  toggle: (name: string) => void;
  clear: () => void;
  hasActive: boolean;
}

const SkillHighlightContext = createContext<SkillHighlightValue | null>(null);

/**
 * The page-wide highlight set. Chips live in three different sections, so the state
 * they share sits above all of them rather than being threaded through props.
 */
export function SkillHighlightProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<string[]>([]);

  const value = useMemo<SkillHighlightValue>(
    () => ({
      isActive: (name) => active.includes(normalizeSkill(name)),
      toggle: (name) =>
        setActive((current) => {
          const key = normalizeSkill(name);
          return current.includes(key) ? current.filter((k) => k !== key) : [...current, key];
        }),
      clear: () => setActive([]),
      hasActive: active.length > 0,
    }),
    [active],
  );

  return <SkillHighlightContext.Provider value={value}>{children}</SkillHighlightContext.Provider>;
}

export function useSkillHighlight(): SkillHighlightValue {
  const value = useContext(SkillHighlightContext);
  if (!value) throw new Error('useSkillHighlight must be used inside SkillHighlightProvider');
  return value;
}
