import { Button, Container, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Title c="white" order={1} size={64} my={64}>
        NewSpring{" "}
        <Text span c="bright-blue" inherit>
          welcomes you!
        </Text>
      </Title>
      <Button component={Link} href="/login">
        Get Started
      </Button>
    </Container>
  );
}
