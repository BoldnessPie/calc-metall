import "./Radio.css";

export default function Radio({ name, legend, defaultChecked, disabled }) {
  return (
    <label className="radio">
      <input
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="radio__input"
        type="radio"
        name={name}
      />
      <div className="radio__state">
        <div className="radio__control">
          <div className="radio__icon"></div>
        </div>
        <div className="radio__legend">{legend}</div>
      </div>
    </label>
  );
}
