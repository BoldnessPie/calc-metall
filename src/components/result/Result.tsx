import Button from "../ui/button/Button";

interface CalculationItem {
  name: string;
}

interface ResultProps {
  result: {
    width: number;
    length: number;
    height: number;
    trayDistance: number;
    calculation?: CalculationItem[];
  };
  onBack: () => void;
}

function Result({ result, onBack }: ResultProps) {
  return (
    <div className="result-wrapper">
      <h2>Результаты расчета</h2>
      <p>Ширина: {result.width}мм</p>
      <p>Длина: {result.length}мм</p>
      <p>Высота: {result.height}мм</p>
      <p>Расстояние между уровнями: {result.trayDistance}мм</p>

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
