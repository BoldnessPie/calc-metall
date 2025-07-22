import "./Input.css";

interface InputProps {
  legend: string;
  anchor: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export default function Input({
  legend,
  anchor,
  placeholder,
  value,
  onChange,
  type = "text",
}: InputProps) {
  return (
    <div className="input">
      <label htmlFor={anchor} className="input__legend">
        {legend}
      </label>
      <input
        type={type}
        id={anchor}
        className="input__control"
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
      />
    </div>
  );
}
