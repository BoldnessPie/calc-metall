import type { Field } from "../generalTypes";

// Конфигурация категории "Тележки"
export const trolley: Field[] = [
  {
    name: "type",
    label: "Тип тележки",
    type: "select",
    options: ["Под противень", "Под гастроемкость", "Под пиццу", "Под поднос"],
  },

  {
    name: "loadingSide",
    label: "По какой стороне загрузка",
    type: "select",
    options: ["По ширине", "По длине"],
  },
  {
    name: "width",
    label: "Ширина емкости",
    type: "number",
    min: 200,
    max: 1000,
  },
  {
    name: "length",
    label: "Длина емкости",
    type: "number",
    min: 200,
    max: 1000,
  },
  {
    name: "materialTypePipe",
    label: "Вид стали трубы",
    type: "select",
    options: ["AISI 201", "AISI 304", "AISI 430"],
    defaultValue: "AISI 201",
  },
  {
    name: "pipe",
    label: "Размер трубы",
    type: "select",
    options: ["20х20мм", "25х25мм"],
  },
  {
    name: "materialTypeSteel",
    label: "Вид стали направляющих",
    type: "select",
    options: ["AISI 201", "AISI 304", "AISI 430"],
    defaultValue: "AISI 430",
  },
  {
    name: "steelThickness",
    label: "Толщина направляющих",
    type: "select",
    options: ["1.0", "1.2", "1.5", "2.0"],
    defaultValue: "1.0",
  },
  {
    name: "levels",
    label: "Кол-во уровней",
    type: "number",
    min: 3,
    max: 30,
  },
  {
    name: "distance",
    label: "Расстояние между уровнями",
    type: "number",
    min: 10,
    max: 400,
  },
  {
    name: "wheels",
    label: "Тип колес",
    type: "select",
    options: ["Черная резина", "Фенольные", "Нейлоновые", "Чугунные"],
  },
  {
    name: "wheelsDiameter",
    label: "Диаметр колес",
    type: "select",
    options: ["50", "75", "80", "100", "120", "125", "160"],
  },
  {
    name: "addToHeight",
    label: "Высота до первой направляющей",
    type: "number",
    min: 0,
    max: 1000,
  },
  {
    name: "rails",
    label: "Нестандартные направляющие?",
    type: "boolean",
  },
  {
    name: "customRailsWidth",
    label: "Ширина направляющих (мм)",
    type: "number",
    min: 10,
    max: 200,
  },
  {
    name: "verticalLimiter",
    label: "Вертикальный ограничитель",
    type: "boolean",
  },
];
