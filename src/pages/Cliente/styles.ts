import styled from "styled-components";
import { RiUserSearchLine } from "react-icons/ri";
import { breakPoints, pallete } from "../../styles/GlobalStyles";

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
  border: 1px solid ${pallete.white};
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
