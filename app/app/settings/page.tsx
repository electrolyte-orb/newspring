import SignOut from "./sign-out";
import { createClient } from "@/lib/server";
import {
  Button,
  Container,
  Divider,
  Flex,
  Input,
  Text,
  Title,
} from "@mantine/core";
import { cookies } from "next/headers";

export const revalidate = 0;

export default async function Settings() {
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
    <Container size="sm">
      <Title order={1} c="white" my="lg">
        Settings
      </Title>
      <Flex gap="md" direction="column">
        <Divider />
        <div>
          <Flex align="center" justify="space-between" mt="sm">
            <div>
              <Title order={4}>Newpsring Handle</Title>
              <Text size="xs" c="dark.2">
                Change your current user handle:{" "}
                <Text span c="white">
                  {username}
                </Text>
              </Text>
            </div>
            <Input size="xs" placeholder={username} />
          </Flex>
        </div>

        <div>
          <Flex align="center" justify="space-between" mt="sm">
            <div>
              <Title order={4}>Email settings</Title>
              <Text size="xs" c="dark.2">
                Your email cannot be changed, because we identify by your email:{" "}
                <Text c="white" span>
                  {user?.email}
                </Text>
              </Text>
            </div>
            <Button variant="transparent" disabled size="xs">
              Change
            </Button>
          </Flex>
        </div>

        <div>
          <Flex align="center" justify="space-between" mt="sm">
            <div>
              <Title order={4}>Destructive Actions</Title>
              <Text size="xs" c="dark.2">
                Although not that destructive
              </Text>
            </div>
            <SignOut />
          </Flex>
        </div>
      </Flex>
    </Container>
  );
}
