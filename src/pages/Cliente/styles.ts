import styled from "styled-components";
import { RiUserSearchLine } from "react-icons/ri";
import { pallete } from "../../styles/GlobalStyles";

export const SearchDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  width: 96%;
  @media (max-width: 910px) {
    width: 90%;
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
    border: 1px solid ${pallete.lime};
  }
  :focus {
    border: 1px solid ${pallete.dark};
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
`;

export const Loading = styled.p`
  text-align: center;
  margin-top: 15px;
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
  margin-top: 15px;
`;
