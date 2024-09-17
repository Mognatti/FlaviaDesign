/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import {
  Title,
  CardContainer,
  CardInfoList,
  CardTitleDiv,
  ButtonContainer,
  Info,
} from "../../../../styles/GlobalStyles";
import dayjs from "dayjs";

import CardEditForm from "./CardEditForm";

export default function Card({ client }: any) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return <CardEditForm {...{ client, setEditing }} />;
  }

  return (
    <CardContainer>
      <CardInfoList>
        <CardTitleDiv>
          <Title>{client.name}</Title>
        </CardTitleDiv>
        <Info>Telefone: {client.cel_number}</Info>
        <Info>
          Atendimento mais recente:{" "}
          {client.last_visit !== null ? dayjs(client.last_visit).format("DD/MM/YY") : "Não registrado"}
        </Info>
        <Info>Último serviço: {client.last_service}</Info>
      </CardInfoList>
      <ButtonContainer>
        <IconButton onClick={() => setEditing(true)}>
          <EditIcon />
        </IconButton>
      </ButtonContainer>
    </CardContainer>
  );
}
