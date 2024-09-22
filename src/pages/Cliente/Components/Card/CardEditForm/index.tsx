import { TextField } from "@mui/material";
import * as S from "../../../../../styles/GlobalStyles";
import updateClient from "../UpdateClient";
import { useEffect, useState } from "react";
import { getProcedimentos } from "../../../../Procedimentos/components/listaProcedimentos";
import useWindowSize from "../../../../../hooks/useWindowSize";

export default function CardEditForm({ costumer, setEditing }: any) {
  const [name, setName] = useState(costumer.name);
  const [tel, setTel] = useState(costumer.cel_number);
  const [lastService, setLastService] = useState<string>(costumer.last_service);
  const [procedimentos, setProcedimentos] = useState<any>();
  const [{ isMobile }] = useWindowSize();

  useEffect(() => {
    getProcedimentos(setProcedimentos);
  }, []);
  return (
    <S.Form>
      <S.Title>Editando Cliente...</S.Title>
      <S.Submit variant="outlined" color="error" onClick={() => setEditing(false)}>
        Cancelar
      </S.Submit>
      <TextField
        label="Nome"
        type="text"
        value={name}
        placeholder={costumer.name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <TextField
        label="Telefone"
        type="text"
        value={tel}
        placeholder={costumer.cel_number}
        onChange={(e) => setTel(e.target.value)}
      />
      <br />
      <S.AutoComplete
        options={procedimentos?.map((procedimento: any) => procedimento.name) || ["Carregando Procedimentos"]}
        style={isMobile ? { width: "80%" } : { width: "71%" }}
        onChange={(_event, newValue: any) => setLastService(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Último Serviço"
            type="text"
            value={lastService}
            placeholder={costumer.last_service}
          />
        )}
      />
      <div>
        <S.Submit
          id="submit"
          variant="outlined"
          color="success"
          onClick={(e) => updateClient(e, name, tel, lastService, costumer)}
        >
          Salvar Alterações
        </S.Submit>
      </div>
    </S.Form>
  );
}
