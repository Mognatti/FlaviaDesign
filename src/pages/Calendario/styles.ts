import styled from "styled-components";
import { styled as styledMui } from "@mui/material/styles";
import { Button } from "@mui/material";

export const CalendarContainer = styled.div`
  width: 100%;
  padding: 28px 0px;
  padding-bottom: 63px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  background-color: rgb(195, 204, 191);

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
  background-color: rgba(69, 80, 61, 0.4);
  width: 35%;
  margin-top: 2%;
  border-radius: 15px;
  padding: 16px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.4);

  @media (max-width: 1300px) {
    margin-top: 1%;
    @media (max-width: 818px) {
      width: 320px;
    }
  }
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
background-color: gray;
`;
