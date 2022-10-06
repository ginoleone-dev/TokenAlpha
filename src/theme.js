import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#202020",
      light: "#FFEE32",
    },
    secondary: {
      main: "#333533",
    },
    darkGray: {
      main: "#999",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
