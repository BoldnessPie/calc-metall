import "./Tray.css";
import type { CalcResult } from "../../types/types";

interface TrayProps {
  result: CalcResult;
}

function Tray({ result }: TrayProps) {
  const { size, trolleyParams } = result;
  const {
    trayWidth,
    trayLength,
    pipe,
    levels,
    stepLength,
    wheelsHeight,
    rails,
  } = trolleyParams;

  // Параметры для масштабирования чертежей
  const scale = 0.3; // Масштаб для отображения
  const margin = 50; // Отступы
  const railThickness = 1.2; // Толщина направляющих в мм (константа)

  // Размеры чертежей
  const frontViewWidth = size.width * scale + margin * 2;
  const frontViewHeight = size.height * scale + margin * 2;
  const sideViewWidth = size.length * scale + margin * 2;
  const sideViewHeight = size.height * scale + margin * 2;

  // Функция для отрисовки размерной линии
  const renderDimensionLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    text: string,
    offset: number = 20,
    isVertical: boolean = false
  ) => {
    const textX = isVertical ? x1 - offset : (x1 + x2) / 2;
    const textY = isVertical ? (y1 + y2) / 2 : Math.max(y1, y2) + offset;

    return (
      <g className="dimension-line">
        {/* Основная размерная линия */}
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#666"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
        {/* Выносные линии */}
        {isVertical ? (
          <>
            <line
              x1={x1 - 5}
              y1={y1}
              x2={x1 + 5}
              y2={y1}
              stroke="#666"
              strokeWidth="1"
            />
            <line
              x1={x2 - 5}
              y1={y2}
              x2={x2 + 5}
              y2={y2}
              stroke="#666"
              strokeWidth="1"
            />
          </>
        ) : (
          <>
            <line
              x1={x1}
              y1={y1 - 5}
              x2={x1}
              y2={y1 + 5}
              stroke="#666"
              strokeWidth="1"
            />
            <line
              x1={x2}
              y1={y2 - 5}
              x2={x2}
              y2={y2 + 5}
              stroke="#666"
              strokeWidth="1"
            />
          </>
        )}
        {/* Стрелки */}
        {isVertical ? (
          <>
            <polygon
              points={`${x1 - 3},${y1 + 5} ${x1 + 3},${y1 + 5} ${x1},${y1}`}
              fill="#666"
            />
            <polygon
              points={`${x2 - 3},${y2 - 5} ${x2 + 3},${y2 - 5} ${x2},${y2}`}
              fill="#666"
            />
          </>
        ) : (
          <>
            <polygon
              points={`${x1 - 5},${y1 - 3} ${x1 - 5},${y1 + 3} ${x1},${y1}`}
              fill="#666"
            />
            <polygon
              points={`${x2 + 5},${y2 - 3} ${x2 + 5},${y2 + 3} ${x2},${y2}`}
              fill="#666"
            />
          </>
        )}
        <text
          x={textX}
          y={isVertical ? textY + 10 : textY - 10}
          textAnchor="middle"
          fontSize="12"
          fill="#333"
          transform={isVertical ? `rotate(-90 ${textX} ${textY})` : undefined}
        >
          {text}
        </text>
      </g>
    );
  };

  // Отрисовка вида спереди
  const renderFrontView = () => {
    const cartWidth = size.width * scale;
    const cartHeight = (size.height - wheelsHeight) * scale;
    const wheelHeight = wheelsHeight * scale;
    const pipeThickness = pipe * scale;

    const startX = margin;
    const startY = margin + wheelHeight;

    return (
      <svg width={frontViewWidth} height={frontViewHeight} className="drawing">
        {/* Основная рама тележки - внешний контур */}
        <rect
          x={startX}
          y={startY}
          width={cartWidth}
          height={cartHeight}
          fill="none"
          stroke="#333"
          strokeWidth="2"
        />

        {/* Внутренний контур (показывает толщину трубы) */}
        <rect
          x={startX + pipeThickness}
          y={startY + pipeThickness}
          width={cartWidth - 2 * pipeThickness}
          height={cartHeight - 2 * pipeThickness}
          fill="none"
          stroke="#666"
          strokeWidth="1"
        />

        {/* Вертикальные стойки */}
        <rect
          x={startX}
          y={startY}
          width={pipeThickness}
          height={cartHeight}
          fill="#ddd"
          stroke="#333"
          strokeWidth="1"
        />
        <rect
          x={startX + cartWidth - pipeThickness}
          y={startY}
          width={pipeThickness}
          height={cartHeight}
          fill="#ddd"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Горизонтальные трубы сверху и снизу */}
        <rect
          x={startX}
          y={startY}
          width={cartWidth}
          height={pipeThickness}
          fill="#ddd"
          stroke="#333"
          strokeWidth="1"
        />
        <rect
          x={startX}
          y={startY + cartHeight - pipeThickness}
          width={cartWidth}
          height={pipeThickness}
          fill="#ddd"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Уровни для противней */}
        {Array.from({ length: levels }, (_, i) => {
          const levelY = startY + cartHeight - (i + 1) * (stepLength * scale);
          const railWidth = rails[1] * scale; // Ширина направляющих
          const scaledRailThickness = railThickness * scale; // Масштабированная толщина направляющих
          return (
            <g key={i}>
              {/* Левая направляющая (рельс) */}
              <rect
                x={startX + pipeThickness}
                y={levelY - scaledRailThickness / 2}
                width={railWidth}
                height={scaledRailThickness}
                fill="#eee"
                stroke="#666"
                strokeWidth="1"
              />
              {/* Правая направляющая (рельс) */}
              <rect
                x={startX + cartWidth - pipeThickness - railWidth}
                y={levelY - scaledRailThickness / 2}
                width={railWidth}
                height={scaledRailThickness}
                fill="#eee"
                stroke="#666"
                strokeWidth="1"
              />
            </g>
          );
        })}

        {/* Колеса под тележкой (вид спереди - прямоугольники) */}
        <g>
          {/* Левое колесо */}
          <rect
            x={startX + 15}
            y={startY + cartHeight}
            width={15}
            height={wheelHeight}
            fill="#ccc"
            stroke="#333"
            strokeWidth="2"
          />
          {/* Правое колесо */}
          <rect
            x={startX + cartWidth - 30}
            y={startY + cartHeight}
            width={15}
            height={wheelHeight}
            fill="#ccc"
            stroke="#333"
            strokeWidth="2"
          />
        </g>

        {/* Размерные линии */}
        {renderDimensionLine(
          startX,
          startY - 35,
          startX + cartWidth,
          startY - 35,
          `${size.width}мм`
        )}
        {renderDimensionLine(
          startX - 40,
          startY,
          startX - 40,
          startY + cartHeight + wheelHeight,
          `${size.height}мм`,
          0,
          true
        )}
        {renderDimensionLine(
          startX,
          startY - 15,
          startX + pipeThickness,
          startY - 15,
          `${pipe}мм`
        )}

        <text
          x={frontViewWidth / 2}
          y={35}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
        >
          Вид спереди
        </text>
      </svg>
    );
  };

  // Отрисовка вида сбоку
  const renderSideView = () => {
    const cartLength = size.length * scale;
    const cartHeight = (size.height - wheelsHeight) * scale;
    const wheelHeight = wheelsHeight * scale;
    const pipeThickness = pipe * scale;

    const startX = margin;
    const startY = margin + wheelHeight;

    return (
      <svg width={sideViewWidth} height={sideViewHeight} className="drawing">
        {/* Основная рама тележки - внешний контур */}
        <rect
          x={startX}
          y={startY}
          width={cartLength}
          height={cartHeight}
          fill="none"
          stroke="#333"
          strokeWidth="2"
        />

        {/* Внутренний контур */}
        <rect
          x={startX + pipeThickness}
          y={startY + pipeThickness}
          width={cartLength - 2 * pipeThickness}
          height={cartHeight - 2 * pipeThickness}
          fill="none"
          stroke="#666"
          strokeWidth="1"
        />

        {/* Вертикальные стойки на концах */}
        <rect
          x={startX}
          y={startY}
          width={pipeThickness}
          height={cartHeight}
          fill="#ddd"
          stroke="#333"
          strokeWidth="1"
        />
        <rect
          x={startX + cartLength - pipeThickness}
          y={startY}
          width={pipeThickness}
          height={cartHeight}
          fill="#ddd"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Горизонтальные трубы сверху и снизу */}
        <rect
          x={startX}
          y={startY}
          width={cartLength}
          height={pipeThickness}
          fill="#ddd"
          stroke="#333"
          strokeWidth="1"
        />
        <rect
          x={startX}
          y={startY + cartHeight - pipeThickness}
          width={cartLength}
          height={pipeThickness}
          fill="#ddd"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Направляющие для противней */}
        {Array.from({ length: levels }, (_, i) => {
          const levelY = startY + cartHeight - (i + 1) * (stepLength * scale);
          return (
            <g key={i}>
              {/* Горизонтальные направляющие */}
              <rect
                x={startX + pipeThickness}
                y={levelY - pipeThickness / 2}
                width={cartLength - 2 * pipeThickness}
                height={pipeThickness}
                fill="#eee"
                stroke="#666"
                strokeWidth="1"
              />
              {/* Показываем направляющие по бокам */}
              <rect
                x={startX + 20}
                y={levelY - 2}
                width={cartLength - 40}
                height={4}
                fill="#bbb"
                stroke="#666"
                strokeWidth="0.5"
              />
            </g>
          );
        })}

        {/* Колеса под тележкой */}
        <g>
          <circle
            cx={startX + 40}
            cy={startY + cartHeight + wheelHeight / 2 + wheelHeight / 3}
            r={wheelHeight / 3}
            fill="#ccc"
            stroke="#333"
            strokeWidth="2"
          />
          <circle
            cx={startX + 40}
            cy={startY + cartHeight + wheelHeight / 2 + wheelHeight / 3}
            r={wheelHeight / 6}
            fill="#666"
            stroke="#333"
            strokeWidth="1"
          />
          <circle
            cx={startX + cartLength - 40}
            cy={startY + cartHeight + wheelHeight / 2 + wheelHeight / 3}
            r={wheelHeight / 3}
            fill="#ccc"
            stroke="#333"
            strokeWidth="2"
          />
          <circle
            cx={startX + cartLength - 40}
            cy={startY + cartHeight + wheelHeight / 2 + wheelHeight / 3}
            r={wheelHeight / 6}
            fill="#666"
            strokeWidth="1"
          />
        </g>

        {/* Треугольные колесные опоры */}
        <g>
          {/* Передняя опора */}
          <polygon
            points={`${startX + 40},${
              startY + cartHeight + wheelHeight / 2 + wheelHeight / 3
            } ${startX + 25},${startY + cartHeight} ${startX + 55},${
              startY + cartHeight
            }`}
            fill="#bbb"
            stroke="#333"
            strokeWidth="1"
          />
          {/* Задняя опора */}
          <polygon
            points={`${startX + cartLength - 40},${
              startY + cartHeight + wheelHeight / 2 + wheelHeight / 3
            } ${startX + cartLength - 55},${startY + cartHeight} ${
              startX + cartLength - 25
            },${startY + cartHeight}`}
            fill="#bbb"
            stroke="#333"
            strokeWidth="1"
          />
        </g>

        {/* Размерные линии */}
        {renderDimensionLine(
          startX,
          startY - 35,
          startX + cartLength,
          startY - 35,
          `${size.length}мм`
        )}
        {renderDimensionLine(
          startX - 40,
          startY,
          startX - 40,
          startY + cartHeight + wheelHeight,
          `${size.height}мм`,
          0,
          true
        )}

        {/* Размер между уровнями */}
        {levels > 1 &&
          (() => {
            const level1Y = startY + cartHeight - stepLength * scale;
            const level2Y = startY + cartHeight - 2 * stepLength * scale;
            return renderDimensionLine(
              startX - 20,
              level1Y,
              startX - 20,
              level2Y,
              `${stepLength}мм`,
              0,
              true
            );
          })()}

        <text
          x={sideViewWidth / 2}
          y={35}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
        >
          Вид сбоку
        </text>
      </svg>
    );
  };

  return (
    <div className="tray">
      <h3>Чертеж тележки</h3>
      <div className="tray__drawings">
        <div className="tray__drawing">{renderFrontView()}</div>
        <div className="tray__drawing">{renderSideView()}</div>
      </div>

      <div className="tray__specifications">
        <h4>Технические характеристики:</h4>
        <ul>
          <li>
            Габариты тележки: {result.size.width}x{result.size.length}x
            {result.size.height}мм
          </li>
          <li>
            Под противень: {trayWidth}×{trayLength}мм
          </li>
          <li>Уровней: {levels}</li>
          <li>Расстояние между уровнями: {stepLength}мм</li>
          <li>
            Размкер трубы: {pipe}×{pipe}мм
          </li>
          <li>Диаметр колес: D - {result.calculation.wheelsDiameter}мм</li>
        </ul>
      </div>
    </div>
  );
}

export default Tray;
