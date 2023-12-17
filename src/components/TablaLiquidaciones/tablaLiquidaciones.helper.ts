import { RowData } from "@/types/template.types";

const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
  if (orderBy === "comision") {
    const numA = Number.parseFloat((a[orderBy] as string).replace(",", "."));
    const numB = Number.parseFloat((b[orderBy] as string).replace(",", "."));
    return numB < numA ? -1 : 1;
  }
  if (orderBy === "fecha") {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const strA = (a[orderBy] as string).toLowerCase();
  const strB = (b[orderBy] as string).toLowerCase();

  return strB < strA ? -1 : 1;
};

export type Order = "asc" | "desc";

export const getComparator = (
  order: Order,
  orderBy:
    | "numeroPoliza"
    | "numeroRecibo"
    | "nombreCliente"
    | "fecha"
    | "nif"
    | "comision"
    | "existe"
): ((a: RowData, b: RowData) => number) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = (
  array: readonly RowData[],
  comparator: (a: RowData, b: RowData) => number
) => {
  const stabilizedThis = array.map(
    (el, index) => [el, index] as [RowData, number]
  );
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
