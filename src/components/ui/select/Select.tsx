import "./Select.css";

interface SelectProps {
  legend: string;
  anchor: string;
  options: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
}

export default function Select({
  legend,
  anchor,
  options,
  value,
  onChange,
  placeholder = "Выберите",
}: SelectProps) {
  return (
    <div className="select">
      <label htmlFor={anchor} className="select__legend">
        {legend}
      </label>
      <select
        id={anchor}
        className="select__control"
        value={value || ""}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
