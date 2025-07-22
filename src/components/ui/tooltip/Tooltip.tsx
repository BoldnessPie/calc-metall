import Icon from "../icon/Icon";
import "./Tooltip.css";

interface TooltipProps {
  className?: string;
  text?: string;
}

export default function Tooltip({
  className,
  text = "Helper Text",
}: TooltipProps) {
  return (
    <div className="tooltip">
      <Icon name={"question"} className={"tooltip__icon"} />
      <div className={`tooltip__help ${className || ""}`}>{text}</div>
    </div>
  );
}
