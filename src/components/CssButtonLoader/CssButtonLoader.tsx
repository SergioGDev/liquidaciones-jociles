import React from "react";
import styles from "./CssButtonLoader.module.scss";
import { CssButtonLoaderProps } from "./cssButtonLoader.types";
import CSVReader from "react-csv-reader";

const CssButtonLoader = ({ label, onFileLoaded }: CssButtonLoaderProps) => {
  return (
    <div>
      <CSVReader
        onFileLoaded={(data) => onFileLoaded(data)}
        cssClass={styles["csv-reader-input"]}
        label={label}
      />
    </div>
  );
};

export default CssButtonLoader;
