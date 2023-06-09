import styled from "styled-components";
import { styled as styledMui } from "@mui/material/";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import { Button } from "@mui/material";
import { RiUserSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";

//Header Component
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

//Cliente Component
export const SearchDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  width: 45%;
  @media (max-width: 910px) {
    width: 70%;
  }
`;
export const Input = styled.input`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  border: 1px solid rgba(69, 80, 61, 255);
  padding: 16px;
  padding-left: 10%;
  width: 100%;
  font-size: 20px;
  transition: 350ms;
  :hover {
    border: 1px solid rgb(195, 204, 191);
  }
  :focus {
    border: 1px solid rgb(195, 204, 191);
    outline: none;
  }
  @media (max-width: 910px) {
    padding-left: 6%;
    @media (max-width: 740px) {
      padding-left: 10%;
    }
    @media (max-width: 450px) {
      padding-left: 15%;
    }
  }
`;
export const SearchIcon = styled(RiUserSearchLine)`
  padding: 10px;
  position: absolute;
  transform: scale(1.5);
`;

//Cliente and Procedimentos Components
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
  @media (max-width: 900px) {
    height: 100vh;
  }
`;
export const List = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  padding-top: 8px;
  padding-left: 0;
`;
export const Item = styled.li`
  padding: 24px;
  padding-left: 0;
  margin-left: 24px;
  margin-right: 24px;
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
  width: 350px;
  background-color: rgba(69, 80, 61, 0.4);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 16px;
  margin-top: 2%;
  @media (max-width: 900px) {
    margin-top: 5%;
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
  padding: 16px;
`;
export const Info = styled.li`
  padding: 18px;
  font-size: 15px;
  width: 100%;
  border-bottom: 1px solid rgba(195, 204, 191, 0.5);
  width: 300px;
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
border-color: white;
  margin-bottom:12px;
  margin-top:12px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const CreateButtonContainer = styled.div`
  margin-top: 300%;
`;

//Calendar Component
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
export const LogoutButton = styledMui(Button)`
justify-self:center;
text-aling:center;
margin-top:15px;
background-color: rgb(69, 80, 61);
color:white;
:hover{
  background-color: rgb(180, 190, 170);
  transition: 350ms;
}
`;

//General Components
export const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const SessionTitle = styled.h3`
  padding: 8px;
  border-bottom: 2px solid rgba(69, 80, 61, 0.4);
`;
export const Title = styled.h3`
  padding: 8px;
  padding-bottom: 16px;
  font-weight: 400;
`;
export const ClientConetainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;
