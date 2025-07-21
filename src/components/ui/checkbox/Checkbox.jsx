import "./Checkbox.css";
import Icon from "../Icon/Icon.jsx";
export default function Checkbox({ legend, disabled, defaultChecked }) {
  return (
    <label className="checkbox">
      <input
        defaultChecked={defaultChecked}
        disabled={disabled}
        type="checkbox"
        className="checkbox__input"
      />
      <div className="checkbox__state">
        <div className="checkbox__control">
          <Icon className={"checkbox__icon"} name={"check"} />
        </div>
        <div className="checkbox__legend">{legend}</div>
      </div>
    </label>
  );
}
