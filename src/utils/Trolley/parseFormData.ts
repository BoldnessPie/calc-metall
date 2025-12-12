import type { ParsedResult } from "../../types/Trolley/calculatorTypes";
import type { FormData } from "../../types/generalTypes";

export const parseFormData = (formData: FormData): ParsedResult => {
  return {
    type: String(formData.type),

    trayWidth: Number(formData.width),
    trayLength: Number(formData.length),

    pipeType: String(formData.materialTypePipe),
    pipe: parseInt(String(formData.pipe)),

    railsType: String(formData.materialTypeSteel),
    railsThickness: Number(formData.steelThickness),

    levels: Number(formData.levels),
    step: Number(formData.distance),

    wheelsType: String(formData.wheels),
    wheels: Number(formData.wheelsDiameter),

    additionalH: Number(formData.addToHeight) || 30, // Высота до направляющих. Если не указана, то по умолчанию 30мм.

    customRails: Boolean(formData.customRails),
    customRailsWidth: Number(formData.customRailsWidth),

    verticalLimiter: Boolean(formData.verticalLimiter),
  };
};
