// Тип для поля ввода
export type FieldType = "number" | "select" | "boolean";

// Конфигурация поля формы
export interface Field {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  min?: number;
  max?: number;
}

export type FormData = Record<string, string | number | boolean>;

export type Errors = Record<string, string>;

export interface CalculatorFormProps {
  category: string;
  onBack: () => void;
}
