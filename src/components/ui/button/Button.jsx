import "./Button.css";

export default function Button({ className, value }) {
  return <button className={`button ${className}`}>{value}</button>;
}
