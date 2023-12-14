"use client";
import { Button, Flex } from "@mantine/core";
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
    <Flex gap={0}>
      <Button onClick={() => handleLogin("google")}>Google</Button>
      <Button onClick={() => handleLogin("azure")}>Microsoft</Button>
    </Flex>
  );
}
