// Общие типы для CalculatorForm и связанных компонентов

export type FormData = Record<string, string | number>;

export type Errors = Record<string, string>;

export interface CalcResult {
  trolleyParams: {
    trayWidth: number;
    trayLength: number;
    pipe: number;
    levels: number;
    stepLength: number;
    wheelsHeight: number;
    rails: number[];
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

export interface CalculatorFormProps {
  category: string;
  onBack: () => void;
}

export interface ResultProps {
  result: CalcResult;
  onBack: () => void;
}
