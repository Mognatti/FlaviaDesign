import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import { IconButton, Button, TextField } from "@mui/material";
import { styled as styledMui } from "@mui/material";
import styled from "styled-components";
import updateClient from "./UpdateClient";
import { Title } from "../StyledComponents";
import dayjs from "dayjs";
import { procedimentos } from "../Procedimentos";
import { Submit } from "../StyledComponents";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(69, 80, 61, 0.4);
  border-radius: 15px;
  padding: 8px;
  width: 100%;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.4);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 350px;
  background-color: rgba(69, 80, 61, 0.4);
  border-radius: 15px;
  padding: 16px;
  margin-top: 2%;
`;

const CardTitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;
const CardInfoList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 8px;
  width: 100%;
`;

const Info = styled.li`
  padding: 18px;
  border-bottom: 1px solid rgba(195, 204, 191, 0.5);
  width: 300px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const AutoComplete = styledMui(Autocomplete)`
width:64%;
`;

export default function Card({ client }: any) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(client.name);
  const [tel, setTel] = useState(client.cel_number);
  const [lastService, setLastService] = useState<string>(client.last_service);

  return !editing ? (
    <CardContainer>
      <CardInfoList>
        <CardTitleDiv>
          <Title>Dados da(o) cliente</Title>
        </CardTitleDiv>
        <Info>Nome:{client.name}</Info>
        <Info>Telefone: {client.cel_number}</Info>
        <Info>
          Data do último procedimento:{" "}
          {client.last_visit !== null
            ? dayjs(client.last_visit).format("DD/MM/YY")
            : "Não registrado"}
        </Info>
        <Info>Último serviço Realizado: {client.last_service}</Info>
      </CardInfoList>
      <ButtonContainer>
        <IconButton onClick={() => setEditing(true)}>
          <EditIcon />
        </IconButton>
      </ButtonContainer>
    </CardContainer>
  ) : (
    <Form>
      <Title>Editando Cliente...</Title>
      <br />
      <Submit
        variant="outlined"
        color="error"
        onClick={() => setEditing(false)}
      >
        Cancelar
      </Submit>
      <br />
      <TextField
        label="Nome"
        type="text"
        value={name}
        placeholder={client.name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <TextField
        label="Telefone"
        type="text"
        value={tel}
        placeholder={client.cel_number}
        onChange={(e) => setTel(e.target.value)}
      />
      <br />
      <AutoComplete
        options={procedimentos.map((procedimento) => procedimento.nome)}
        onChange={(_event, newValue: any) => setLastService(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Último Serviço Realizado"
            type="text"
            value={lastService}
            placeholder={client.last_service}
          />
        )}
      />

      <br />
      <div>
        <Submit
          id="submit"
          variant="outlined"
          color="success"
          onClick={(e) => updateClient(e, name, tel, lastService, client)}
        >
          Salvar Alterações
        </Submit>
      </div>
    </Form>
  );
}
