import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledHeader = styled.header`
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
export const HeaderList = styled.ul`
  width: 100%;
  display: flex;
  padding: 0;
`;
export const HeaderItem = styled.li`
  padding: 16px;
  color: black;
  display: flex;
  justify-content: center;
`;
export const HeaderStyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  :hover {
    transition: 350ms;
    opacity: 0.5;
  }
`;
