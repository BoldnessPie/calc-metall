export interface CalcResult {
  trolleyParams: {
    trayWidth: number;
    trayLength: number;
    pipe: number;
    levels: number;
    stepLength: number;
    wheelsHeight: number;
    rails: Record<string, number | string>;
    verticalLimiter?: boolean;
  };
  size: {
    width: number;
    length: number;
    height: number;
  };
  calculations: {
    pipeType: string;
    pipeH: number;
    pipeW: number;
    pipeL: number;
    wheelsType: string;
    wheelsDiameter: number;
  };
}

export interface ResultProps {
  result: CalcResult;
  onBack: () => void;
}

export interface ParsedResult {
  type: string;
  trayWidth: number;
  trayLength: number;
  pipeType: string;
  pipe: number;
  railsType: string;
  railsThickness: number;
  levels: number;
  step: number;
  wheelsType: string;
  wheels: number;
  additionalH: number;
  customRails: boolean;
  customRailsWidth: number;
  verticalLimiter: boolean;
}
