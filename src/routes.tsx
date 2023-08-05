import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Calendar from "./pages/Calendario";
import Clients from "./pages/Cliente";
import NotFount from "./pages/NotFound";
import Financeiro from "./pages/Financeiro";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
export default function AppRouter() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendario" element={<Calendar />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="*" element={<NotFount />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
