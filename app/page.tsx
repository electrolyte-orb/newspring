import { createClient } from "@/lib/server";
import { cookies } from "next/headers";
import { Button, Container, Text, Title } from "@mantine/core";
import Link from "next/link";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let username: string = "";

  if (user) {
    const { data, error } = await supabase
      .from("user")
      .select("username")
      .eq("id", user.id)
      .single();
    if (!error) {
      username = data.username;
    }
  }

  return (
    <Container>
      <Title c="white" order={1} size={64} my={64}>
        NewSpring{" "}
        <Text span c="bright-blue" inherit>
          welcomes you!
        </Text>
      </Title>
      {username ? (
        <span className="font-medium">@{username}</span>
      ) : (
        <Button component={Link} href="/login">
          Login
        </Button>
      )}
    </Container>
  );
}
