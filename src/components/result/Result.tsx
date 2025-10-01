import Button from "../ui/button/Button";
import Tray from "../Tray/Tray";
import type { ResultProps } from "../../types/types";

function Result({ result, onBack }: ResultProps) {
  return (
    <div className="result">
      <h2 className="result__title">Результаты расчета</h2>
      <div className="result__wrap">
        <p>
          Трубы: L- {result.calculation.pipeL}мм 4шт, L -
          {result.calculation.pipeH}мм 4шт, L - {result.calculation.pipeW}мм
          4шт, L - 180мм 4шт
        </p>
        <p>Направляющие: {result.trolleyParams.rails.join("x")}мм</p>
        <p>
          Колеса: {result.calculation.wheelsType}, D -
          {result.calculation.wheelsDiameter}мм 4шт
        </p>
      </div>

      {/* Добавляем компонент чертежа тележки */}
      <Tray result={result} />

      <Button
        className="button_alternate"
        value="← Назад к форме"
        onClick={onBack}
      />
    </div>
  );
}

export default Result;
