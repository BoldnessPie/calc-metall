export interface CalcResult {
  shelveSpecification: {
    steel: Array<string | number>;
    pipe: Array<string | number>;
    width: number;
    length: number;
    height: number;
    shelfLevels: number;
    heightFromFloor: number;
  };
  calculation: {
    steelSheets: Array<number | string>;
    pipe: {
      height: string;
      width: string;
      length: string;
    };
    step: string;
    aside: {
      width: string;
      length: string;
    };
  };
}

export interface ResultProps {
  result: CalcResult;
  onBack: () => void;
}
