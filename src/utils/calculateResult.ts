import type { CalcResult } from '../components/CalculatorForm/types';

export const calculateResult = (formData: Record<string, string | number>): CalcResult | null => {
  const addToWidth = 10;
  const addToLength = 20;
  const addToHeight = 30;

  const trayWidth = Number(formData.width);
  const trayLength = Number(formData.length);
  const trayPipe = parseInt(String(formData.pipe));
  const trayLevels = Number(formData.levels);
  const trayDistance = Number(formData.distance);
  const wheelsType = formData.wheels;
  const wheelsDiameter = Number(formData.wheelsDiameter);

  const wheelsHeight = wheelsDiameter > 80 && wheelsDiameter < 120 ? 130 : 0;

  const calculateDimensions = (isWidthLoading: boolean): CalcResult => {
    const width = isWidthLoading
      ? trayWidth + addToWidth + 2 * trayPipe
      : trayLength + addToWidth + 2 * trayPipe;
    const length = isWidthLoading
      ? trayLength + addToLength
      : trayWidth + addToLength;
    const height =
      trayLevels * trayDistance + 2 * trayPipe + wheelsHeight + addToHeight;

    const calculation = [
      { name: `L - ${trayLevels * trayDistance + addToHeight}мм 4шт` },
      { name: `L - ${width}мм 4шт` },
      { name: `L - ${length}мм 4шт` },
      { name: `${wheelsType} D - ${wheelsDiameter}мм 4шт` },
      { name: `Длина направляющих: ${trayLength + 10}мм` },
    ];

    return { width, length, height, trayDistance, calculation };
  };

  switch (formData.loadingSide) {
    case 'По ширине':
      return calculateDimensions(true);
    case 'По длине':
      return calculateDimensions(false);
    default:
      return null;
  }
};