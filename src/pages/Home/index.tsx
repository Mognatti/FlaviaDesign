import { styled as styledMui } from "@mui/material";
import { Button } from "@mui/material";
import Login, { logout } from "../../components/Login";
import { useSession } from "@supabase/auth-helpers-react";
import Procedimentos from "../../components/Procedimentos";
import { Title, Section, SessionTitle } from "../../styles/StyledComponenets";

const LogoutButton = styledMui(Button)`
justify-self:center;
text-aling:center;
margin-top:15px;
background-color: rgb(69, 80, 61);
color:white;
:hover{
  background-color: rgb(180, 190, 170);
  transition: 350ms;
}
`;

export default function Home() {
  const session = useSession();

  return session ? (
    <Section>
      <br />
      <SessionTitle>Bem vinda!</SessionTitle>
      <Title>Login Realizado com Sucesso</Title>
      <LogoutButton onClick={() => logout()}> Finalizar Sessão </LogoutButton>
      <Procedimentos></Procedimentos>
    </Section>
  ) : (
    <Section>
      <Login />
    </Section>
  );
}
