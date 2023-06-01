import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./routes";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { client } from "./supabaseClient";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <SessionContextProvider supabaseClient={client}>
        <AppRouter />
      </SessionContextProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
