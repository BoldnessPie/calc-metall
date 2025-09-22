import "./Input.css";

interface InputProps {
  legend: string;
  anchor: string;
  placeholder?: string;
  value?: string;
  min?: number;
  max?: number;
  isError?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  type?: string;
}

export default function Input({
  legend,
  anchor,
  placeholder,
  value,
  min,
  max,
  isError = false,
  onChange,
  onBlur,
  type = "text",
}: InputProps) {
  return (
    <div className={`input ${isError ? "input_error" : ""}`}>
      <label htmlFor={anchor} className="input__legend">
        {legend}
      </label>
      <input
        type={type}
        id={anchor}
        className="input__control"
        placeholder={placeholder}
        value={value || ""}
        min={min}
        max={max}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}
