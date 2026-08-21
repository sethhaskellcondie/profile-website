import { useSkillHighlight } from './SkillHighlight';

interface Props {
  name: string;
  /** Smaller variant used in timeline roles and project tags. */
  small?: boolean;
}

export function SkillChip({ name, small = false }: Props) {
  const { isActive, toggle } = useSkillHighlight();
  const active = isActive(name);

  return (
    <button
      type="button"
      className={`chip${small ? ' chip--small' : ''}${active ? ' is-active' : ''}`}
      aria-pressed={active}
      onClick={() => toggle(name)}
    >
      {name}
    </button>
  );
}
