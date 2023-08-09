import { TimePicker } from "@mui/x-date-pickers";
import styled from "styled-components";
import { breakPoints } from "../../styles/GlobalStyles";

export const TimeInput = styled(TimePicker)`
  width: 72%;

  @media (max-width: ${breakPoints.mobile}) {
    width: 80%;
  }
`;
export const CreatingDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const CreatingForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 310px;
  background-color: rgba(69, 80, 61, 0.4);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 8px;
  margin-top: 2%;
  margin-bottom: 5vh;
  @media (max-width: 900px) {
    margin-top: 5%;
    width: 280px;
  }
  @media (max-width: ${breakPoints.mobile}) {
    margin-left: -30px;
  }
  @media (max-width: ${breakPoints.smallMobile}) {
    margin-left: -42px;
  }
`;
