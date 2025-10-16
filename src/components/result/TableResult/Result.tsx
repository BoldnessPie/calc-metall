import type { ResultProps } from "../../../types/Table/calculatorTypes";
import "../Result.css";
import Button from "../../ui/button/Button";

function Result({ result, onBack }: ResultProps) {
  return (
    <div className="result">
      <Button
        className="button_alternate result__btn"
        value="← Назад к форме"
        onClick={onBack}
      />
      <div className="result__container">
        <h2 className="result__title">Результаты расчета</h2>
        <div className="result__wrap">
          <p>
            Трубы: L- {result.calculation.pipe.height}, L-{" "}
            {result.calculation.pipe.top.width}, L-{" "}
            {result.calculation.pipe.top.length}, L-{" "}
            {result.calculation.pipe.bottom.width}, L-{" "}
            {result.calculation.pipe.bottom.length}
          </p>
          <p>
            Лист: {result.calculation.sheets.top},{" "}
            {result.calculation.sheets.aside}, {result.calculation.sheets.shelf}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Result;
