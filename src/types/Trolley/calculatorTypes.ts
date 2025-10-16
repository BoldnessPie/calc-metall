export interface CalcResult {
  trolleyParams: {
    trayWidth: number;
    trayLength: number;
    pipe: number;
    levels: number;
    stepLength: number;
    wheelsHeight: number;
    rails: number[];
    verticalLimiter?: boolean;
  };
  size: {
    width: number;
    length: number;
    height: number;
  };
  calculation: {
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
