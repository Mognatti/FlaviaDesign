import { styled as styledMui, TableCell, TableRow, Toolbar } from "@mui/material";
import { AutoComplete } from "../../../../styles/GlobalStyles";
import styled from "styled-components";

export const CustomAutoComplete = styledMui(AutoComplete)`
  width: 300px;
`;

export const TableHeader = styledMui(Toolbar)`
  width: 95% !important;
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content:space-between;
  gap:16px;
  padding: 8px;
  margin: 0 8px;
  @media (max-width: 800px) {
  min-width: 700px;
}
`;

export const TableTitle = styled.p`
  font-size: 1.325em;
  min-width: fit-content;
`;

export const HeaderForm = styled.div`
  width: 350px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const HeaderRow = styledMui(TableRow)`
background-color:  ${(props) => props.theme.palette.primary.light};
th{
color:white;
&:last-child {
    text-align: center;
  }
}
`;

export const EditTableCell = styledMui(TableCell)`
text-align: center;
min-width:80px;
`;

export const IconWrarper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  width: 100%;
`;
