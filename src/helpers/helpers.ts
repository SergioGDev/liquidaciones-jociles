import { KeyHeaderIndex, KeyMap } from "@/types/template.types";

export const enumToArray = (enumObject: any) => {
  return Object.keys(enumObject).map((key) => ({
    label: enumObject[key],
    key,
  }));
};

export const haveDuplicates = (data: string[]) => {
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (data[i] === data[j]) {
        return true;
      }
    }
  }
  return false;
};

export const getHeadersIndex = (
  headers: string[],
  map: KeyMap,
): KeyHeaderIndex => {
  const vHeaderIndex: { [key: string]: { key: string; index: number } } = {};

  Object.keys(map).forEach((key) => {
    vHeaderIndex[key] = {
      key: map[key],
      index: headers.indexOf(map[key]),
    };
  });

  return vHeaderIndex;
};
