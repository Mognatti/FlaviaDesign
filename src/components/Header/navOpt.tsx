import { RiGroupFill, RiCalendarCheckFill, RiHome2Fill } from "react-icons/ri";
import { TbPigMoney } from "react-icons/tb";

export const navOpt = [
  {
    id: 1,
    nome: "Calendário",
    to: "/calendario",
    icon: <RiCalendarCheckFill size="20" />,
  },
  { id: 2, nome: "Home", to: "/", icon: <RiHome2Fill size="20" /> },
  { id: 3, nome: "Clientes", to: "/clientes", icon: <RiGroupFill size="20" /> },
  {
    id: 4,
    nome: "Financeiro",
    to: "/financeiro",
    icon: <TbPigMoney size="20" />,
  },
];
