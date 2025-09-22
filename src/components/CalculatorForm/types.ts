// Общие типы для CalculatorForm и связанных компонентов

export type FormData = Record<string, string | number>;

export type Errors = Record<string, string>;

export interface CalcResult {
  width: number;
  length: number;
  height: number;
  trayDistance: number;
  calculation: Array<{ name: string }>;
}

export interface CalculatorFormProps {
  category: string;
  onBack: () => void;
}