import * as GS from "../../styles/GlobalStyles";
import * as S from "./styles";
import ProcedimentosCard from "./components/ProcedimentosCard";
import { useState, useContext } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import CreatingProcedimentoCard from "./components/CreatingProcedimentoCard";
import useProcedimentos from "../../hooks/useProcedimentos";
import { Procedimento } from "../../types";
import { SidebarStatusContext } from "../../context/SidebarStatus";
import { useSession } from "@supabase/auth-helpers-react";

export default function Procedimentos() {
  const [creating, setCreating] = useState(false);
  const [{ procedimentosList, isLoading }] = useProcedimentos();
  const { isOpen } = useContext(SidebarStatusContext);
  const session = useSession();

  if (!session) return <>Faça login acessar a página!</>;
  if (isLoading) return <GS.Loading> Carregando Procedimentos...</GS.Loading>;
  return (
    <GS.Section sidebar={isOpen}>
      <GS.ListContainer>
        <GS.SessionTitle>Procedimentos</GS.SessionTitle>
        {creating ? (
          <S.CreatingDiv>
            <GS.Item>
              <CreatingProcedimentoCard setCreating={setCreating} />
            </GS.Item>
          </S.CreatingDiv>
        ) : (
          <GS.CreateButtonContainer>
            <IconButton size="large" onClick={() => setCreating(true)}>
              <AddBoxIcon />
            </IconButton>
          </GS.CreateButtonContainer>
        )}
        <GS.List>
          {procedimentosList?.map((procedimento: Procedimento) => (
            <GS.Item key={procedimento.name}>
              <ProcedimentosCard procedimento={procedimento} />
            </GS.Item>
          ))}
        </GS.List>
      </GS.ListContainer>
    </GS.Section>
  );
}
