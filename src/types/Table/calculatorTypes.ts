export interface CalcResult {
  tableSpecification: {
    steelSheet: Array<string | number>;
    plywoodTickness: number;
    adjustableLengsH: number;
    width: number;
    length: number;
    height: number;
    pipe: Array<string | number>;
    shelf: boolean;
    shelfLevels: number;
    heightFromFloor: number;
  };
  calculation: {
    pipe: {
      height: string;
      top: { width: string; length: string };
      bottom: { width: string; length: string };
    };
    step: string | null;
    sheets: {
      tableTop: string;
      tableAside: string | null;
      tableShelf: string | null;
    };
  };
}

export interface ResultProps {
  result: CalcResult;
  onBack: () => void;
}
