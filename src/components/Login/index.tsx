import { client } from "../../supabaseClient";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { styled as styledMui } from "@mui/material";
import { Button } from "@mui/material";

const LoginButton = styledMui(Button)`
justify-self:center;
margin-top:15px;
background-color: rgb(69, 80, 61);
:hover{
  background-color: rgb(180, 190, 170);
  transition: 350ms;
}
`;

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
      <LoginButton variant="contained" onClick={() => googleSignIn()}>
        Login com google
      </LoginButton>
    );
  }
  return <></>;
}
