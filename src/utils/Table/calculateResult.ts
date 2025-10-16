import type { CalcResult } from "../../types/Table/calculatorTypes";
import { table } from "../../types/Table/tableTypes";

export const calculateResult = (
  formData: Record<string, string | number | boolean>
): CalcResult | null => {
  const subtrackLen = 2.5; // Вычитаем из длины стола.
  const subtrackW = 10; // Вычитаем из ширины стола.
  const floorH = 250; // Стандартная высота обвязки или первой полки от пола.
  const plywoodTickness = 12; // Толщина фанеры.
  const steelTickness = 1.0; // Толщина металла.
  const tableTopSteelH = 40; // Высота листа столешницы.
  const tableTopH = plywoodTickness + steelTickness + 2; // Высота самой столешницы, без трубы. 2мм - это погрешность с учетом клея
  const adjustableLengsH = 15; // Высота регулируемых ножек.

  const tableWidth = Number(formData.width);
  const tableLength = Number(formData.length);
  const tableHeight = Number(formData.height);
  const pipeSize = Number(formData.pipe?.toString().split("х")[0]);
  const reinforcementPlywood = Boolean(formData.reinforcement);
  const shelf = Boolean(formData.shelf);
  const shelfLevels = Number(formData.shelfLevels);
  let stepLength = Number(formData.stepLength);
  const heightFromFloor = Number(formData.heightFromFloor) || floorH;

  let pipeH, pipeTopW, pipeTopL, pipeBottomW, pipeBottomL;

  if (reinforcementPlywood) {
    pipeH = tableHeight - adjustableLengsH - tableTopH - pipeSize;
    pipeTopW = tableWidth - subtrackW * 2 - pipeSize * 2;
    pipeTopL = tableLength - subtrackLen * 2 - pipeSize * 2;
    (pipeBottomW = pipeTopW), (pipeBottomL = pipeTopL);
  } else {
    pipeH = tableHeight - steelTickness - pipeSize - adjustableLengsH;
    pipeTopW = tableWidth;
    pipeTopL = tableLength;
    pipeBottomW = tableWidth - pipeSize * 2;
    pipeBottomL = tableLength - pipeSize * 2;
  }

  let tableSheet, asideSheets;

  if (reinforcementPlywood) {
    tableSheet = [tableLength, tableWidth + tableTopSteelH * 2 + subtrackW * 2];
    asideSheets = [tableWidth, tableTopSteelH];
  } else {
    tableSheet = [
      tableLength + steelTickness + tableTopSteelH * 2,
      tableWidth + steelTickness + tableTopSteelH * 2,
    ];
    asideSheets = null;
  }

  let shelfSheet;

  if (shelf && reinforcementPlywood) {
    shelfSheet = [
      tableLength - subtrackLen * 2 + pipeSize * 2,
      tableWidth - subtrackW * 2 + pipeSize * 2,
    ];
  } else if (shelf) {
    shelfSheet = null;
  } else {
    shelfSheet = null;
  }

  if (shelfLevels > 1 && !stepLength) {
    stepLength =
      tableHeight -
      tableTopSteelH -
      heightFromFloor -
      (pipeSize * (shelfLevels - 1)) / shelfLevels;
  }

  return {
    tableSpecification: {
      width: tableWidth,
      length: tableLength,
      height: tableHeight,
      pipe: pipeSize,
      shelf,
      shelfLevels,
      stepLength,
      heightFromFloor,
    },
    calculation: {
      pipe: {
        height: `${pipeH}мм 4шт`,
        top: { width: `${pipeTopW}мм 2шт`, length: `${pipeTopL}мм 2шт` },
        bottom: {
          width: `${pipeBottomW}мм 2шт`,
          length: `${pipeBottomL}мм 2шт`,
        },
      },
      sheets: {
        top: `${tableSheet[0]}x${tableSheet[1]}мм 1шт`,
        aside: asideSheets ? `${asideSheets[0]}x${asideSheets[1]}мм 2шт` : null,
        shelf: shelfSheet ? `${shelfSheet[0]}x${shelfSheet[1]}мм 1шт` : null,
      },
    },
  };
};
