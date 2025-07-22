import "./Radio.css";

interface RadioProps {
  name: string;
  legend: string;
  defaultChecked?: boolean;
  onChange?: () => void;
}

export default function Radio({
  name,
  legend,
  defaultChecked,
  onChange,
}: RadioProps) {
  return (
    <div className="radio">
      <input
        type="radio"
        id={`${name}-${legend}`}
        name={name}
        className="radio__control"
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <label htmlFor={`${name}-${legend}`} className="radio__label">
        <div className="radio__legend">{legend}</div>
      </label>
    </div>
  );
}
