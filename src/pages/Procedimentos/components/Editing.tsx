import { useState } from "react";
import * as GS from "../../../styles/GlobalStyles";
import { Procedimento } from "../../../types";
import { updateProcedimento } from "./listaProcedimentos";
import { TextField, Stack } from "@mui/material";

interface EditingProps {
  procedimento: Procedimento;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Editing({ procedimento, setEditing }: EditingProps) {
  const [name, setName] = useState(procedimento.name);
  const [horas, setHoras] = useState<number | string>(procedimento.hours);
  const [minutos, setMinutos] = useState<number | string>(procedimento.minutes);
  const [preco, setPreco] = useState<number | string>(procedimento.price);

  return (
    <GS.Form>
      <GS.Title>Editando procedimento...</GS.Title>
      <GS.Submit
        color="error"
        variant="outlined"
        onClick={() => setEditing(false)}
      >
        cancelar
      </GS.Submit>
      <Stack spacing={2}>
        <TextField
          label="Nome"
          type="text"
          value={name}
          placeholder={procedimento.name}
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <TextField
          label="Horas"
          type="number"
          value={horas}
          onChange={(e) => setHoras(e.target.value)}
        />
        <TextField
          label="Minutos"
          type="number"
          value={minutos}
          onChange={(e) => setMinutos(e.target.value)}
        />
        <TextField
          label="Preco"
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
      </Stack>
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
