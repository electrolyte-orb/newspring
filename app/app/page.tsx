import { Container, Title } from "@mantine/core";

export const revalidate = 0;

export default async function App() {
  return (
    <Container>
      <Title order={1}>This is /app</Title>
    </Container>
  );
}
