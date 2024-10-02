import { createTheme } from "@mui/material";
import * as Global from "../GlobalStyles";

export const theme = createTheme({
  palette: {
    primary: {
      100: Global.pallete.primary[100],
      200: Global.pallete.primary[200],
      300: Global.pallete.primary[300],
      400: Global.pallete.primary[400],
      main: Global.pallete.primary[500],
      600: Global.pallete.primary[600],
      700: Global.pallete.primary[700],
      800: Global.pallete.primary[800],
      900: Global.pallete.primary[900],
    },
    secondary: {
      100: Global.pallete.accent[100],
      200: Global.pallete.accent[200],
      300: Global.pallete.accent[300],
      400: Global.pallete.accent[400],
      main: Global.pallete.accent[500],
      600: Global.pallete.accent[600],
      700: Global.pallete.accent[700],
      800: Global.pallete.accent[800],
      900: Global.pallete.accent[900],
    },
    grey: {
      100: Global.pallete.secondary[100],
      200: Global.pallete.secondary[200],
      300: Global.pallete.secondary[300],
      400: Global.pallete.secondary[400],
      500: Global.pallete.secondary[500],
      600: Global.pallete.secondary[600],
      700: Global.pallete.secondary[700],
      800: Global.pallete.secondary[800],
      900: Global.pallete.secondary[900],
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
