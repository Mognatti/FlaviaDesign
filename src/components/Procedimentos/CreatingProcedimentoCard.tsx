import {
  CardContainer,
  CardInfoList,
  CardTitleDiv,
  Submit,
  Title,
} from "../../styles/StyledComponenets";
import { createProcedimento } from "./listaProcedimentos";
import { useState } from "react";
import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

interface Props {
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreatingProcedimentoCard({ setCreating }: Props) {
  const [name, setName] = useState("");
  const [preco, setPreco] = useState<number>(0);
  const [horas, setHoras] = useState<number>(0);
  const [minutos, setMinutos] = useState<number>(0);
  const [tempo, setTempo] = useState<any>(null);

  const handleTempo = () => {
    setHoras(tempo.$H);
    setMinutos(tempo.$m);
  };
  console.log(tempo);
  console.log(horas);
  console.log(minutos);

  return (
    <CardContainer>
      <CardInfoList>
        <CardTitleDiv>
          <Title>Criando Procedimento...</Title>
        </CardTitleDiv>
        <Submit
          color="error"
          variant="outlined"
          onClick={() => setCreating(false)}
        >
          Cancelar
        </Submit>
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextField>
        <br />
        <TextField
          label="Preço"
          type="number"
          value={preco}
          onChange={(e) => setPreco(parseInt(e.target.value))}
        ></TextField>
        <br />
        <TimePicker
          value={tempo}
          label="Tempo para Realização"
          onChange={(newValue) => setTempo(newValue)}
          onClose={handleTempo}
        ></TimePicker>
        <Submit
          color="error"
          variant="outlined"
          onClick={(e) => createProcedimento(e, name, preco, horas, minutos)}
        >
          Salvar Alterações
        </Submit>
      </CardInfoList>
    </CardContainer>
  );
}
