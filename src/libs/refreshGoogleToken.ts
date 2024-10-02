import { Session } from "@supabase/supabase-js";

export async function refreshAccessToken(session: Session | null) {
  const refreshToken = session?.provider_refresh_token;
  const clientId = import.meta.env.VITE_GOOGLE_ID;
  const clientSecret = import.meta.env.VITE_GOOGLE_KEY;

  const response = await fetch(`https://oauth2.googleapis.com/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}`,
  });

  const data = await response.json();
  const newAccessToken = data.access_token;

  return newAccessToken;
}
