import * as GS from "../../styles/GlobalStyles";
import ProcedimentosCard from "./components/ProcedimentosCard";
import { useState, useContext } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import CreatingProcedimentoCard from "./components/CreatingProcedimentoCard";
import useProcedimentos from "../../hooks/useProcedimentos";
import { Procedimento } from "../../types";
import { SidebarStatusContext } from "../../context/SidebarStatus";

export default function Procedimentos() {
  const [creating, setCreating] = useState(false);
  const [{ procedimentosList, isLoading }] = useProcedimentos();
  const { isOpen } = useContext(SidebarStatusContext);
  if (isLoading) return <GS.Loading> Carregando Procedimentos...</GS.Loading>;

  return (
    <GS.Section sidebar={isOpen}>
      <GS.ListContainer>
        <GS.SessionTitle>Procedimentos</GS.SessionTitle>
        <GS.List>
          {procedimentosList?.map((procedimento: Procedimento) => (
            <GS.Item key={procedimento.name}>
              <ProcedimentosCard procedimento={procedimento} />
            </GS.Item>
          ))}
          {creating ? (
            <GS.Item>
              <CreatingProcedimentoCard setCreating={setCreating} />
            </GS.Item>
          ) : (
            <>
              <GS.CreateButtonContainer>
                <IconButton size="large" onClick={() => setCreating(true)}>
                  <AddBoxIcon />
                </IconButton>
              </GS.CreateButtonContainer>
            </>
          )}
        </GS.List>
      </GS.ListContainer>
    </GS.Section>
  );
}
