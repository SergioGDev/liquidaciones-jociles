'use client'
import { DialogReturnValue } from "@/components/ui/DialogUser/dialogUser.types";
import { getHeadersIndex } from "@/helpers/helpers";
import { ComparatorValue, KeyMap, Template } from "@/types/template.types";
import { useState } from "react";

const useHomePage = () => {
  // DATA
  const [data, setData] = useState<{
    matriz: Template[];
    jociles: string[];
    comparatorValue: ComparatorValue;
    optionalKeys: string[];
  }>({
    matriz: [],
    jociles: [],
    comparatorValue: "numeroPoliza",
    optionalKeys: [],
  });
  const [rows, setRows] = useState<any[]>([]);

  // DIALOG FLAGS
  const [dialogOpened, setDialogOpened] = useState<{
    matriz: boolean;
    jociles: boolean;
  }>({ matriz: false, jociles: false });
  const [dialogSelected, setDialogSelected] = useState<"matriz" | "jociles">(
    "matriz"
  );

  // HEADERS
  const [headers, setHeaders] = useState<{
    matriz: string[];
    jociles: string[];
  }>({ matriz: [], jociles: [] });

  const [snackbarData, setSnackbarData] = useState<{
    opened: boolean;
    msg: string;
  }>({ opened: false, msg: "" });

  // EVENTOS //
  // ON FILE LOADED //
  const handleOnFileLoaded = (data: any[], file: "matriz" | "jociles") => {
    if (data.length === 0) {
      setSnackbarData({ msg: "El fichero está vacío", opened: true });
    } else if (data.length === 1) {
      setSnackbarData({
        msg: "El fichero solamente tiene cabeceras",
        opened: true,
      });
    } else {
      const rows: string[] = data as string[];
      setHeaders((prev) => ({ ...prev, [file]: rows[0] }));
      setDialogSelected(file);
      setRows(data.slice(1));
      setDialogOpened((prev) => ({ ...prev, [file]: true }));
    }
  };

  // ON CLOSE DIALOG //+
  const handleOnCloseDialog = (
    file: "matriz" | "jociles",
    returnValue?: DialogReturnValue
  ) => {
    setDialogOpened({ matriz: false, jociles: false });
    if (!returnValue) return;

    const { map, optionalMap, comparatorValue } = returnValue;

    if (file === "matriz") {
      onCloseDialogMatriz(map, optionalMap, comparatorValue);
    } else {
      onCloseDialogJociles(
        comparatorValue === "numeroPoliza" ? map.numeroPoliza : map.numeroRecibo
      );
    }
  };

  const onCloseDialogMatriz = (
    map: KeyMap,
    optionalMap: KeyMap,
    comparatorValue: ComparatorValue
  ) => {
    const headerIndexMap = getHeadersIndex(headers[dialogSelected], map);
    const optionalHeaderIndexMap = getHeadersIndex(
      headers[dialogSelected],
      optionalMap
    );
    const vTemplate: Template[] = [];
    const optionalKeys: string[] = Object.keys(optionalMap);
    const rowLength = Object.keys(optionalHeaderIndexMap).length + Object.keys(headerIndexMap).length;

    rows.forEach((row: string[]) => {
      if (row.length >= rowLength) {
        vTemplate.push({
          numeroRecibo: row[headerIndexMap["numeroRecibo"].index]?.trim(),
          comision: row[headerIndexMap["comision"].index]?.trim(),
          nombreCliente: row[headerIndexMap["nombreCliente"].index]?.trim(),
          numeroPoliza: row[headerIndexMap["numeroPoliza"].index]?.trim(),
          nif: optionalKeys.includes("nif")
            ? row[optionalHeaderIndexMap["nif"].index]?.trim()
            : "",
          fecha: optionalKeys.includes("fecha")
            ? row[optionalHeaderIndexMap["fecha"].index] !== undefined
              ? getDate(row[optionalHeaderIndexMap["fecha"].index].trim())
              : undefined
            : undefined,
        });
      }
    });
    
    setData((prev) => ({
      ...prev,
      matriz: vTemplate,
      comparatorValue,
      optionalKeys,
    }));
  };

  const onCloseDialogJociles = (header: string) => {
    const headerIndex = headers.jociles.indexOf(header);
    setData((prev) => ({
      ...prev,
      jociles: rows.map((row) => row[headerIndex]?.trim()),
    }));
  };

  const getDate = (dateStr: string) => {
    const split = dateStr.split("/");
    return new Date(Number(split[2]), Number(split[1]) - 1, Number(split[0]));
  };

  return {
    data,
    setData,
    dialogOpened,
    setDialogOpened,
    headers,
    setHeaders,
    handleOnCloseDialog,
    snackbarData,
    setSnackbarData,
    handleOnFileLoaded,
    dialogSelected,
    setDialogSelected,
  };
};

export default useHomePage;