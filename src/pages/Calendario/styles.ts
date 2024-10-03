import styled from "styled-components";
import { styled as styledMui } from "@mui/material/styles";
import { Button } from "@mui/material";
import { breakPoints, pallete, Section } from "../../styles/GlobalStyles";

export const CustomGlobalSection = styled(Section)`
  margin: 32px 16px 0 80px;
  @media (max-width: ${breakPoints.tablet}) {
    margin: 4vh 4vw 10vh;
  }
`;

export const ModalTitle = styled.h3`
  font-family: var(--typography-font-family-headings);
  font-size: var(--tipography-font-size-h5);
`;

export const CalendarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1300px) {
    align-items: center;
    height: auto;
    margin-bottom: 16px;
    margin-left: 0px;
    @media (max-width: 818px) {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const CalendarForm = styled.form<{ mobile?: boolean }>`
  display: flex;
  align-self: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 570px;
  margin-top: 1%;
  margin-left: ${(props) => (props.mobile ? "0" : "-30px")};
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
  background-color: ${pallete.primary[500]};
  @media (max-width: 1300px) {
    margin-top: 1%;
    width: 600px;
    height: auto;
    margin-left: 0px;
    @media (max-width: 650px) {
      width: 90%;
    }
  }
`;

export const SelectServiceDiv = styled.div`
  display: flex;
  width: 100%;
  gap: 18px;
  @media (max-width: ${breakPoints.smallMobile}) {
    flex-direction: column;
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
display: flex;
justify-content: center;
padding: 8px;
align-items: center;
flex-direction: column;
background-color: var(--primary-600);
`;
