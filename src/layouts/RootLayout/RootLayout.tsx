import React, { PropsWithChildren } from "react";
import styles from "./RootLayout.module.scss";
import { ThemeProvider } from "@mui/material";
import { theme } from "./rootLayout.types";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={styles.bodyStyle}>
        <ThemeProvider theme={theme}>
          <div className={styles.container}>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
