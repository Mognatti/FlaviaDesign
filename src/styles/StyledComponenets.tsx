import styled from "styled-components";
import { styled as styledMui } from "@mui/material/";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import { Button } from "@mui/material";
import { RiUserSearchLine } from "react-icons/ri";

//Cliente and Procedimentos Components
export const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  width: 35%;
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
`;
export const SearchIcon = styled(RiUserSearchLine)`
  padding: 10px;
  position: absolute;
`;
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
`;
export const List = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
`;
export const CalendarContainer = styled.div`
  width: 100%;
  padding: 32px 0px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  background-color: rgb(195, 204, 191);
`;
export const StyledButton = styledMui(Button)`
background-color: gray;
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
