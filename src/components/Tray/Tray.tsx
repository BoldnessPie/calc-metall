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
  const margin = 40; // Отступы внутри SVG
  const railThickness = 1.2; // Толщина направляющих в мм (константа)

  // Адаптивные размеры контейнеров
  const getContainerSize = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 480) {
        return { width: 300, height: 240 };
      } else if (window.innerWidth <= 768) {
        return { width: 350, height: 280 };
      }
    }
    return { width: 400, height: 350 };
  };

  const containerSize = getContainerSize();
  const containerWidth = containerSize.width;
  const containerHeight = containerSize.height;

  // Вычисляем оптимальный масштаб для каждого вида
  const calculateScale = (actualWidth: number, actualHeight: number) => {
    const availableWidth = containerWidth - margin * 2;
    const availableHeight = containerHeight - margin * 2 - 40; // 40px для заголовка и размерных линий

    const scaleByWidth = availableWidth / actualWidth;
    const scaleByHeight = availableHeight / actualHeight;

    return Math.min(scaleByWidth, scaleByHeight, 0.4); // Максимальный масштаб 0.4
  };

  const frontViewScale = calculateScale(size.width, size.height);
  const sideViewScale = calculateScale(size.length, size.height);

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
    const scale = frontViewScale;
    const cartWidth = size.width * scale;
    const cartHeight = (size.height - wheelsHeight) * scale;
    const wheelHeight = wheelsHeight * scale;
    const pipeThickness = pipe * scale;

    const startX = (containerWidth - cartWidth) / 2; // Центрируем по горизонтали
    const startY = margin + wheelHeight;

    return (
      <svg width={containerWidth} height={containerHeight} className="drawing">
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

        {/* Колеса под тележкой */}
        <g>
          <circle
            cx={startX + Math.max(30 * scale, cartWidth * 0.15)}
            cy={startY + cartHeight + wheelHeight / 2 + wheelHeight / 3}
            r={wheelHeight / 3}
            fill="#ccc"
            stroke="#333"
            strokeWidth="2"
          />
          <circle
            cx={startX + Math.max(30 * scale, cartWidth * 0.15)}
            cy={startY + cartHeight + wheelHeight / 2 + wheelHeight / 3}
            r={wheelHeight / 6}
            fill="#666"
            stroke="#333"
            strokeWidth="1"
          />
          <circle
            cx={startX + cartWidth - Math.max(30 * scale, cartWidth * 0.15)}
            cy={startY + cartHeight + wheelHeight / 2 + wheelHeight / 3}
            r={wheelHeight / 3}
            fill="#ccc"
            stroke="#333"
            strokeWidth="2"
          />
          <circle
            cx={startX + cartWidth - Math.max(30 * scale, cartWidth * 0.15)}
            cy={startY + cartHeight + wheelHeight / 2 + wheelHeight / 3}
            r={wheelHeight / 6}
            fill="#666"
            stroke="#333"
            strokeWidth="1"
          />
        </g>

        {/* Треугольные колесные опоры */}
        <g>
          {/* Левая опора */}
          <polygon
            points={`${startX + Math.max(30 * scale, cartWidth * 0.15)},${
              startY + cartHeight + wheelHeight / 2 + wheelHeight / 3
            } ${startX + Math.max(15 * scale, cartWidth * 0.07)},${
              startY + cartHeight
            } ${startX + Math.max(45 * scale, cartWidth * 0.23)},${
              startY + cartHeight
            }`}
            fill="#bbb"
            stroke="#333"
            strokeWidth="1"
          />
          {/* Правая опора */}
          <polygon
            points={`${
              startX + cartWidth - Math.max(30 * scale, cartWidth * 0.15)
            },${startY + cartHeight + wheelHeight / 2 + wheelHeight / 3} ${
              startX + cartWidth - Math.max(45 * scale, cartWidth * 0.23)
            },${startY + cartHeight} ${
              startX + cartWidth - Math.max(15 * scale, cartWidth * 0.07)
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
          x={containerWidth / 2}
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
    const scale = sideViewScale;
    const cartLength = size.length * scale;
    const cartHeight = (size.height - wheelsHeight) * scale;
    const wheelHeight = wheelsHeight * scale;
    const pipeThickness = pipe * scale;

    const startX = (containerWidth - cartLength) / 2; // Центрируем по горизонтали
    const startY = margin + wheelHeight;

    return (
      <svg width={containerWidth} height={containerHeight} className="drawing">
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
            cx={startX + Math.max(40 * scale, cartLength * 0.15)}
            cy={startY + cartHeight + wheelHeight / 2 + wheelHeight / 3}
            r={wheelHeight / 3}
            fill="#ccc"
            stroke="#333"
            strokeWidth="2"
          />
          <circle
            cx={startX + Math.max(40 * scale, cartLength * 0.15)}
            cy={startY + cartHeight + wheelHeight / 2 + wheelHeight / 3}
            r={wheelHeight / 6}
            fill="#666"
            stroke="#333"
            strokeWidth="1"
          />
          <circle
            cx={startX + cartLength - Math.max(40 * scale, cartLength * 0.15)}
            cy={startY + cartHeight + wheelHeight / 2 + wheelHeight / 3}
            r={wheelHeight / 3}
            fill="#ccc"
            stroke="#333"
            strokeWidth="2"
          />
          <circle
            cx={startX + cartLength - Math.max(40 * scale, cartLength * 0.15)}
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
            points={`${startX + Math.max(40 * scale, cartLength * 0.15)},${
              startY + cartHeight + wheelHeight / 2 + wheelHeight / 3
            } ${startX + Math.max(25 * scale, cartLength * 0.1)},${
              startY + cartHeight
            } ${startX + Math.max(55 * scale, cartLength * 0.2)},${
              startY + cartHeight
            }`}
            fill="#bbb"
            stroke="#333"
            strokeWidth="1"
          />
          {/* Задняя опора */}
          <polygon
            points={`${
              startX + cartLength - Math.max(40 * scale, cartLength * 0.15)
            },${startY + cartHeight + wheelHeight / 2 + wheelHeight / 3} ${
              startX + cartLength - Math.max(55 * scale, cartLength * 0.2)
            },${startY + cartHeight} ${
              startX + cartLength - Math.max(25 * scale, cartLength * 0.1)
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
          x={containerWidth / 2}
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
      <h3 className="tray__title">Чертеж тележки</h3>
      <div className="tray__drawings">
        <div className="tray__drawing">{renderFrontView()}</div>
        <div className="tray__drawing">{renderSideView()}</div>
      </div>

      <div className="tray__specifications">
        <h4>Технические характеристики:</h4>
        <ul>
          <li>
            Размер противня: {trayWidth}×{trayLength}мм
          </li>
          <li>
            Толщина трубы: {pipe}×{pipe}мм
          </li>
          <li>Количество уровней: {levels}</li>
          <li>Расстояние между уровнями: {stepLength}мм</li>
          <li>Высота колес: {wheelsHeight}мм</li>
        </ul>
      </div>
    </div>
  );
}

export default Tray;
