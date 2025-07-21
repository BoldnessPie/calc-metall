export default function Icon({ name, className }) {
  return (
    <svg className={className}>
      <use href={`./src/assets/images/sprites/icons.svg#icon-${name}`}></use>
    </svg>
  );
}
