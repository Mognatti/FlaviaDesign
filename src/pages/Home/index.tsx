import Login, { logout } from "../../components/Login";
import { useSession } from "@supabase/auth-helpers-react";
import Procedimentos from "../../components/Procedimentos";
import {
  Title,
  Section,
  SessionTitle,
  LogoutButton,
} from "../../styles/StyledComponenets";

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
