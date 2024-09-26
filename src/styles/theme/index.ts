import { createTheme } from "@mui/material";
import * as Global from "../GlobalStyles";

export const theme = createTheme({
  palette: {
    primary: {
      100: Global.pallete.green[100],
      200: Global.pallete.green[200],
      300: Global.pallete.green[300],
      400: Global.pallete.green[400],
      main: Global.pallete.green[500],
      600: Global.pallete.green[600],
      700: Global.pallete.green[700],
      800: Global.pallete.green[800],
      900: Global.pallete.green[900],
    },
    secondary: {
      100: Global.pallete.lime[100],
      200: Global.pallete.lime[200],
      300: Global.pallete.lime[300],
      400: Global.pallete.lime[400],
      main: Global.pallete.lime[500],
      600: Global.pallete.lime[600],
      700: Global.pallete.lime[700],
      800: Global.pallete.lime[800],
      900: Global.pallete.lime[900],
    },
    grey: {
      100: Global.pallete.gray[100],
      200: Global.pallete.gray[200],
      300: Global.pallete.gray[300],
      400: Global.pallete.gray[400],
      500: Global.pallete.gray[500],
      600: Global.pallete.gray[600],
      700: Global.pallete.gray[700],
      800: Global.pallete.gray[800],
      900: Global.pallete.gray[900],
    },
  },
  typography: {
    h1: {
      fontSize: Global.typography.h1,
    },
    h2: {
      fontSize: Global.typography.h2,
    },
    h3: {
      fontSize: Global.typography.h3,
    },
    h4: {
      fontSize: Global.typography.h4,
    },
    h5: {
      fontSize: Global.typography.h5,
    },
  },
});
