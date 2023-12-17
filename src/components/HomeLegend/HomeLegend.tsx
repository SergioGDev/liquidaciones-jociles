import React from "react";
import styles from "./HomeLegend.module.scss";
import { Typography } from "@mui/material";

const HomeLegend = () => {
  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Leyenda
      </Typography>

      <Typography variant="body1">
        Esta herramienta te permitirá compara las liquidaciones presentes en tu
        fichero de pólizas QUE NO ESTÁN PRESENTES en el fichero matriz. Para el
        correcto uso de esta herramienta hay que tener varias consideraciones
        previas:
      </Typography>

      <ul>
        <li className={styles.itemLista}>
          <Typography variant="body1">
            La aplicación solamente permite el uso de ficheros con extensión
            .CSV. Los fichero nativos de excel (con extensión .xlsx) no están
            permitidos y no se podrán adjuntar.
          </Typography>
        </li>
        <li className={styles.itemLista}>
          <Typography variant="body1">
            Si usted tiene un fichero con extensión .xlsx deberá guardarlo con
            extensión .csv previamente. Si no sabes cómo hacerlo, te dejo un
            tutorial de cómo hacerlo{" "}
            <a
              className={styles.url}
              href="https://www.youtube.com/watch?v=5RrmTaKRYwI&ab_channel=Ciudadano2.0"
              target="_blank"
            >
              PULSANDO AQUÍ
            </a>
            .
          </Typography>
        </li>
        <li className={styles.itemLista}>
          IMPORTANTE: La primera fila de ambos ficheros CSV debe de contener LA
          CABECERA DE LAS TABLAS CON LOS NOMBRES (ej: &rdquo;Nº Póliza&rdquo;,
          &rdquo;Tomador&rdquo;, &rdquo;Comisión&rdquo;, &rdquo;NIF&rdquo;,
          ETC...). Estos títulos son los que se utlizarán más tarde para rellenar los datos de la tabla.
        </li>
        <li className={styles.itemLista}>Si no se tienen en cuenta cualquiera de estos puntos, EL FUNCIONAMIENTO DE LA APLICACIÓN NO SERÁ EL ADECUADO.</li>
      </ul>
    </>
  );
};

export default HomeLegend;
