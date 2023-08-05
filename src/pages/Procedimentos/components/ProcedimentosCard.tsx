import { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as GS from "../../../styles/GlobalStyles";
import { Procedimento } from "../../../types";
import Editing from "./Editing";

interface ProcedimentosCardProps {
  procedimento: Procedimento;
}

export default function ProcedimentosCard({
  procedimento,
}: ProcedimentosCardProps) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return <Editing {...{ procedimento, setEditing }} />;
  }

  return (
    <GS.CardContainer>
      <GS.CardInfoList>
        <GS.CardTitleDiv>
          <GS.Title>Dados do Procedimento</GS.Title>
        </GS.CardTitleDiv>
        <GS.Info>Nome: {procedimento.name}</GS.Info>
        <GS.Info>
          Duração:{" "}
          {(() => {
            if (procedimento.hours > 0) {
              if (procedimento.hours === 1) {
                return `${procedimento.hours} hora `;
              } else {
                return `${procedimento.hours} horas `;
              }
            } else {
              return "";
            }
          })()}
          {(() => {
            if (procedimento.minutes > 0 && procedimento.hours > 0) {
              return `e ${procedimento.minutes} minutos`;
            } else if (procedimento.minutes > 0) {
              return `${procedimento.minutes} minutos`;
            } else {
              return "";
            }
          })()}
        </GS.Info>
        <GS.Info>Preço: R$ {procedimento.price},00</GS.Info>{" "}
      </GS.CardInfoList>
      <GS.ButtonContainer>
        <IconButton onClick={() => setEditing(true)}>
          <EditIcon />
        </IconButton>
      </GS.ButtonContainer>
    </GS.CardContainer>
  );
}
