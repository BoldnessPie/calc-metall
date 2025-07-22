import "./Button.css";

interface ButtonProps {
  className?: string;
  value: string;
  onclick?: () => void;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  className,
  value,
  onclick,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      className={`button ${className || ""}`}
      onClick={onclick || onClick}
      type={type}
    >
      {value}
    </button>
  );
}
