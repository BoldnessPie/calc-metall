export interface CalcResult {
  tableSpecification: {
    width: number;
    length: number;
    height: number;
    pipe: number;
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
