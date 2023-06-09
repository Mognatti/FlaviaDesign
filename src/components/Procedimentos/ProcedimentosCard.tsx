import { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  Submit,
  Title,
  CardContainer,
  CardInfoList,
  CardTitleDiv,
  ButtonContainer,
  Form,
  Info,
} from "../../styles/StyledComponenets";
import { updateProcedimento } from "./listaProcedimentos";

export default function ProcedimentosCard({ procedimento }: any) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(procedimento.name);
  const [horas, setHoras] = useState(procedimento.hours);
  const [minutos, setMinutos] = useState(procedimento.minutes);
  const [preco, setPreco] = useState(procedimento.price);

  return !editing ? (
    <CardContainer>
      <CardInfoList>
        <CardTitleDiv>
          <Title>Dados do Procedimento</Title>
        </CardTitleDiv>
        <Info>Nome: {procedimento.name}</Info>
        <Info>
          Tempo para realização: {procedimento.hours} horas e{" "}
          {procedimento.minutes} minutos
        </Info>
        <Info>Preço: R$ {procedimento.price},00</Info>{" "}
      </CardInfoList>
      <ButtonContainer>
        <IconButton onClick={() => setEditing(true)}>
          <EditIcon />
        </IconButton>
      </ButtonContainer>
    </CardContainer>
  ) : (
    <Form>
      <Title>Editando procedimento...</Title>
      <Submit
        color="error"
        variant="outlined"
        onClick={() => setEditing(false)}
      >
        cancelar
      </Submit>
      <TextField
        label="Nome"
        type="text"
        value={name}
        placeholder={procedimento.name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <br />
      <TextField
        label="Horas"
        type="number"
        value={horas}
        onChange={(e) => setHoras(e.target.value)}
      />
      <br />
      <TextField
        label="Minutos"
        type="number"
        value={minutos}
        onChange={(e) => setMinutos(e.target.value)}
      />
      <br />
      <TextField
        label="Preco"
        type="number"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />
      <Submit
        id="change-procedimento"
        color="success"
        variant="outlined"
        onClick={(e) =>
          updateProcedimento(e, name, preco, horas, minutos, procedimento)
        }
      >
        Salvar Alterações
      </Submit>
    </Form>
  );
}
