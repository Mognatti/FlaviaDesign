import styled from "styled-components";
import { styled as styledMui } from "@mui/material/";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import { Button } from "@mui/material";

export const pallete = {
  green: "#739245",
  lightGreen: "#95a887",
  lighterGreen: "#c3ccbf",
  lime: "#8daf36",
  dark: "#435b37",
  white: "#fefefe",
};

export const breakPoints = {
  tablet: "800px",
  mobile: "470px",
};

//Cliente and Procedimentos Components
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const List = styled.ul`
  display: flex;
  flex-direction: row;
  align-content: center;
  flex-wrap: wrap;
  padding-top: 8px;
  padding-left: 0;
  width: 100%;
  gap: 3vh 3vw;
  @media (max-width: ${breakPoints.mobile}) {
    flex-direction: column;
  }
`;
export const Item = styled.li`
  width: 30%;
  list-style: none;
  @media (max-width: ${breakPoints.mobile}) {
    padding-left: 15vw;
    width: 100%;
  }
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
`;
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(69, 80, 61, 0.4);
  border-radius: 15px;
  padding: 8px;
  width: 100%;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.4);
  @media (max-width: ${breakPoints.mobile}) {
    width: 80%;
  }
`;
export const CardInfoList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 8px;
  width: 100%;
`;
export const CardTitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;
export const Info = styled.li`
  padding: 18px;
  font-size: 15px;
  border-bottom: 1px solid rgba(195, 204, 191, 0.5);
  width: 300px;
  @media (max-width: ${breakPoints.mobile}) {
    width: 80%;
  }
`;
export const AutoComplete = styledMui(Autocomplete)`
width:64%;
`;
export const Loading = styled.p`
  text-align: center;
  margin-top: 15px;
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

//Login and Home Components
export const LoginButton = styledMui(Button)`
justify-self:center;
margin-top:15px;
background-color: rgb(69, 80, 61);
:hover{
  background-color: rgb(180, 190, 170);
  transition: 350ms;
}
`;

//General Components
export const Section = styled.section<{ sidebar?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => (props.sidebar ? "200px" : "60px")};
  margin-top: 5vh;
  padding: 5%;
  transition: all 300ms ease;
  @media (max-width: 800px) {
    margin-left: 55px;
    padding: 0;
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
