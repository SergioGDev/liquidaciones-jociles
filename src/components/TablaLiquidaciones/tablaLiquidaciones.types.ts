import { ComparatorValue, RowData, Template } from "@/types/template.types";

// Props for the component
export type TablaLiquidacionesProps = {
  data: Template[];
  vPolizas: string[];
  vOptionalColumns: string[];
  comparatorValue: ComparatorValue;
};

export type TablePaginationActionsProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
};

export type FilaTablaLiquidacionesProps = {
  rowData: RowData;
  vOptionalColumns: string[];
  comparatorValue: ComparatorValue;
  vPolizas: string[];
}

export interface HeaderCell {
  id: keyof Template;
  label: string;
}

export type EnhancedTableProps = {
  vOptionalColumns: string[];
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof RowData) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
type Order = 'asc' | 'desc';