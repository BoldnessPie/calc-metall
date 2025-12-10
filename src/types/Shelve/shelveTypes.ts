import type { Field } from "../generalTypes";

export const shelve: Field[] = [
  {
    name: "materialShelveType",
    label: "Материал полки",
    type: "select",
    options: ["AISI 430", "AISI 304", "AISI 316", "AISI 201"],
  },
  {
    name: "shelveThickness",
    label: "Толщина стали",
    type: "number",
    options: ["0.7", "1.0", "1.2", "1.5"],
  },
  {
    name: "materialPipeType",
    label: "Материал трубы",
    type: "select",
    options: ["AISI 430", "AISI 304", "AISI 316", "AISI 201"],
  },
  {
    name: "pipe",
    label: "Размер трубы",
    type: "select",
    options: ["20х20мм", "25х25мм", "40х20мм", "40х40мм"],
  },
  {
    name: "width",
    label: "Ширина стеллажа",
    type: "number",
  },
  { name: "length", label: "Длина стеллажа", type: "number" },
  { name: "height", label: "Высота стеллажа", type: "number" },
  { name: "shelfLevels", label: "Количество полок", type: "number" },
  {
    name: "heightFromFloor",
    label: "Высота от пола",
    type: "number",
  },
];
