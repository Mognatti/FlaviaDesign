import styled from "styled-components";
import { RiUserSearchLine } from "react-icons/ri";
import { useState } from "react";

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  width: 35%;
`;
const Input = styled.input`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  border: none;
  padding: 16px;
  padding-left: 10%;
  width: 100%;
  font-size: 20px;
  :hover {
    border: 1px solid rgba(69, 80, 61, 255);
  }
  :focus {
    border: 1px solid rgba(69, 80, 61, 255);
    outline: none;
  }
`;

const SearchIcon = styled(RiUserSearchLine)`
  padding: 10px;
  position: absolute;
  border-right: 1px solid black;
`;

export default function Search() {
  const [search, setSearch] = useState("");

  return (
    <Div>
      <SearchIcon size="25px" />
      <Input value={search} onChange={(e) => setSearch(e.target.value)}></Input>
    </Div>
  );
}
