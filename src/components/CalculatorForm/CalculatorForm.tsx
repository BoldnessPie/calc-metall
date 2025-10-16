import "./CalculatorForm.css";
import type { CalculatorFormProps } from "../../types/generalTypes";
import Trolley from "../Trolley/Trolley";
import Table from "../Table/Table";
import Shelve from "../Shelve/Shelve";
import Sink from "../Sink/Sink";

function CalculatorForm({ category, onBack }: CalculatorFormProps) {
  switch (category) {
    case "trolleys":
      return <Trolley onBack={onBack} />;
    case "tables":
      return <Table onBack={onBack} />;
    case "shelves":
      return <Shelve onBack={onBack} />;
    case "sinks":
      return <Sink onBack={onBack} />;

    default:
      return (
        <div className="form-wrapper">
          <div className="form__back">
            <button onClick={onBack}>← Назад к выбору категории</button>
          </div>
          <p>Неизвестная категория</p>
        </div>
      );
  }
}

export default CalculatorForm;
