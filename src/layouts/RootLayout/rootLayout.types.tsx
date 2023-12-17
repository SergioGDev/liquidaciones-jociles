
import { ThemeProvider, createTheme } from "@mui/material";
import { green } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: green[800],
    },
  },
});
