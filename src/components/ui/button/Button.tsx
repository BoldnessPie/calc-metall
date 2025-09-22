import "./Button.css";

interface ButtonProps {
  className?: string;
  value: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  className,
  value,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      className={`button ${className || ""}`}
      onClick={onClick}
      type={type}
    >
      {value}
    </button>
  );
}
