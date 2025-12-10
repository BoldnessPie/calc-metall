import type { CalcResult } from "../../types/Shelve/calculatorTypes";

export const calculateResult = (
  formData: Record<string, string | number | boolean>
): CalcResult | null => {
  const adjustableLengsH = 15; // Высота регулируемых ножек.
  const addToTopSheet = 2; // Запас на полки.

  const materialShelf = formData.materialShelveType?.toString();
  const materialPipe = formData.materialPipeType?.toString();
  const shelfThickness = Number(formData.shelveThickness).toFixed(1);
  const pipeSize = Number(formData.pipe.toString().split("х")[0]);
  const length = Number(formData.length);
  const width = Number(formData.width);
  const height = Number(formData.height);
  const shelfLevels = Number(formData.shelfLevels);
  const heightFromFloor = Number(formData.heightFromFloor) || 100;

  const pipeH = height - pipeSize - adjustableLengsH;
  const pipeTopW = width;
  const pipeTopL = length;

  const pipeAsideW = width - pipeSize * 2;
  const pipeAsideL = length - pipeSize * 2;

  const steelSheets = [
    width + addToTopSheet + pipeSize * 2,
    length + addToTopSheet + pipeSize * 2,
    `${shelfLevels}шт.`,
  ];

  const step =
    Math.floor(
      (height - heightFromFloor - pipeSize * (shelfLevels - 1)) /
        (shelfLevels - 1)
    ) + "мм";
  return {
    shelveSpecification: {
      steel: [materialShelf, shelfThickness],
      pipe: [materialPipe, pipeSize],
      width,
      length,
      height,
      shelfLevels,
      heightFromFloor,
    },
    calculation: {
      steelSheets,
      pipe: {
        height: pipeH + " 4шт",
        width: pipeTopW + " 2шт",
        length: pipeTopL + " 2шт",
      },
      aside: {
        width: pipeAsideW + ` ${shelfLevels * 2}шт`,
        length: pipeAsideL + ` ${shelfLevels * 2}шт`,
      },
      step,
    },
  };
};
