import {
  SessionTitle,
  Item,
  List,
  ListContainer,
  Loading,
  CreateButtonContainer,
} from "../../styles/StyledComponenets";
import ProcedimentosCard from "./ProcedimentosCard";
import { useState, useEffect } from "react";
import { getProcedimentos } from "./listaProcedimentos";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import CreatingProcedimentoCard from "./CreatingProcedimentoCard";

export default function Procedimentos() {
  const [procedimentos, setProcedimentos] = useState<any[]>();
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    getProcedimentos(setProcedimentos);
    setLoading(false);
  }, []);

  return loading ? (
    <Loading> Carregando Procedimentos...</Loading>
  ) : (
    <ListContainer>
      <SessionTitle>Procedimentos</SessionTitle>
      <List>
        {procedimentos?.map((procedimento: any) => (
          <Item key={procedimento.name}>
            <ProcedimentosCard procedimento={procedimento} />
          </Item>
        ))}
        {creating ? (
          <Item>
            <CreatingProcedimentoCard setCreating={setCreating} />
          </Item>
        ) : (
          <Item>
            <CreateButtonContainer>
              <IconButton size="large" onClick={() => setCreating(true)}>
                <AddBoxIcon />
              </IconButton>
            </CreateButtonContainer>
          </Item>
        )}
      </List>
    </ListContainer>
  );
}
