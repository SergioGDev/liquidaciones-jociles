import React from "react";
import styles from "./HomePage.module.scss";

import CssButtonLoader from "@/components/CssButtonLoader";
import DialogUser from "@/components/ui/DialogUser";
import TablaLiquidaciones from "@/components/TablaLiquidaciones";
import { useHomePage } from "./hooks/useHomePage";

import { Alert, Snackbar, Typography } from "@mui/material";
import HomeLegend from "@/components/HomeLegend";

const HomePage = () => {
  const {
    data,
    dialogOpened,
    headers,
    handleOnCloseDialog,
    snackbarData,
    setSnackbarData,
    handleOnFileLoaded,
  } = useHomePage();

  return (
    <>
      <div className={styles.container}>
        <Typography variant="h3" sx={{ marginTop: 4, marginBottom: 2 }}>
          Gestión de liquidaciones
        </Typography>
        <HomeLegend />

        {/* Fichero matriz */}
        <Typography variant="h6" sx={{ marginTop: 5, marginBottom: 2 }}>
          Paso 1: Selecciona el fichero matriz (con extensión CSV):
        </Typography>
        <CssButtonLoader
          label="Selecciona el fichero matríz:"
          onFileLoaded={(data) => handleOnFileLoaded(data, "matriz")}
        />

        {data.matriz.length > 0 && (
          <>
            <Typography variant="h6" sx={{ marginTop: 3, marginBottom: 3 }}>
              Paso 2: Selecciona el fichero con tus pólizas (con extensión CSV):
            </Typography>
            <CssButtonLoader
              label="Selecciona el fichero de Jociles:"
              onFileLoaded={(data) => handleOnFileLoaded(data, "jociles")}
            />
          </>
        )}
        {data.matriz.length > 0 && data.jociles.length > 0 && (
          <>
            <Typography variant="h5" sx={{ marginTop: 5, marginBottom: 3 }}>
              Resultados:
            </Typography>
            <TablaLiquidaciones
              data={data.matriz}
              vPolizas={data.jociles}
              comparatorValue={data.comparatorValue}
              vOptionalColumns={data.optionalKeys}
            />
          </>
        )}
      </div>

      {/* Dialog Matriz */}
      <DialogUser
        onClose={(returnValue) => handleOnCloseDialog("matriz", returnValue)}
        open={dialogOpened.matriz}
        headers={headers?.matriz}
        file="matriz"
      />

      {/* Dialog Jociles */}
      <DialogUser
        onClose={(returnValue) => handleOnCloseDialog("jociles", returnValue)}
        open={dialogOpened.jociles}
        headers={headers?.jociles}
        file="jociles"
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbarData?.opened}
        autoHideDuration={4000}
        onClose={() => setSnackbarData({ ...snackbarData, opened: false })}
      >
        <Alert
          onClose={() => setSnackbarData({ ...snackbarData, opened: false })}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {snackbarData.msg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HomePage;
