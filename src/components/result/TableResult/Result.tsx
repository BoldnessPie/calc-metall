import type { ResultProps } from "../../../types/Table/calculatorTypes";
import "../Result.css";
import Button from "../../ui/button/Button";
import TableView from "../../visualization/Table/View";

function Result({ result, onBack }: ResultProps) {
  return (
    <div className="result">
      <Button
        className="button_alternate result__btn"
        value="← Назад к форме"
        onClick={onBack}
      />
      {/* Визуализация стола */}
      <TableView result={result} />

      <div className="result__container">
        <h2 className="result__title">Результаты расчета</h2>

        <div className="result__wrap">
          <ul>
            <h4>Труба:</h4>
            <li>Высота: {result.calculation.pipe.height}</li>
            <li>Ширина (верхняя часть): {result.calculation.pipe.top.width}</li>
            <li>Длина (верхняя часть): {result.calculation.pipe.top.length}</li>
            <li>
              Ширина (нижняя часть): {result.calculation.pipe.bottom.width}
            </li>
            <li>
              Длина (нижняя часть): {result.calculation.pipe.bottom.length}
            </li>
            <li>Шаг: {result.calculation.step}</li>
          </ul>

          <ul>
            <h4>Лист:</h4>
            <li>{result.calculation.sheets.tableTop}</li>
            <li>{result.calculation.sheets.tableAside}</li>
            {result.calculation.sheets.tableShelf && (
              <li>{result.calculation.sheets.tableShelf}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Result;
