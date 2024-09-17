import { createTheme } from "@mui/material";
import * as Global from "../GlobalStyles";

export const theme = createTheme({
  palette: {
    primary: {
      main: Global.pallete.dark,
    },
    secondary: {
      main: Global.pallete.green,
    },
  },
});
