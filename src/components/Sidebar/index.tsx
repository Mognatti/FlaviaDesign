import useWindowSize from "../../hooks/useWindowSize";
import { navOpt } from "./navOpt";
import * as S from "./styles";
export default function Sidebar() {
  const [{ showIcon }] = useWindowSize();
  return (
    <S.StyledHeader>
      <nav>
        <S.HeaderList>
          {showIcon
            ? navOpt.map((icon) => (
                <S.HeaderItem key={icon.id}>
                  <S.HeaderStyledLink to={icon.to}>
                    {icon.icon}
                  </S.HeaderStyledLink>
                </S.HeaderItem>
              ))
            : navOpt.map((link) => (
                <S.HeaderItem key={link.id}>
                  <S.HeaderStyledLink to={link.to}>
                    {link.nome}
                  </S.HeaderStyledLink>
                </S.HeaderItem>
              ))}
        </S.HeaderList>
      </nav>
    </S.StyledHeader>
  );
}
