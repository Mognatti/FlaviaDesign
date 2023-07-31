import styled from "styled-components";
import { RiUserSearchLine } from "react-icons/ri";

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

export const Loading = styled.p`
  text-align: center;
  margin-top: 15px;
`;

// Check latter
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
