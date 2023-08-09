import { client } from "../../supabaseClient";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import * as S from "./styles";
export async function logout() {
  await client.auth.signOut();
}

export default function Login() {
  const [session, setSession] = useState<any>(null);
  const supabase = useSupabaseClient(); //conect with supabase and create a session

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    if (error) {
      alert(`Erro ao realizar o login - ${error.message}`);
    }
  }

  useEffect(() => {
    client.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <S.LoginButton variant="contained" onClick={() => googleSignIn()}>
        Login com google
      </S.LoginButton>
    );
  }
  return <></>;
}
