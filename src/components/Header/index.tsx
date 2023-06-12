import { navOpt } from "./navOpt";
import {
  HeaderItem,
  HeaderList,
  HeaderStyledLink,
  StyledHeader,
} from "../../styles/StyledComponenets";

export default function Header() {
  return (
    <StyledHeader>
      <nav>
        <HeaderList>
          {navOpt.map((link) => (
            <HeaderItem key={link.id}>
              <HeaderStyledLink to={link.to}>{link.nome}</HeaderStyledLink>
            </HeaderItem>
          ))}
        </HeaderList>
      </nav>
    </StyledHeader>
  );
}
