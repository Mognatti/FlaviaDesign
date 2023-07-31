import { navOpt } from "./navOpt";
import * as S from "./styles";
export default function Header() {
  return (
    <S.StyledHeader>
      <nav>
        <S.HeaderList>
          {navOpt.map((link) => (
            <S.HeaderItem key={link.id}>
              <S.HeaderStyledLink to={link.to}>{link.nome}</S.HeaderStyledLink>
            </S.HeaderItem>
          ))}
        </S.HeaderList>
      </nav>
    </S.StyledHeader>
  );
}
