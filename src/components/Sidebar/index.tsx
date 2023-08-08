import { useEffect, useContext } from "react";
import { SidebarStatusContext } from "../../context/SidebarStatus";
import { navOpt } from "./navOpt";
import * as S from "./styles";
import useWindowSize from "../../hooks/useWindowSize";
export default function Sidebar() {
  const { isOpen, setIsOpen } = useContext(SidebarStatusContext);
  const [{ isTablet }] = useWindowSize();

  useEffect(() => {
    const linkList = document.querySelectorAll(".link");
    linkList.forEach((item) => {
      const li = item.parentElement;
      if (li?.innerText === "Home") {
        li.classList.add("active");
      }
    });
  }, []);

  function handleActiveLink() {
    const linkList = document.querySelectorAll(".link");
    linkList.forEach((item) => {
      const li = item.parentElement;
      item.addEventListener("click", () => {
        linkList.forEach((i) => {
          i.parentElement?.classList.remove("active");
        });
        li?.classList.add("active");
      });
    });
  }

  return (
    <S.SidebarContainer className={isOpen && !isTablet ? "" : "close"}>
      <S.Controllers className={isOpen ? "" : "close"}>
        <S.MenuIconDiv open={isOpen}>
          {!isTablet && <S.MenuIcon onClick={() => setIsOpen(!isOpen)} />}
        </S.MenuIconDiv>
      </S.Controllers>
      <S.SidebarList>
        {navOpt.map((link) => (
          <S.SidebarItem key={link.id}>
            <S.SidebarLink
              to={link.to}
              className="link"
              close={!isOpen || isTablet}
              onClick={() => handleActiveLink()}
            >
              <S.Icon>{link.icon}</S.Icon>
              {link.nome}
            </S.SidebarLink>
          </S.SidebarItem>
        ))}
      </S.SidebarList>
    </S.SidebarContainer>
  );
}
