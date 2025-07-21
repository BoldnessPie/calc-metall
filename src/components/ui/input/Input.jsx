import Icon from "../Icon/Icon.jsx";
import "./Input.css";

export default function Input({ legend, anchor, className, placeholder }) {
  return (
    <div className="input">
      <label htmlFor={anchor} className="input__legend">
        {legend}
      </label>

      <div className={`input__state input_${className}`}>
        <input
          placeholder={placeholder}
          type="text"
          id={anchor}
          className="input__control"
        />

        <Icon name={"success"} className={"input__icon input__icon_success"} />
        <Icon name={"error"} className={"input__icon input__icon_error"} />
      </div>
    </div>
  );
}
