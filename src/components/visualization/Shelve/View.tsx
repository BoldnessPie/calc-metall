import "./View.css";
import type { CalcResult } from "../../../types/Shelve/calculatorTypes";

interface ShelveProps {
  result: CalcResult;
}

function Shelve({ result }: ShelveProps) {
  const { shelveSpecification, calculation } = result;
  const { pipe, width, length, height, shelfLevels, heightFromFloor } =
    shelveSpecification;
  const { step } = calculation;

  // Параметры для масштабирования чертежей
  const scale = 0.3; // Масштаб для отображения
  const margin = 70; // Отступы
  const adjustableLengsH = 15; // Высота регулируемых ножек

  // Пересчитываем step для равномерного распределения полок
  // Верхняя горизонтальная труба = первая полка (центр на startY + pipeThickness/2)
  // Нижняя полка должна быть на высоте heightFromFloor от пола
  // Расстояние от центра верхней полки до центра нижней полки:
  // Расстояние между полками (от верхней до нижней равномерно)
  const actualStep = parseInt(step);

  // Размеры чертежей
  const frontViewWidth = length * scale + margin * 2;
  const frontViewHeight = height * scale + margin * 2 + 40;
  const sideViewWidth = width * scale + margin * 2;
  const sideViewHeight = height * scale + margin * 2 + 40;

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

  // Отрисовка вида спереди (показываем длину стеллажа)
  const renderFrontView = () => {
    const shelveLength = length * scale;
    const shelveHeight = height * scale;
    const pipeThickness = Number(pipe[1]) * scale;

    const startX = margin;
    const startY = margin + 30; // Увеличен отступ сверху для центрирования

    return (
      <svg width={frontViewWidth} height={frontViewHeight} className="drawing">
        {/* Верхняя горизонтальная труба (она же первая полка) */}
        <rect
          x={startX}
          y={startY}
          width={shelveLength}
          height={pipeThickness}
          fill="#9f9e9eff"
          stroke="#555"
          strokeWidth="1"
        />

        {/* Левая вертикальная стойка */}
        <rect
          x={startX}
          y={startY + pipeThickness}
          width={pipeThickness}
          height={shelveHeight - adjustableLengsH * scale - pipeThickness}
          fill="#ddd"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Правая вертикальная стойка */}
        <rect
          x={startX + shelveLength - pipeThickness}
          y={startY + pipeThickness}
          width={pipeThickness}
          height={shelveHeight - adjustableLengsH * scale - pipeThickness}
          fill="#ddd"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Остальные полки (shelfLevels - 1) внутри стеллажа */}
        {Array.from({ length: shelfLevels - 1 }, (_, i) => {
          // i = 0 - первая внутренняя полка
          // i = shelfLevels-2 - последняя полка (на высоте heightFromFloor от пола)
          // Позиция считается от центра верхней трубы (startY + pipeThickness/2)
          const shelfY =
            startY + pipeThickness / 2 + (i + 1) * actualStep * scale;

          return (
            <g key={i}>
              {/* Полка */}
              <rect
                x={startX + pipeThickness}
                y={shelfY - pipeThickness / 2}
                width={shelveLength - 2 * pipeThickness}
                height={pipeThickness}
                fill="#9f9e9eff"
                stroke="#555"
                strokeWidth="1"
              />
            </g>
          );
        })}

        {/* Регулируемые ножки */}
        <rect
          x={startX - 1}
          y={startY + shelveHeight - adjustableLengsH * scale}
          width={pipeThickness + 2}
          height={adjustableLengsH * scale}
          fill="#4a4a4aff"
          stroke="#333"
          strokeWidth="1"
        />
        <rect
          x={startX + shelveLength - pipeThickness - 1}
          y={startY + shelveHeight - adjustableLengsH * scale}
          width={pipeThickness + 2}
          height={adjustableLengsH * scale}
          fill="#4a4a4aff"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Размерные линии */}
        {/* Длина стеллажа */}
        {renderDimensionLine(
          startX,
          startY - 35,
          startX + shelveLength,
          startY - 35,
          `${length}мм`
        )}

        {/* Общая высота */}
        {renderDimensionLine(
          startX - 50,
          startY,
          startX - 50,
          startY + shelveHeight,
          `${height}мм`,
          0,
          true
        )}

        {/* Высота от пола до нижней полки */}
        {renderDimensionLine(
          startX + shelveLength + 30,
          startY + shelveHeight,
          startX + shelveLength + 30,
          startY + pipeThickness / 2 + (shelfLevels - 1) * actualStep * scale,
          `${heightFromFloor}мм`,
          0,
          true
        )}

        {/* Расстояние между полками (step) */}
        {shelfLevels > 1 &&
          actualStep > 0 &&
          (() => {
            // Берем последние две полки для отображения расстояния
            const shelf1Y =
              startY +
              pipeThickness / 2 +
              (shelfLevels - 1) * actualStep * scale; // Нижняя полка
            const shelf2Y =
              startY +
              pipeThickness / 2 +
              (shelfLevels - 2) * actualStep * scale; // Предпоследняя полка

            return renderDimensionLine(
              startX - 25,
              shelf1Y,
              startX - 25,
              shelf2Y,
              `${actualStep}мм`,
              0,
              true
            );
          })()}

        <text
          x={frontViewWidth / 2}
          y={20}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
        >
          Вид спереди
        </text>
      </svg>
    );
  };

  // Отрисовка вида сбоку (показываем ширину стеллажа)
  const renderSideView = () => {
    const shelveWidth = width * scale;
    const shelveHeight = height * scale;
    const pipeThickness = Number(pipe[1]) * scale;

    const startX = margin;
    const startY = margin + 20; // Увеличен отступ сверху для центрирования

    return (
      <svg width={sideViewWidth} height={sideViewHeight} className="drawing">
        {/* Верхняя горизонтальная труба (она же первая полка) */}
        <rect
          x={startX}
          y={startY}
          width={shelveWidth}
          height={pipeThickness}
          fill="#9f9e9eff"
          stroke="#555"
          strokeWidth="1"
        />

        {/* Левая вертикальная стойка */}
        <rect
          x={startX}
          y={startY + pipeThickness}
          width={pipeThickness}
          height={shelveHeight - adjustableLengsH * scale - pipeThickness}
          fill="#ddd"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Правая вертикальная стойка */}
        <rect
          x={startX + shelveWidth - pipeThickness}
          y={startY + pipeThickness}
          width={pipeThickness}
          height={shelveHeight - adjustableLengsH * scale - pipeThickness}
          fill="#ddd"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Остальные полки (shelfLevels - 1) внутри стеллажа */}
        {Array.from({ length: shelfLevels - 1 }, (_, i) => {
          const shelfY =
            startY + pipeThickness / 2 + (i + 1) * actualStep * scale;

          return (
            <g key={i}>
              {/* Полка */}
              <rect
                x={startX + pipeThickness}
                y={shelfY - pipeThickness / 2}
                width={shelveWidth - 2 * pipeThickness}
                height={pipeThickness}
                fill="#9f9e9eff"
                stroke="#555"
                strokeWidth="1"
              />
            </g>
          );
        })}

        {/* Регулируемые ножки */}
        <rect
          x={startX - 1}
          y={startY + shelveHeight - adjustableLengsH * scale}
          width={pipeThickness + 2}
          height={adjustableLengsH * scale}
          fill="#4a4a4aff"
          stroke="#333"
          strokeWidth="1"
        />
        <rect
          x={startX + shelveWidth - pipeThickness - 1}
          y={startY + shelveHeight - adjustableLengsH * scale}
          width={pipeThickness + 2}
          height={adjustableLengsH * scale}
          fill="#4a4a4aff"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Размерные линии */}
        {/* Ширина стеллажа */}
        {renderDimensionLine(
          startX,
          startY - 35,
          startX + shelveWidth,
          startY - 35,
          `${width}мм`
        )}

        {/* Общая высота */}
        {renderDimensionLine(
          startX - 50,
          startY,
          startX - 50,
          startY + shelveHeight,
          `${height}мм`,
          0,
          true
        )}

        {/* Размер трубы */}
        {renderDimensionLine(
          startX,
          startY - 15,
          startX + pipeThickness,
          startY - 15,
          `${pipe[1]}мм`
        )}

        <text
          x={sideViewWidth / 2}
          y={20}
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
    <div className="shelve">
      <h3>Чертеж стеллажа</h3>
      <div className="shelve__drawings">
        <div className="shelve__drawing">{renderFrontView()}</div>
        <div className="shelve__drawing">{renderSideView()}</div>
      </div>

      <div className="shelve__specifications">
        <h4>Технические характеристики:</h4>
        <ul>
          <li>
            Габариты стеллажа: {width}×{length}×{height}мм
          </li>
          <li>
            Труба: {pipe[0]} {pipe[1]}×{pipe[1]}мм
          </li>
          <li>
            Сталь для полок: {shelveSpecification.steel[0]}{" "}
            {Number(shelveSpecification.steel[1]).toFixed(1)}мм
          </li>
          <li>Количество полок: {shelfLevels}</li>
          <li>Высота от пола до первой полки: {heightFromFloor}мм</li>
          {actualStep > 0 && <li>Расстояние между полками: {actualStep}мм</li>}
        </ul>
      </div>
    </div>
  );
}

export default Shelve;
