import type { CalcResult } from "../types/types";

export const calculateResult = (
  formData: Record<string, string | number | boolean>
): CalcResult | null => {
  const addToWidth = 10;
  const addToLength = 20;
  const addToHeight = 30;

  const trayWidth = Number(formData.width);
  const trayLength = Number(formData.length);
  const type = String(formData.type);
  const pipe = parseInt(String(formData.pipe));
  const levels = Number(formData.levels);
  const stepLength = Number(formData.distance);
  const wheelsType = String(formData.wheels);
  const wheelsDiameter = Number(formData.wheelsDiameter);

  let wheelsHeight: number;
  switch (wheelsDiameter) {
    case 50:
      wheelsHeight = 70;
      break;
    case 75:
      wheelsHeight = 100;
      break;
    case 80:
      wheelsHeight = 110;
      break;
    case 100:
      wheelsHeight = 130;
      break;
    case 125:
      wheelsHeight = 150;
      break;
    case 160:
      wheelsHeight = 190;
      break;
  }

  let rails: number[] = [];

  // Проверяем, используются ли нестандартные направляющие
  if (formData.rails && formData.customRailsWidth) {
    // Используем нестандартную ширину
    rails = [trayLength + 10, Number(formData.customRailsWidth)];
  } else {
    // Используем стандартные значения по типу
    switch (type) {
      case "Под противень":
        rails = [trayLength + 10, 30];
        break;
      case "Под гастроемкость":
        rails = [trayLength + 10, 15];
        break;
      case "Под пиццу":
        rails = [trayLength + 10, 80];
        break;
      case "Под поднос":
        rails = [trayLength + 10, 60];
        break;
    }
  }

  const calculateDimensions = (isWidthLoading: boolean): CalcResult => {
    const width = isWidthLoading
      ? trayWidth + addToWidth + 2 * pipe
      : trayLength + addToWidth + 2 * pipe;
    const length = isWidthLoading
      ? trayLength + addToLength
      : trayWidth + addToLength;
    const height = levels * stepLength + 2 * pipe + wheelsHeight + addToHeight;

    const calculation = {
      pipeH: levels * stepLength + addToHeight,
      pipeW: width,
      pipeL: length,
      wheelsType,
      wheelsDiameter,
    };

    return {
      trolleyParams: {
        trayWidth,
        trayLength,
        pipe,
        levels,
        stepLength,
        wheelsHeight,
        rails,
      },
      size: { width, length, height },
      calculation,
    };
  };

  switch (formData.loadingSide) {
    case "По ширине":
      return calculateDimensions(true);
    case "По длине":
      return calculateDimensions(false);
    default:
      return null;
  }
};
