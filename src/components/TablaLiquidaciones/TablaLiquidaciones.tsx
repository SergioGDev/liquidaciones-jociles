import React, { useState } from "react";
import styles from "./TablaLiquidaciones.module.scss";

import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import {
  EnhancedTableProps,
  TablaLiquidacionesProps,
  TablePaginationActionsProps,
} from "./tablaLiquidaciones.types";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  IconButton,
  Box,
  TableSortLabel,
} from "@mui/material";
import { RowData, Template } from "@/types/template.types";
import { headerCells } from "./tablaLiquidaciones.consts";
import { FilaTablaLiquidacionesProps } from "./tablaLiquidaciones.types";
import { Order, getComparator, stableSort } from "./tablaLiquidaciones.helper";

const TablaLiquidacionesHead = (props: EnhancedTableProps) => {
  const { order, orderBy, rowCount, onRequestSort, vOptionalColumns } = props;
  const createSortHandler =
    (property: keyof RowData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headerCells.map(
          ({ id, label }) =>
            ([
              "numeroPoliza",
              "numeroRecibo",
              "nombreCliente",
              "comision",
            ].includes(id) ||
              vOptionalColumns.includes(id)) && (
              <TableCell
                key={id}
                sortDirection={orderBy === id ? order : false}
              >
                <TableSortLabel
                  onClick={createSortHandler(id)}
                  active={orderBy === id}
                  direction={orderBy === id ? order : "asc"}
                >
                  {label}
                </TableSortLabel>
              </TableCell>
            )
        )}

        <TableCell>
          <TableSortLabel onClick={createSortHandler("existe")}>
            ¿Existe?
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

const FilaTablaLiquidaciones = ({
  rowData,
  vOptionalColumns
}: FilaTablaLiquidacionesProps) => {
  const {
    numeroPoliza,
    numeroRecibo,
    nombreCliente,
    nif,
    fecha,
    comision,
    existe,
  } = rowData;

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row" sx={{ width: "200px" }}>
        {numeroPoliza}
      </TableCell>
      <TableCell>{numeroRecibo}</TableCell>
      <TableCell>{nombreCliente}</TableCell>

      {vOptionalColumns.indexOf("nif") !== -1 && (
        <TableCell sx={{ width: "140px" }}>{nif}</TableCell>
      )}
      {vOptionalColumns.indexOf("fecha") !== -1 && fecha && (
        <TableCell sx={{ width: "140px" }}>
          {fecha.toLocaleDateString()}
        </TableCell>
      )}

      <TableCell align="right" sx={{ width: "100px" }}>
        {Number.parseFloat(comision).toLocaleString('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €
      </TableCell>

      <TableCell>
        {existe === true ? (
          <span className={styles.estaEnListado}>Está en el listado</span>
        ) : (
          <span className={styles.noEstaEnListado}>No está</span>
        )}
      </TableCell>
    </TableRow>
  );
};

const TablaLiquidaciones = ({
  data,
  vPolizas,
  comparatorValue,
  vOptionalColumns,
}: TablaLiquidacionesProps) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof RowData>(comparatorValue);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const estaEnListado = (value: string) => {
    return vPolizas.indexOf(value) !== -1;
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof RowData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo<RowData[]>(() => {
    const fullData = data.map(
      (item) =>
        ({
          ...item,
          existe: estaEnListado(
            comparatorValue === "numeroPoliza"
              ? item.numeroPoliza
              : item.numeroRecibo
          ),
        } as RowData)
    );
    const orderedList = stableSort(fullData, getComparator(order, orderBy));
    return orderedList.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy, page, rowsPerPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            {/* Head */}
            <TablaLiquidacionesHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              vOptionalColumns={vOptionalColumns}
            />

            {/* Body */}
            <TableBody>
              {visibleRows.map((rowData, index) => (
                <FilaTablaLiquidaciones
                  key={index}
                  rowData={rowData}
                  vOptionalColumns={vOptionalColumns}
                  comparatorValue={comparatorValue}
                  vPolizas={vPolizas}
                />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[25, 50, { label: "Todas", value: -1 }]}
                  colSpan={5 + vOptionalColumns.length}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  labelRowsPerPage="Pólizas por página:"
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} de ${count} pólizas`
                  }
                  onPageChange={(event, newPage) => setPage(newPage)}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TablaLiquidaciones;
