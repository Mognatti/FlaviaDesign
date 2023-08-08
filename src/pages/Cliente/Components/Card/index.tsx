/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TextField } from "@mui/material";
import updateClient from "./UpdateClient";
import {
  Title,
  Form,
  CardContainer,
  CardInfoList,
  CardTitleDiv,
  ButtonContainer,
  Info,
  AutoComplete,
  Submit,
} from "../../../../styles/GlobalStyles";
import dayjs from "dayjs";
import { getProcedimentos } from "../../../Procedimentos/components/listaProcedimentos";
import useWindowSize from "../../../../hooks/useWindowSize";

export default function Card({ client }: any) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(client.name);
  const [tel, setTel] = useState(client.cel_number);
  const [lastService, setLastService] = useState<string>(client.last_service);
  const [procedimentos, setProcedimentos] = useState<any>();
  const [{ isTablet }] = useWindowSize();

  useEffect(() => {
    getProcedimentos(setProcedimentos);
  }, []);

  return !editing ? (
    <CardContainer>
      <CardInfoList>
        <CardTitleDiv>
          <Title>{client.name}</Title>
        </CardTitleDiv>
        <Info>Telefone: {client.cel_number}</Info>
        <Info>
          Atendimento mais recente:{" "}
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
      <Submit
        variant="outlined"
        color="error"
        onClick={() => setEditing(false)}
      >
        Cancelar
      </Submit>
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
        options={
          procedimentos?.map((procedimento: any) => procedimento.name) || [
            "Carregando Procedimentos",
          ]
        }
        style={isTablet ? { width: "80%" } : { width: "71%" }}
        onChange={(_event, newValue: any) => setLastService(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Último Serviço"
            type="text"
            value={lastService}
            placeholder={client.last_service}
          />
        )}
      />
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
