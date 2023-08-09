import { styled as styledMui, Button } from "@mui/material";

export const LoginButton = styledMui(Button)`
justify-self:center;
margin-top:15px;
background-color: rgb(69, 80, 61);
:hover{
  background-color: rgb(180, 190, 170);
  transition: 350ms;
}
`;
