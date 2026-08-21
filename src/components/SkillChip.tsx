import type { Skill } from '../lib/skills';
import { useSkillHighlight } from './SkillHighlight';

interface Props {
  skill: Skill;
  /** Smaller variant used in timeline roles and project tags. */
  small?: boolean;
}

export function SkillChip({ skill, small = false }: Props) {
  const { isActive, toggle } = useSkillHighlight();
  const active = isActive(skill.text);

  return (
    <button
      type="button"
      className={`chip${small ? ' chip--small' : ''}${active ? ' is-active' : ''}`}
      aria-pressed={active}
      onClick={() => toggle(skill.text)}
    >
      {skill.text}
    </button>
  );
}
