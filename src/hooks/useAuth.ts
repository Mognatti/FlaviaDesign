import { Session, useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { client } from "../supabaseClient";

export default function useAuth() {
  const logged = useSession();
  const [session, setSession] = useState<Session | null>(logged);
  const supabase = useSupabaseClient(); //conect with supabase and create a session

  async function logout() {
    await client.auth.signOut();
  }

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

  return { session, googleSignIn, logout };
}
