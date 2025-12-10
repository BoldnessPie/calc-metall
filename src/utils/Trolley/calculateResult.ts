import type { CalcResult } from "../../types/Trolley/calculatorTypes";

export const calculateResult = (
  formData: Record<string, string | number | boolean>
): CalcResult | null => {
  const addToWidth = 10;
  const addToLength = 20;

  const trayWidth = Number(formData.width);
  const trayLength = Number(formData.length);
  const type = String(formData.type);
  const pipe = parseInt(String(formData.pipe));
  const pipeSteelType = String(formData.materialTypePipe);
  const railsSteelType = String(formData.materialTypeSteel);
  const railsThickness = parseFloat(String(formData.steelThickness));
  const levels = Number(formData.levels);
  const stepLength = Number(formData.distance);
  const wheelsType = String(formData.wheels);
  const wheelsDiameter = Number(formData.wheelsDiameter);
  const addToHeight = Number(formData.addToHeight) || 30;

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
    case 120:
      wheelsHeight = 145;
      break;
    case 125:
      wheelsHeight = 150;
      break;
    case 160:
      wheelsHeight = 190;
      break;
  }

  const calculateDimensions = (isWidthLoading: boolean): CalcResult => {
    const width = isWidthLoading
      ? trayWidth + addToWidth + 2 * pipe
      : trayLength + addToWidth + 2 * pipe;
    let length = isWidthLoading
      ? trayLength + addToLength
      : trayWidth + addToLength;

    // Добавляем 10мм к длине, если включен вертикальный ограничитель
    if (formData.verticalLimiter) {
      length += 10;
    }

    const height = levels * stepLength + 2 * pipe + wheelsHeight + addToHeight;

    let rails: Array<number | string> = [];

    // Проверяем, используются ли нестандартные направляющие
    if (formData.rails && formData.customRailsWidth) {
      // Используем нестандартную ширину
      rails = [length - 10, Number(formData.customRailsWidth)];
    } else {
      // Используем стандартные значения по типу
      switch (type) {
        case "Под противень":
          rails = [length - 10, 30];
          break;
        case "Под гастроемкость":
          rails = [length - 10, 15];
          break;
        case "Под пиццу":
          rails = [length - 10, 80];
          break;
        case "Под поднос":
          rails = [length - 10, 50];
          break;
      }
    }

    rails.push(railsThickness, railsSteelType);

    return {
      trolleyParams: {
        trayWidth,
        trayLength,
        pipe,
        levels,
        stepLength,
        wheelsHeight,
        rails,
        verticalLimiter: Boolean(formData.verticalLimiter),
      },
      size: { width, length, height },
      calculation: {
        pipeType: pipeSteelType,
        pipeH: levels * stepLength + addToHeight,
        pipeW: width,
        pipeL: length,
        wheelsType,
        wheelsDiameter,
      },
    };
  };
  console.log(pipeSteelType);
  switch (formData.loadingSide) {
    case "По ширине":
      return calculateDimensions(true);
    case "По длине":
      return calculateDimensions(false);
    default:
      return null;
  }
};
