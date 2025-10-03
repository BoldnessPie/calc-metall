import "./Result.css";
import Button from "../ui/button/Button";
import Tray from "../Tray/Tray";
import type { ResultProps } from "../../types/types";

function Result({ result, onBack }: ResultProps) {
  return (
    <div className="result">
      <Button
        className="button_alternate result__btn"
        value="← Назад к форме"
        onClick={onBack}
      />

      {/* Добавляем компонент чертежа тележки */}
      <Tray result={result} />

      <div className="result__container">
        <h2 className="result__title">Результаты расчета</h2>
        <div className="result__wrap">
          <p>
            Трубы: L- {result.calculation.pipeL}мм 4шт, L -
            {result.calculation.pipeH}мм 4шт, L - {result.calculation.pipeW}мм
            4шт, L - 180мм 4шт
          </p>
          <p>
            Направляющие: {result.trolleyParams.rails[0]}x
            {result.trolleyParams.rails[1] + 20}мм, толщина:{" "}
            {result.trolleyParams.rails[2] || <b>Уточнить отдельно</b>}
            {/* захардкодил 20мм, это высота направляющей для общего расчета для резки */}
          </p>
          <p>
            Колеса: {result.calculation.wheelsType}, D-
            {result.calculation.wheelsDiameter}мм 4шт
          </p>
        </div>
      </div>
    </div>
  );
}

export default Result;
