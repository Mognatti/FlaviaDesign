import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import { styled as styledMui, Button } from "@mui/material";

export const pallete = {
  white: "#fefefe",
  offWhite: "#e6ebdf",
  lighterGreen: "#c3ccbf",
  lightGreen: "#95a887",
  green: "#739245",
  dark: "#435b37",
  black: "#000",
};

export const breakPointsNumbers = {
  desktop: 1300,
  tablet: 800,
  smallTablet: 650,
  mobile: 470,
  smallMobile: 380,
};

export const breakPoints = {
  tablet: `${breakPointsNumbers.tablet}px`,
  smallTablet: `${breakPointsNumbers.smallTablet}px`,
  mobile: `${breakPointsNumbers.mobile}px`,
  smallMobile: `${breakPointsNumbers.smallMobile}px`,
};

//Cliente and Procedimentos Components
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const List = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 8px;
  padding-left: 0;
  gap: 3vh 3vw;
  @media (max-width: ${breakPoints.smallTablet}) {
    margin-left: -6%;
  }
  @media (max-width: ${breakPoints.mobile}) {
    flex-direction: column;
  }
`;
export const Item = styled.li`
  width: 300px;
  list-style: none;
`;
export const NotLoggedin = styled.p`
  text-align: center;
  margin-top: 15px;
`;

//Card Components
export const Form = styled.form`
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
    margin-left: -2.8vw;
  }
  @media (max-width: ${breakPoints.smallMobile}) {
    margin-left: -4vw;
  }
`;
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(69, 80, 61, 0.4);
  border-radius: 16px;
  padding: 8px;
  width: 100%;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.4);
  @media (max-width: ${breakPoints.mobile}) {
    width: 100%;
  }
`;
export const CardInfoList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px;
`;
export const CardTitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Info = styled.li`
  padding: 16px 4px;
  font-size: 14px;
  border-bottom: 1px solid rgba(195, 204, 191, 0.5);
`;
export const AutoComplete = styledMui(Autocomplete)`
width:64%;
`;
export const Submit = styledMui(Button)`
  color: black;
  margin-bottom:12px;
  margin-top:12px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const CreateButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 5vh;
`;

//General Components
export const Section = styled.section<{ sidebar?: boolean }>`
  display: flex;
  flex-direction: column;
  transition: all 300ms ease;
  margin: 32px 80px;
  @media (max-width: ${breakPoints.tablet}) {
    margin: 4vh 4vw 10vh 4vw;
  }
`;

export const SessionTitle = styled.h1`
  padding: 8px;
  margin-bottom: 16px;
  border-bottom: 2px solid rgba(69, 80, 61, 0.4);
  @media (max-width: ${breakPoints.mobile}) {
    text-align: center;
    margin-bottom: 32px;
    margin-top: -15px;
  }
`;
export const Title = styled.h3`
  text-align: center;
  padding: 8px;
  padding-bottom: 16px;
  font-weight: 400;
`;
export const ClientConetainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;
