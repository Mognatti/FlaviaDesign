import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Calendar from "./pages/Calendario";
import Clients from "./pages/Cliente";
import NotFount from "./pages/NotFound";
import Financeiro from "./pages/Financeiro";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import Procedimentos from "./pages/Procedimentos";
import { SidebarStatusProvider } from "./context/SidebarStatus";

export default function AppRouter() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SidebarStatusProvider>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agenda" element={<Calendar />} />
            <Route path="/clientes" element={<Clients />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/procedimentos" element={<Procedimentos />} />
            <Route path="*" element={<NotFount />}></Route>
          </Routes>
        </SidebarStatusProvider>
      </Router>
    </ThemeProvider>
  );
}
