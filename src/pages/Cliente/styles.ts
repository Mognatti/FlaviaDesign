import styled from "styled-components";
import { RiUserSearchLine } from "react-icons/ri";
import { breakPoints, pallete } from "../../styles/GlobalStyles";
import { Close } from "@mui/icons-material";
import { styled as styledMui } from "@mui/material";

export const SearchDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  width: 100%;
  justify-content: center;
  @media (max-width: ${breakPoints.tablet}) {
    width: 83%;
  }
  @media (max-width: ${breakPoints.smallTablet}) {
    width: 316px;
    align-self: center;
  }
`;
export const Input = styled.input`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  border: 1px solid ${pallete.neutral[100]};
  padding: 16px;
  padding-left: 50px;
  width: 100%;
  font-size: 20px;
  transition: 250ms ease-in-out;
  :hover {
    border: 1px solid ${pallete.green};
  }
  :focus {
    border: 1px solid ${pallete.green};
    outline: none;
  }
`;

export const SearchIcon = styled(RiUserSearchLine)`
  position: absolute;
  left: 30px;
`;

export const Loading = styled.p`
  text-align: center;
  margin-top: 16px;
`;

// Check latter
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
`;
export const Item = styled.li`
  padding: 16px;
  padding-left: 0;
`;
export const NotLoggedin = styled.p`
  text-align: center;
  margin-top: 16px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 330px;
  background-color: ${pallete.green[500]};
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  padding: 24px 16px 8px 16px;
  height: fit-content;
  position: relative;
`;

export const FormHeader = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin-bottom: 24px;
  border-bottom: 2px solid ${pallete.neutral[900]};
  padding-bottom: 4px;
  p {
    width: 100%;
    font-size: 18px;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const CloseIcon = styledMui(Close)`
align-self: flex-end;
`;
