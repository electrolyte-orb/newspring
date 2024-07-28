"use client";
import { createClient } from "@/lib/client";

export default function SignIn() {
  const supabase = createClient();

  async function handleLogin(provider: "google" | "azure") {
    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          // TODO: remove localhost for production
          redirectTo: `http://localhost:3000/auth/callback`,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <button onClick={() => handleLogin("google")}>Google</button>
      <button onClick={() => handleLogin("azure")}>Microsoft</button>
    </div>
  );
}
