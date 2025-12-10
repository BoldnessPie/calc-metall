import type { ResultProps } from "../../../types/Shelve/calculatorTypes";
import "../Result.css";
import Button from "../../ui/button/Button";
import ShelveView from "../../visualization/Shelve/View";

function Result({ result, onBack }: ResultProps) {
  return (
    <div className="result">
      <Button
        className="button_alternate result__btn"
        value="← Назад к форме"
        onClick={onBack}
      />
      {/* Визуализация стеллажа */}
      <ShelveView result={result} />

      <div className="result__container">
        <h2 className="result__title">Результаты расчета</h2>

        <div className="result__wrap">
          <ul>
            Труба:
            <li>Высота: {result.calculation.pipe.height}</li>
            <li>Ширина верхней полки: {result.calculation.pipe.width}</li>
            <li>Длина верхней полки: {result.calculation.pipe.length}</li>
            <li>Ширина боковых полок: {result.calculation.aside.width}</li>
            <li>Длина боковых полок: {result.calculation.aside.length}</li>
            <li>Шаг: {result.calculation.step}</li>
          </ul>

          <ul>
            {" "}
            Листы:
            <li>
              {result.calculation.steelSheets[0] +
                "x" +
                result.calculation.steelSheets[1] +
                " " +
                result.calculation.steelSheets[2]}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Result;
