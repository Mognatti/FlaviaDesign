import Login, { logout } from "../../components/Login";
import { useSession } from "@supabase/auth-helpers-react";
import Procedimentos from "../../components/Procedimentos";
import {
  Title,
  Section,
  SessionTitle,
  LogoutButton,
} from "../../styles/GlobalStyles";

export default function Home() {
  const session = useSession();

  return session ? (
    <Section>
      <br />
      <SessionTitle>Bem vinda</SessionTitle>
      <Title>Caso queira sair, clique no botão abaixo</Title>
      <LogoutButton onClick={() => logout()}> Finalizar Sessão </LogoutButton>
      <Procedimentos></Procedimentos>
    </Section>
  ) : (
    <Section>
      <Login />
    </Section>
  );
}
