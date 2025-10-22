import "./View.css";
import type { CalcResult } from "../../../types/Table/calculatorTypes";

interface TableProps {
  result: CalcResult;
}

function Table({ result }: TableProps) {
  const { tableSpecification } = result;
  const {
    steelSheet,
    width,
    length,
    height,
    pipe,
    shelf,
    shelfLevels,
    heightFromFloor,
    plywoodTickness,
    adjustableLengsH,
  } = tableSpecification;

  // Высота столешницы
  const tableTopHeight = plywoodTickness + adjustableLengsH;

  // Извлекаем значение step из строки (например, "300мм" -> 300)
  const stepValue = result.calculation.step
    ? parseFloat(result.calculation.step)
    : 0;

  // Параметры для масштабирования чертежей
  const scale = 0.3; // Масштаб для отображения
  const margin = 70; // Отступы

  // Отступы ножек от края столешницы
  const legOffsetWidth = 15; // мм по ширине
  const legOffsetLength = 15; // мм по длине

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

  // Отрисовка вида спереди (показываем длину стола)
  const renderFrontView = () => {
    const tableLength = length * scale;
    const tableHeight = height * scale;
    const tableTopH = tableTopHeight * scale;
    const pipeThickness = Number(pipe[1]) * scale;
    const legOffset = legOffsetLength * scale;

    const startX = margin;
    const startY = margin;

    return (
      <svg width={frontViewWidth} height={frontViewHeight} className="drawing">
        {/* Столешница */}
        <rect
          x={startX}
          y={startY}
          width={tableLength}
          height={tableTopH}
          fill="#999"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Левая ножка */}
        <rect
          x={startX + legOffset}
          y={startY + tableTopH}
          width={pipeThickness}
          height={tableHeight - tableTopH}
          fill="#ddd"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Правая ножка */}
        <rect
          x={startX + tableLength - legOffset - pipeThickness}
          y={startY + tableTopH}
          width={pipeThickness}
          height={tableHeight - tableTopH}
          fill="#ddd"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Обвязка/полки */}
        {shelfLevels > 0 ? (
          Array.from({ length: shelfLevels }, (_, i) => {
            const shelfY =
              startY +
              tableHeight -
              heightFromFloor * scale -
              i * stepValue * scale;
            const shelfThickness = pipeThickness;

            return (
              <rect
                key={i}
                x={startX + legOffset + pipeThickness}
                y={shelfY - shelfThickness / 2}
                width={tableLength - 2 * legOffset - 2 * pipeThickness}
                height={shelfThickness}
                fill={shelf ? "#bbb" : "#999"}
                stroke="#555"
                strokeWidth="1"
              />
            );
          })
        ) : (
          // Обвязка, если полки не выбраны
          <rect
            x={startX + legOffset + pipeThickness}
            y={
              startY + tableHeight - heightFromFloor * scale - pipeThickness / 2
            }
            width={tableLength - 2 * legOffset - 2 * pipeThickness}
            height={pipeThickness}
            fill="#ddd"
            stroke="#555"
            strokeWidth="1"
          />
        )}

        {/* Размерные линии */}
        {renderDimensionLine(
          startX,
          startY - 35,
          startX + tableLength,
          startY - 35,
          `${length}мм`
        )}
        {renderDimensionLine(
          startX - 40,
          startY,
          startX - 40,
          startY + tableHeight,
          `${height}мм`,
          0,
          true
        )}

        {/* Размерная линия для высоты от пола до полки/обвязки */}
        {renderDimensionLine(
          startX + tableLength + 30,
          startY + tableHeight,
          startX + tableLength + 30,
          startY + tableHeight - heightFromFloor * scale,
          `${heightFromFloor}мм`,
          0,
          true
        )}

        {/* Размерная линия для расстояния от полки до столешницы (step) */}
        {stepValue > 0 &&
          renderDimensionLine(
            startX - 20,
            startY + tableHeight - heightFromFloor * scale,
            startX - 20,
            shelfLevels > 1
              ? startY +
                  tableHeight -
                  heightFromFloor * scale -
                  stepValue * scale
              : startY + tableTopH,
            `${stepValue}мм`,
            0,
            true
          )}

        {/* Размерная линия для размера трубы */}
        {renderDimensionLine(
          startX + legOffset,
          startY - 15,
          startX + legOffset + pipeThickness,
          startY - 15,
          `${pipe[1]}мм`
        )}

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

  // Отрисовка вида сбоку (показываем ширину стола)
  const renderSideView = () => {
    const tableWidth = width * scale;
    const tableHeight = height * scale;
    const tableTopH = tableTopHeight * scale;
    const pipeThickness = Number(pipe[1]) * scale;
    const legOffset = legOffsetWidth * scale;

    const startX = margin;
    const startY = margin;

    return (
      <svg width={sideViewWidth} height={sideViewHeight} className="drawing">
        {/* Столешница */}
        <rect
          x={startX}
          y={startY}
          width={tableWidth}
          height={tableTopH}
          fill="#999"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Левая ножка */}
        <rect
          x={startX + legOffset}
          y={startY + tableTopH}
          width={pipeThickness}
          height={tableHeight - tableTopH}
          fill="#ddd"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Правая ножка */}
        <rect
          x={startX + tableWidth - legOffset - pipeThickness}
          y={startY + tableTopH}
          width={pipeThickness}
          height={tableHeight - tableTopH}
          fill="#ddd"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Обвязка/полки */}
        {shelfLevels > 0 ? (
          Array.from({ length: shelfLevels }, (_, i) => {
            const shelfY =
              startY +
              tableHeight -
              heightFromFloor * scale -
              i * stepValue * scale;
            const shelfThickness = pipeThickness;

            return (
              <rect
                key={i}
                x={startX + legOffset + pipeThickness}
                y={shelfY - shelfThickness / 2}
                width={tableWidth - 2 * legOffset - 2 * pipeThickness}
                height={shelfThickness}
                fill={shelf ? "#bbb" : "#999"}
                stroke="#555"
                strokeWidth="1"
              />
            );
          })
        ) : (
          // Обвязка, если полки не выбраны
          <rect
            x={startX + legOffset + pipeThickness}
            y={
              startY + tableHeight - heightFromFloor * scale - pipeThickness / 2
            }
            width={tableWidth - 2 * legOffset - 2 * pipeThickness}
            height={pipeThickness}
            fill="#ddd"
            stroke="#555"
            strokeWidth="1"
          />
        )}

        {/* Размерные линии */}
        {renderDimensionLine(
          startX,
          startY - 35,
          startX + tableWidth,
          startY - 35,
          `${width}мм`
        )}
        {renderDimensionLine(
          startX - 40,
          startY,
          startX - 40,
          startY + tableHeight,
          `${height}мм`,
          0,
          true
        )}

        {/* Размерная линия для высоты от пола до полки/обвязки
        {renderDimensionLine(
          startX + tableWidth + 30,
          startY + tableHeight,
          startX + tableWidth + 30,
          startY + tableHeight - heightFromFloor * scale,
          `${heightFromFloor}мм`,
          0,
          true
        )} */}

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
    <div className="table">
      <h3>Чертеж стола</h3>
      <div className="table__drawings">
        <div className="table__drawing">{renderFrontView()}</div>
        <div className="table__drawing">{renderSideView()}</div>
      </div>

      <div className="table__specifications">
        <h4>Технические характеристики:</h4>
        <ul>
          <li>
            Габариты стола: {width}×{length}×{height}мм
          </li>
          <li>
            Труба: {pipe[0]} {pipe[1]}×{pipe[1]}мм
          </li>
          <li>
            Столешница: {steelSheet[0]} {Number(steelSheet[1]).toFixed(1)}мм
          </li>
          {shelf && <li>Количество полок: {shelfLevels}</li>}
          {stepValue > 0 && (
            <li>Расстояние от полки до полки/столешницы: {stepValue}мм</li>
          )}
          <li>Высота от пола до обвязки/полки: {heightFromFloor}мм</li>
        </ul>
      </div>
    </div>
  );
}

export default Table;
