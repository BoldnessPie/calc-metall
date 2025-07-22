import "./Checkbox.css";

interface CheckboxProps {
  legend: string;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
  legend,
  defaultChecked,
  onChange,
}: CheckboxProps) {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id={legend}
        className="checkbox__control"
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <label htmlFor={legend} className="checkbox__label">
        {legend}
      </label>
    </div>
  );
}
