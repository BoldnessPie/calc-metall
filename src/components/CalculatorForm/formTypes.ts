export type FieldType = "number" | "select";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
}

// Конфигурация полей по категориям
export const formConfigs: Record<string, Field[]> = {
  carts: [
    {
      name: "type",
      label: "Тип тележки",
      type: "select",
      options: [
        "Под противень",
        "Под гастроемкость",
        "Под пиццу",
        "Под поднос",
      ],
    },

    {
      name: "loadingSide",
      label: "По какой стороне загрузка",
      type: "select",
      options: ["По ширине", "По длине"],
    },
    { name: "width", label: "Ширина", type: "number" },
    { name: "length", label: "Длина", type: "number" },
    {
      name: "pipe",
      label: "Размер трубы",
      type: "select",
      options: ["20х20мм", "25х25мм"],
    },
    { name: "levels", label: "Кол-во уровней", type: "number" },
    { name: "distance", label: "Расстояние между уровнями", type: "number" },
    {
      name: "wheels",
      label: "Тип колес",
      type: "select",
      options: ["Черная резина", "Фенольные", "Нейлоновые", "Чугунные"],
    },
    { name: "wheelsDiameter", label: "Диаметр колес", type: "number" },
  ],
  tables: [
    { name: "length", label: "Длина стола", type: "number" },
    { name: "width", label: "Ширина стола", type: "number" },
    {
      name: "material",
      label: "Материал",
      type: "select",
      options: ["Нерж. сталь", "Оцинковка"],
    },
  ],
  shelves: [
    { name: "shelfCount", label: "Кол-во полок", type: "number" },
    { name: "height", label: "Высота", type: "number" },
  ],
  sinks: [
    { name: "bowls", label: "Кол-во чаш", type: "number" },
    { name: "depth", label: "Глубина", type: "number" },
  ],
};
