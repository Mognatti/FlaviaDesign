import { RiGroupFill, RiCalendarCheckFill, RiHome2Fill } from "react-icons/ri";

export const navOpt = [
  {
    id: 1,
    nome: "Calendário",
    to: "/calendario",
    icon: <RiCalendarCheckFill size="20" />,
  },
  { id: 2, nome: "Home", to: "/", icon: <RiHome2Fill size="20" /> },
  { id: 3, nome: "Clientes", to: "/clientes", icon: <RiGroupFill size="20" /> },
];
