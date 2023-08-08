import styled from "styled-components";
import { styled as styledMui } from "@mui/material/styles";
import { Button } from "@mui/material";
import { breakPoints, pallete } from "../../styles/GlobalStyles";

export const CalendarContainer = styled.div`
  width: 100%;
  padding: 28px 0px;
  padding-bottom: 63px;
  display: flex;
  justify-content: space-around;
  background-color: ${pallete.lighterGreen};
  gap: 2%;
  @media (max-width: 1300px) {
    flex-direction: column;
    align-items: center;
    padding: 16px 0px;
    @media (max-width: 818px) {
      flex-direction: column;
      align-items: center;
      padding: 16px 0px;
    }
  }
`;

export const CalendarForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  width: 35%;
  margin-top: 1%;
  border-radius: 15px;
  padding: 16px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);

  @media (max-width: 1300px) {
    margin-top: 1%;
    @media (max-width: 818px) {
      width: 320px;
      @media (max-width: ${breakPoints.mobile}) {
        width: 300px;
      }
    }
  }
`;

export const SelectServiceDiv = styled.div`
  display: flex;
  width: 100%;
  gap: 18px;
`;

export const EmbedCalendarBig = styled.div`
  margin-top: 1.2%;
  border: none;
  display: inherit;
  @media (max-width: 840px) {
    display: none;
  }
`;

export const EmbedCalendarSmall = styled.div`
  display: none;
  @media (max-width: 840px) {
    display: inherit;
  }
`;

export const StyledButton = styledMui(Button)`
display: flex;
justify-content: center;
padding: 16px;
align-items: center;
flex-direction: column;
color:#c3ccbf;
`;
