import styled from "styled-components";
import { styled as styledMui, Button } from "@mui/material";
import { breakPoints, pallete } from "../../styles/GlobalStyles";

export const LeftDiv = styled.div``;

export const List = styled.ul`
  display: flex;
  justify-content: center;
  padding: 2vw 0;
  gap: 2vw;
  @media (max-width: ${breakPoints.tablet}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: ${breakPoints.mobile}) {
    margin-top: 1vh;
    gap: 3vh;
  }
`;

export const Item = styled.li`
  background-color: transparent;
  box-shadow: 0px 0px 10px ${pallete.dark};
  padding: 1.5vw;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${breakPoints.tablet}) {
    width: 45%;
  }
  @media (max-width: ${breakPoints.mobile}) {
    width: 80%;
    padding: 3vw;
  }
`;

export const ItemTitle = styled.h4`
  text-align: center;
  padding-bottom: 16px;
  font-weight: 400;
  border-bottom: 1px solid;
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: flex-start;
  gap: 8px;
`;

export const ItemData = styled.span`
  color: ${pallete.dark};
`;

export const LogoutDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const LogoutButton = styledMui(Button)`
  width: fit-content;
  justify-self: center;
  text-align: center;
  margin-top: 15px;
  background-color: rgb(69, 80, 61);
  color: white;
  :hover {
    background-color: rgb(180, 190, 170);
    transition: 350ms;
  }
`;
