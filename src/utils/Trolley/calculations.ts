import type { ParsedResult } from "../../types/Trolley/calculatorTypes";
export function calculateWheelsHeight(wheelsDiameter: number): number {
  switch (wheelsDiameter) {
    case 50:
      return 70;
    case 75:
      return 100;
    case 80:
      return 110;
    case 100:
      return 130;
    case 120:
      return 145;
    case 125:
      return 150;
    case 160:
      return 190;
    default:
      throw new Error("Не указан диаметр колес");
  }
}

export function calculateDimensions(
  data: ParsedResult,
  wheelsHeight: number
): Record<string, number> {
  const addToWidth = 10; // Константа для свободного хода противня внутри тележки
  const addToLength = 20; // Константа, 10мм таж же для свободного вода + 10мм на ограничители (каждый занимает по 5мм).
  const addToHeight = data.additionalH ?? 30; // Если не указана, то по умолчанию 30мм.
  return {
    trolleyWidth: data.trayWidth + addToWidth + 2 * data.pipe,
    trolleyLength: data.trayLength + addToLength,
    trolleyHeight:
      data.levels * data.step + 2 * data.pipe + wheelsHeight + addToHeight,
  };
}

export function calculateRails(
  data: ParsedResult,
  length: number
): Record<string, number | string> {
  let railsL = length - 10,
    railsW;

  if (data.customRails && data.customRailsWidth) {
    railsL = length - 10;
    railsW = data.customRailsWidth;
  } else {
    switch (data.type) {
      case "Под противень":
        railsW = 30;
        break;
      case "Под гастроемкость":
        railsW = 15;
        break;
      case "Под пиццу":
        railsW = 80;
        break;
      case "Под поднос":
        railsW = 50;
        break;
      default:
        railsW = 30;
        break;
    }
  }

  return { railsL, railsW };
}

export function calculatePipe(
  data: ParsedResult,
  trolleyWidth: number,
  trolleyLength: number
): Record<string, number> {
  const pipeW = trolleyWidth;
  const pipeL = trolleyLength;
  const pipeH = data.levels * data.step + data.additionalH;

  return { pipeW, pipeL, pipeH };
}
