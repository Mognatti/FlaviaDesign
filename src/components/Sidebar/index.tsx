import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { SidebarStatusContext } from "../../context/SidebarStatus";
import { navOpt } from "./navOpt";
import * as S from "./styles";
import useWindowSize from "../../hooks/useWindowSize";

export default function Sidebar() {
  const { isOpen, setIsOpen } = useContext(SidebarStatusContext);
  const [{ isTablet }] = useWindowSize();
  const location = useLocation();
  const isActiveLink = (linkTo: string) =>
    linkTo === "/"
      ? location.pathname === "/"
      : location.pathname.includes(linkTo);

  return (
    <S.SidebarContainer className={isOpen && !isTablet ? "" : "close"}>
      <S.Controllers className={isOpen ? "" : "close"}>
        <S.MenuIconDiv open={isOpen}>
          {!isTablet && <S.MenuIcon onClick={() => setIsOpen(!isOpen)} />}
        </S.MenuIconDiv>
      </S.Controllers>
      <S.SidebarList>
        {navOpt.map((link) => (
          <S.SidebarItem key={link.id} active={isActiveLink(link.to)}>
            <S.SidebarLink to={link.to} close={!isOpen || isTablet}>
              <S.Icon>{link.icon}</S.Icon>
              {link.nome}
            </S.SidebarLink>
          </S.SidebarItem>
        ))}
      </S.SidebarList>
    </S.SidebarContainer>
  );
}
