import Button from "../ui/button/Button";
import Tray from "../Tray/Tray";
import type { ResultProps } from "../../types/types";

function Result({ result, onBack }: ResultProps) {
  return (
    <div className="result-wrapper">
      <h2>Результаты расчета</h2>
      <p>Ширина: {result.size.width}мм</p>
      <p>Длина: {result.size.length}мм</p>
      <p>Высота: {result.size.height}мм</p>
      <p>Расстояние между уровнями: {result.trolleyParams.stepLength}мм</p>

      {/* Добавляем компонент чертежа тележки */}
      <Tray result={result} />

      {result.calculation && (
        <div className="calculation-details">
          <h3>Развертка:</h3>
          <ul>
            {result.calculation.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}

      <Button
        className="button_alternate"
        value="← Назад к форме"
        onClick={onBack}
      />
    </div>
  );
}

export default Result;
