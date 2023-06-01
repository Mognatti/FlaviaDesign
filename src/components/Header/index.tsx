import styled from "styled-components";
import { navOpt } from "./navOpt";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
  background-color: rgb(195, 204, 191);
  border-bottom: 1px solid rgba(69, 80, 61, 255);
  color: white;
  width: 100%;
  height: 8vh;
  padding: none;
  margin: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  padding: 0;
`;

const Item = styled.li`
  padding: 16px;
  color: black;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  :hover {
    transition: 350ms;
    opacity: 0.5;
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <nav>
        <List>
          {navOpt.map((link) => (
            <Item key={link.id}>
              <StyledLink to={link.to}>{link.nome}</StyledLink>
            </Item>
          ))}
        </List>
      </nav>
    </StyledHeader>
  );
}
