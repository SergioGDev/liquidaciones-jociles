import React, { useEffect, useState } from "react";

import { DialogProps } from "./dialogUser.types";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { enumToArray } from "@/helpers/helpers";
import {
  ComparatorValue,
  Headers,
  HeadersOpcionales,
  KeyMap,
} from "@/types/template.types";
import { isValidForm } from "./dialogUser.helper";

const DialogUser = ({ onClose, open, file, headers = [] }: DialogProps) => {
  const [map, setMap] = useState<KeyMap>({});
  const [optionalMap, setOptionalMap] = useState<KeyMap>({});
  const [comparatorValue, setComparatorValue] =
    useState<ComparatorValue>("numeroPoliza");

  useEffect(
    () => enumToArray(Headers).forEach(({ key }) => (map[key] = "")),
    []
  );

  const vSelects: {
    label: any;
    key: string;
  }[] =
    file === "matriz"
      ? enumToArray(Headers)
      : [{ label: Headers.numeroPoliza, key: "numeroPoliza" }];

  const vSelectsOpcionales: {
    label: any;
    key: string;
  }[] = enumToArray(HeadersOpcionales);

  return (
    <Dialog onClose={() => onClose()} open={open}>
      <DialogTitle>Asigna los valores de las columnas</DialogTitle>

      <DialogContent>
        <Box sx={{ minWidth: "450px" }}>
          {headers.length === 0 ? (
            <Box sx={{ paddingBottom: 3, textAlign: "center" }}>
              No contenido en el fichero CSV adjunto...
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                marginBottom: 2,
              }}
            >
              {file === "matriz" && (
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  Seleccione el dato por el que comparar:
                </Typography>
              )}
              {file === "matriz" && (
                <FormControl fullWidth>
                  <InputLabel variant="standard">
                    Dato por el que comparar
                  </InputLabel>
                  <Select
                    variant="standard"
                    defaultValue=""
                    value={comparatorValue}
                    onChange={({ target }) =>
                      setComparatorValue(target.value as ComparatorValue)
                    }
                  >
                    <MenuItem value={"numeroRecibo"}>Número de Recibo</MenuItem>
                    <MenuItem value={"numeroPoliza"}>Número de Póliza</MenuItem>
                  </Select>
                </FormControl>
              )}
              {file === "matriz" && (
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  Indique las columnas OBLIGATORIAS:
                </Typography>
              )}

              {vSelects.map(({ key, label }) => (
                <Autocomplete
                  key={key}
                  fullWidth
                  id={`combo-${key}`}
                  options={headers}
                  onChange={(event, value) =>
                    setMap((prev) => ({ ...prev, [key]: value ?? "" }))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={label}
                      placeholder="Cabecera de la tabla"
                      fullWidth
                    />
                  )}
                />
              ))}
              
              {file === "matriz" && (
                <>
                  <Typography variant="body1" sx={{ marginTop: 4 }}>
                    Indique las columnas <i>OPCIONALES</i>:
                  </Typography>
                  {vSelectsOpcionales.map(({ key, label }) => (
                    <Autocomplete
                      key={key}
                      fullWidth
                      id={`combo-${key}`}
                      options={headers}
                      onChange={(event, value) =>
                        setOptionalMap((prev) => ({
                          ...prev,
                          [key]: value ?? "",
                        }))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label={label}
                          placeholder="Cabecera de la tabla"
                          fullWidth
                        />
                      )}
                    />
                  ))}
                </>
              )}
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="warning" onClick={() => onClose()}>
          Cancelar
        </Button>
        <Button
          disabled={
            !isValidForm(map, file) &&
            (comparatorValue === "numeroPoliza" ||
              comparatorValue === "numeroRecibo")
          }
          onClick={() => onClose({ map, optionalMap, comparatorValue })}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogUser;
