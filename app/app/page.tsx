import { createClient } from "@/lib/server";
import { Container, Title } from "@mantine/core";
import { cookies } from "next/headers";

export const revalidate = 0;

export default async function App() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("contact_view").select("*");

  console.log(data, error);

  return (
    <Container>
      <Title order={1}>This is /app</Title>
    </Container>
  );
}
