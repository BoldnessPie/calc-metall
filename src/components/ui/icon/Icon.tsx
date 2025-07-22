interface IconProps {
  name: string;
  className?: string;
}

export default function Icon({ name, className }: IconProps) {
  return (
    <svg className={className}>
      <use href={`./src/assets/images/sprites/icons.svg#icon-${name}`}></use>
    </svg>
  );
}
