import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Calendar from "./pages/Calendario";
import Clients from "./pages/Cliente";
import NotFount from "./pages/NotFound";

export default function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendario" element={<Calendar />} />
        <Route path="/clientes" element={<Clients />} />
        <Route path="*" element={<NotFount />}></Route>
      </Routes>
    </Router>
  );
}
