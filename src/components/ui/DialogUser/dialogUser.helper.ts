import { haveDuplicates } from "@/helpers/helpers";
import { KeyMap } from "@/types/template.types";

export const isValidForm = (map: KeyMap, file: 'matriz' | 'jociles') => {
  return (file === 'matriz') ? (
    Object.values(map).length === 4 &&
    Object.values(map).every((value) => value !== "") &&
    haveDuplicates(Object.values(map)) === false
  ) : (
    map.numeroPoliza! !== ''
  )
};
