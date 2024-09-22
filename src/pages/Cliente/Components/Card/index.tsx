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

export default function Card({ costumer }: any) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return <CardEditForm {...{ costumer, setEditing }} />;
  }

  return (
    <CardContainer>
      <CardInfoList>
        <CardTitleDiv>
          <Title>{costumer.name}</Title>
        </CardTitleDiv>
        <Info>Telefone: {costumer.cel_number}</Info>
        <Info>
          Atendimento mais recente:{" "}
          {costumer.last_visit !== null ? dayjs(costumer.last_visit).format("DD/MM/YY") : "Não registrado"}
        </Info>
        <Info>Último serviço: {costumer.last_service}</Info>
      </CardInfoList>
      <ButtonContainer>
        <IconButton onClick={() => setEditing(true)}>
          <EditIcon />
        </IconButton>
      </ButtonContainer>
    </CardContainer>
  );
}
