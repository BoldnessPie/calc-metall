import type { Field } from "../generalTypes";

// Конфигурация категории "Столы"
export const table: Field[] = [
  {
    name: "width",
    label: "Ширина стола",
    type: "number",
    min: 300,
    max: 2350,
  },
  {
    name: "length",
    label: "Длина стола",
    type: "number",
    min: 300,
    max: 3000,
  },
  {
    name: "height",
    label: "Высота стола",
    type: "number",
    min: 300,
    max: 1500,
  },
  {
    name: "pipe",
    label: "Размер трубы",
    type: "select",
    options: ["20х20мм", "25х25мм", "40х20мм", "40х40мм"],
  },
  {
    name: "reinforcement",
    label: "Усиление фанерой?",
    type: "boolean",
  },
  {
    name: "shelf",
    label: "Полка",
    type: "boolean",
  },
  {
    name: "shelfLevels",
    label: "Количество полок",
    type: "number",
  },
  {
    name: "stepLength",
    label: "Расстояние между полками",
    type: "number",
  },
  {
    name: "heightFromFloor",
    label: "Высота полки от пола",
    type: "number",
  },
  // {
  //   name: "wheels",
  //   label: "На колесиках?",
  //   type: "boolean",
  // },
  // {
  //   name: "wheelsDiametr",
  //   label: "Диаметр колес",
  //   type: "number",
  // },
];
