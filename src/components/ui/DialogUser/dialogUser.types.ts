import { ComparatorValue, KeyMap } from "@/types/template.types";

export type DialogProps = {
  onClose: (returnValue?: DialogReturnValue) => void;
  open: boolean;
  headers?: string[];
  file: "matriz" | "jociles";
};


export type DialogReturnValue = {
  map: KeyMap;
  optionalMap: KeyMap;
  comparatorValue: ComparatorValue;
}