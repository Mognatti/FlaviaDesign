import { RiGroupFill, RiCalendarCheckFill, RiHome2Fill } from "react-icons/ri";
import { FaHandHoldingHeart, FaCoins } from "react-icons/fa";
import { pallete } from "../../styles/GlobalStyles";

export const navOpt = [
  {
    id: 1,
    nome: "Agenda",
    to: "/agenda",
    icon: <RiCalendarCheckFill color={pallete.dark} size="25" />,
  },
  {
    id: 2,
    nome: "Clientes",
    to: "/clientes",
    icon: <RiGroupFill color={pallete.dark} size="25" />,
  },
  {
    id: 3,
    nome: "Home",
    to: "/",
    icon: <RiHome2Fill color={pallete.dark} size="25" />,
  },
  {
    id: 4,
    nome: "Procedimentos",
    to: "/procedimentos",
    icon: <FaHandHoldingHeart color={pallete.dark} size="25" />,
  },
  {
    id: 5,
    nome: "Financeiro",
    to: "/financeiro",
    icon: <FaCoins color={pallete.dark} size="25" />,
  },
];
