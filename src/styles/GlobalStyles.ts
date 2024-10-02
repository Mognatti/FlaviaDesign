import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import { styled as styledMui, Button } from "@mui/material";

export const pallete = {
  neutral: {
    100: "#fefefe",
    200: "#f5f7f2",
    300: "#f0f3ec",
    400: "#ebefe5",
    500: "#e6ebdf",
    600: "#b8bcb2",
    700: "#8a8d86",
    800: "#5c5e59",
    900: "#242424",
  },
  primary: {
    100: "#ecf0e9",
    200: "#d8e0d2",
    300: "#c5d1bc",
    400: "#b1c1a5",
    500: "#9eb28f",
    600: "#77866c",
    700: "#596551",
    800: "#3c4336",
    900: "#1e221b",
  },
  secondary: {
    100: "#f3f5f2",
    200: "#e7ebe5",
    300: "#dbe0d9",
    400: "#cfd6cc",
    500: "#c3ccbf",
    600: "#9ca399",
    700: "#757a73",
    800: "#4e524c",
    900: "#272926",
  },
  accent: {
    100: "#ecf3e0",
    200: "#d9e8c0",
    300: "#c5dca1",
    400: "#b2d181",
    500: "#9fc562",
    600: "#7f9e4e",
    700: "#5f763b",
    800: "#404f27",
    900: "#202714",
  },
};

export const typography = {
  h1: "4.21rem",
  h2: "3.158rem",
  h3: "2.369rem",
  h4: "1.777rem",
  h5: "1.333rem",
  regular: "100%",
  small: "0.75rem",
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
  min-width: 300px;
  min-height: 40px;
  margin-bottom:12px;
  margin-top:12px;
  display:flex;
  align-items:center;
  *{
  margin-top: -2px;
  margin-left: -2px;
  }
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
  margin: 32px 32px 32px 80px;
  @media (max-width: ${breakPoints.tablet}) {
    margin: 4vh 4vw 10vh 4vw;
  }
`;

export const SessionTitle = styled.h2`
  padding: 8px;
  margin-bottom: 16px;
  border-bottom: 2px solid rgba(69, 80, 61, 0.4);
`;
export const Title = styled.h3`
  margin: 0;
  text-align: center;
  padding: 8px;
  padding-bottom: 16px;
  font-weight: 400;
`;
