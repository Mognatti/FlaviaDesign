import { Submit, Title } from "../../../styles/GlobalStyles";
import * as S from "../styles";
import { createProcedimento } from "./listaProcedimentos";
import { useState } from "react";
import { TextField } from "@mui/material";
import { CreatingProcedimentoCardProps, DateLib } from "../../../types";
import { PuffLoader } from "react-spinners";

export default function CreatingProcedimentoCard({
  setCreating,
}: CreatingProcedimentoCardProps) {
  const [name, setName] = useState("");
  const [preco, setPreco] = useState<number>(0);
  const [horas, setHoras] = useState<number>(0);
  const [minutos, setMinutos] = useState<number>(0);
  const [tempo, setTempo] = useState<DateLib | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTempo = () => {
    if (tempo) {
      setHoras(tempo.$H);
      setMinutos(tempo.$m);
    }
  };

  return (
    <S.CreatingForm>
      <Title>Criando Procedimento...</Title>
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
      <S.TimeInput
        value={tempo}
        label="Tempo para Realização"
        onChange={(newValue: any) => setTempo(newValue)}
        onClose={handleTempo}
        closeOnSelect={false}
      ></S.TimeInput>
      <br />
      {loading ? (
        <>
          <PuffLoader size={20} />
          <br />
        </>
      ) : (
        <Submit
          color="primary"
          variant="outlined"
          onClick={(e) =>
            createProcedimento(e, name, preco, horas, minutos, setLoading)
          }
        >
          Salvar Alterações
        </Submit>
      )}
    </S.CreatingForm>
  );
}
