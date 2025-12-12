import "../Result.css";
import "./Result.css";
import Button from "../../ui/button/Button";
import Tray from "../../visualization/Trolley/View";
import type { ResultProps } from "../../../types/Trolley/calculatorTypes";

// Компонент трубы со скосами 45° на обоих концах (симметрично)
const PipeWithBevels = ({ length }: { length: number }) => {
  return (
    <svg className="pipe-svg" viewBox="0 0 100 40">
      {/* Основное тело трубы */}
      <rect x="15" y="10" width="70" height="20" className="pipe-bevel" />

      {/* Левый скос 45° - треугольник */}
      <polygon points="15,10 5,10 15,30" className="pipe-bevel" />

      {/* Правый скос 45° - треугольник (зеркально) */}
      <polygon points="85,10 95,10 85,30" className="pipe-bevel" />

      {/* Размер */}
      <text x="50" y="45" fontSize="12" fill="#555" textAnchor="middle">
        {length}мм
      </text>
    </svg>
  );
};

// Компонент прямой трубы
const StraightPipe = ({ length }: { length: number }) => {
  return (
    <svg className="pipe-svg" viewBox="0 0 100 40">
      {/* Тело трубы */}
      <rect x="10" y="12" width="80" height="16" className="pipe-body" />

      {/* Размер */}
      <text x="50" y="45" fontSize="12" fill="#555" textAnchor="middle">
        {length}мм
      </text>
    </svg>
  );
};

// Компонент направляющей
const RailVisual = () => {
  return (
    <div className="rail-visual">
      <div className="rail-shape" />
    </div>
  );
};

// Компонент колеса
const WheelVisual = ({ diameter }: { diameter: number }) => {
  return (
    <svg className="wheel-svg" viewBox="0 0 60 60">
      {/* Шина */}
      <circle cx="25" cy="25" r="20" className="wheel-tire" />

      {/* Ступица */}
      <circle cx="25" cy="25" r="8" className="wheel-hub" />

      {/* Спицы */}
      <line x1="25" y1="17" x2="25" y2="33" className="wheel-spokes" />
      <line x1="17" y1="25" x2="33" y2="25" className="wheel-spokes" />
      <line x1="19.5" y1="19.5" x2="30.5" y2="30.5" className="wheel-spokes" />
      <line x1="30.5" y1="19.5" x2="19.5" y2="30.5" className="wheel-spokes" />

      {/* Размер */}
      <text x="25" y="60" fontSize="12" fill="#333" textAnchor="middle">
        D{diameter}
      </text>
    </svg>
  );
};

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

        <div className="trolley-result__details">
          {/* Секция труб */}
          <div className="trolley-result__section">
            <h3 className="trolley-result__section-title">Трубы</h3>
            <div className="trolley-result__items">
              {/* Труба по длине */}
              <div className="trolley-result__item">
                <div className="trolley-result__item-visual">
                  <PipeWithBevels length={result.calculations.pipeL} />
                </div>
                <div className="trolley-result__item-info">
                  <div className="trolley-result__item-label">
                    По длине (скосы 45°)
                  </div>
                  <div className="trolley-result__item-value">
                    {result.calculations.pipeType}
                  </div>
                  <div className="trolley-result__item-value">
                    L = {result.calculations.pipeL}мм
                  </div>
                  <div className="trolley-result__item-count">4 шт</div>
                </div>
              </div>

              {/* Труба по ширине */}
              <div className="trolley-result__item">
                <div className="trolley-result__item-visual">
                  <PipeWithBevels length={result.calculations.pipeW} />
                </div>
                <div className="trolley-result__item-info">
                  <div className="trolley-result__item-label">
                    По ширине (скосы 45°)
                  </div>
                  <div className="trolley-result__item-value">
                    {result.calculations.pipeType}
                  </div>
                  <div className="trolley-result__item-value">
                    L = {result.calculations.pipeW}мм
                  </div>
                  <div className="trolley-result__item-count">4 шт</div>
                </div>
              </div>

              {/* Вертикальная труба */}
              <div className="trolley-result__item">
                <div className="trolley-result__item-visual">
                  <StraightPipe length={result.calculations.pipeH} />
                </div>
                <div className="trolley-result__item-info">
                  <div className="trolley-result__item-label">
                    Вертикальная (прямая)
                  </div>
                  <div className="trolley-result__item-value">
                    {result.calculations.pipeType}
                  </div>
                  <div className="trolley-result__item-value">
                    L = {result.calculations.pipeH}мм
                  </div>
                  <div className="trolley-result__item-count">4 шт</div>
                </div>
              </div>

              {/* Опорная труба */}
              <div className="trolley-result__item">
                <div className="trolley-result__item-visual">
                  <PipeWithBevels length={200} />
                </div>
                <div className="trolley-result__item-info">
                  <div className="trolley-result__item-label">
                    Перемычка (скосы 45°)
                  </div>
                  <div className="trolley-result__item-value">
                    {result.calculations.pipeType}
                  </div>
                  <div className="trolley-result__item-value">L = 200мм</div>
                  <div className="trolley-result__item-count">4 шт</div>
                </div>
              </div>
            </div>
          </div>

          {/* Секция комплектующих */}
          <div className="trolley-result__section">
            <h3 className="trolley-result__section-title">Комплектующие</h3>
            <div className="trolley-result__items">
              {/* Направляющие */}
              <div className="trolley-result__item">
                <div className="trolley-result__item-visual">
                  <RailVisual />
                </div>
                <div className="trolley-result__item-info">
                  <div className="trolley-result__item-label">Направляющие</div>
                  <div className="trolley-result__item-value">
                    {result.trolleyParams.rails.type}
                  </div>
                  <div className="trolley-result__item-value">
                    {result.trolleyParams.rails.length}×
                    {Number(result.trolleyParams.rails.width) + 20}мм
                  </div>
                  <div className="trolley-result__item-value">
                    Толщина:{" "}
                    {Number(result.trolleyParams.rails.thickness).toFixed(1)}
                    мм
                  </div>
                  <div className="trolley-result__item-count">
                    {result.trolleyParams.levels * 2} шт
                  </div>
                </div>
              </div>

              {/* Колеса */}
              <div className="trolley-result__item">
                <div className="trolley-result__item-visual">
                  <WheelVisual diameter={result.calculations.wheelsDiameter} />
                </div>
                <div className="trolley-result__item-info">
                  <div className="trolley-result__item-label">Колеса</div>
                  <div className="trolley-result__item-value">
                    {result.calculations.wheelsType}
                  </div>
                  <div className="trolley-result__item-value">
                    D = {result.calculations.wheelsDiameter}мм
                  </div>
                  <div className="trolley-result__item-count">4 шт</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
