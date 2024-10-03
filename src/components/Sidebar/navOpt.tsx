import { RiGroupFill, RiCalendarCheckFill, RiHome2Fill } from "react-icons/ri";
import { FaHandHoldingHeart, FaCoins } from "react-icons/fa";

export const navOpt = [
  {
    id: 1,
    nome: "Agenda",
    to: "/agenda",
    icon: <RiCalendarCheckFill size="25" />,
  },
  {
    id: 2,
    nome: "Clientes",
    to: "/clientes",
    icon: <RiGroupFill size="25" />,
  },
  {
    id: 3,
    nome: "Home",
    to: "/",
    icon: <RiHome2Fill size="25" />,
  },
  {
    id: 4,
    nome: "Procedimentos",
    to: "/procedimentos",
    icon: <FaHandHoldingHeart size="25" />,
  },
  {
    id: 5,
    nome: "Financeiro",
    to: "/financeiro",
    icon: <FaCoins size="25" />,
  },
];
