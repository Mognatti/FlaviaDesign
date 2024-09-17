import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { SidebarStatusContext } from "../../context/SidebarStatus";
import { navOpt } from "./navOpt";
import * as S from "./styles";
import useWindowSize from "../../hooks/useWindowSize";

export default function Sidebar() {
  const { isOpen, setIsOpen } = useContext(SidebarStatusContext);
  const [{ isMobile }] = useWindowSize();
  const location = useLocation();
  const isActiveLink = (linkTo: string) =>
    linkTo === "/" ? location.pathname === "/" : location.pathname.includes(linkTo);

  return (
    <S.SidebarContainer close={!isOpen && !isMobile}>
      <S.Controllers show={!isMobile}>
        <S.MenuIconDiv close={isOpen}>
          {!isMobile && <S.ControllSidebarIcon size={22} onClick={() => setIsOpen(!isOpen)} />}{" "}
        </S.MenuIconDiv>
      </S.Controllers>
      <S.SidebarList>
        {navOpt.map((link) => (
          <S.SidebarItem key={link.id}>
            <S.SidebarLink to={link.to} close={!isOpen || isMobile}>
              <S.Icon active={isActiveLink(link.to)}>{link.icon}</S.Icon>
              {link.nome}
            </S.SidebarLink>
          </S.SidebarItem>
        ))}
      </S.SidebarList>
    </S.SidebarContainer>
  );
}
