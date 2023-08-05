import { createTheme } from "@mui/material";
import * as S from "../GlobalStyles";

export const theme = createTheme({
  palette: {
    primary: {
      main: S.pallete.dark,
    },
    secondary: {
      main: S.pallete.green,
    },
  },
});
