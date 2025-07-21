import Icon from "../Icon/Icon.jsx";
import "./Tooltip.css";

export default function Tooltip({ className }) {
  return (
    <div className="tooltip">
      <Icon name={"question"} className={"tooltip__icon"} />
      <div className={`tooltip__help ${className}`}>Helper Text</div>
    </div>
  );
}
