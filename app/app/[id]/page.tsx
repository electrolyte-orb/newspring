import { Container, Title } from "@mantine/core";

export default function DynamicApp({ params }: { params: { id: string } }) {
  return (
    <Container>
      <Title order={1}>This is dynamic: {params.id}</Title>
    </Container>
  );
}
