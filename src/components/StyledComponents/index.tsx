import styled from "styled-components";
import { styled as styledMui } from "@mui/material/";
import { Button } from "@mui/material";

export const Form = styled.form`
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

export const Title = styled.h3`
  padding: 8px;
  border-bottom: 2px solid rgba(69, 80, 61, 0.4);
`;

export const Submit = styledMui(Button)`
  color: black;
  border-color: white;
`;

export const Container = styled.div`
  width: 100%;
  padding: 32px 0px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  background-color: rgb(195, 204, 191);
`;
