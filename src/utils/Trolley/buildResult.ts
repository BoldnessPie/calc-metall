import { parseFormData } from "./parseFormData";
import {
  calculateWheelsHeight,
  calculateDimensions,
  calculateRails,
  calculatePipe,
} from "./calculations";
import type { FormData } from "../../types/generalTypes";
import type { CalcResult } from "../../types/Trolley/calculatorTypes";

export function buildResult(formData: FormData): CalcResult | null {
  const data = parseFormData(formData);

  const wheelsHeight = calculateWheelsHeight(data.wheels);

  const { trolleyWidth, trolleyLength, trolleyHeight } = calculateDimensions(
    data,
    wheelsHeight
  );
  const { railsL, railsW } = calculateRails(data, trolleyLength);

  const { pipeW, pipeL, pipeH } = calculatePipe(
    data,
    trolleyWidth,
    trolleyLength
  );
  console.log(data);
  return {
    trolleyParams: {
      trayWidth: data.trayWidth,
      trayLength: data.trayLength,
      pipe: data.pipe,
      levels: data.levels,
      stepLength: data.step,
      wheelsHeight,
      verticalLimiter: data.verticalLimiter,
      rails: {
        length: railsL,
        width: railsW,
        thickness: data.railsThickness,
        type: data.railsType,
      },
    },

    size: { width: trolleyWidth, length: trolleyLength, height: trolleyHeight },

    calculations: {
      pipeType: data.pipeType,
      pipeW,
      pipeL,
      pipeH,
      wheelsType: data.wheelsType,
      wheelsDiameter: data.wheels,
    },
  };
}
