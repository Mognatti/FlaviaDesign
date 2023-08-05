import { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as GS from "../../styles/GlobalStyles";
import { updateProcedimento } from "./listaProcedimentos";

export default function ProcedimentosCard({ procedimento }: any) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(procedimento.name);
  const [horas, setHoras] = useState(procedimento.hours);
  const [minutos, setMinutos] = useState(procedimento.minutes);
  const [preco, setPreco] = useState(procedimento.price);

  return !editing ? (
    <GS.CardContainer>
      <GS.CardInfoList>
        <GS.CardTitleDiv>
          <GS.Title>Dados do Procedimento</GS.Title>
        </GS.CardTitleDiv>
        <GS.Info>Nome: {procedimento.name}</GS.Info>
        <GS.Info>
          Duração:{" "}
          {procedimento.hours > 0
            ? `${procedimento.hours} hora${procedimento.hours == 1 ? " " : "s"}`
            : ""}
          {procedimento.minutes > 0 && procedimento.hours > 0
            ? ` e ${procedimento.minutes} minutos`
            : procedimento.minutes > 0
            ? `${procedimento.minutes} minutos`
            : ""}
        </GS.Info>
        <GS.Info>Preço: R$ {procedimento.price},00</GS.Info>{" "}
      </GS.CardInfoList>
      <GS.ButtonContainer>
        <IconButton onClick={() => setEditing(true)}>
          <EditIcon />
        </IconButton>
      </GS.ButtonContainer>
    </GS.CardContainer>
  ) : (
    <GS.Form>
      <GS.Title>Editando procedimento...</GS.Title>
      <GS.Submit
        color="error"
        variant="outlined"
        onClick={() => setEditing(false)}
      >
        cancelar
      </GS.Submit>
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
      <GS.Submit
        id="change-procedimento"
        color="success"
        variant="outlined"
        onClick={(e) =>
          updateProcedimento(e, name, preco, horas, minutos, procedimento)
        }
      >
        Salvar Alterações
      </GS.Submit>
    </GS.Form>
  );
}
