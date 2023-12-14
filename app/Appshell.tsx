"use client";

import { ReactNode, useEffect } from "react";
import { Anchor, AppShell, Container, Flex, Text } from "@mantine/core";
import Link from "next/link";
import classes from "./Appshell.module.css";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { getUserAtom, setUserAtom, userAtom } from "./store";
import { createClient } from "@/lib/client";
import { User } from "@supabase/supabase-js";

const footerLinks = [
  { label: "Account", href: "/app/settings" },
  { label: "Github", href: "https://github.com/electrolyte-orb" },
  { label: "Home", href: "/" },
];

export default function Appshell({
  children,
  userFromServer,
}: {
  children: ReactNode;
  userFromServer: User | null;
}) {
  useHydrateAtoms([[userAtom, userFromServer]]);

  const [user] = useAtom(getUserAtom);
  const [, setUser] = useAtom(setUserAtom);

  const supabase = createClient();
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((e, session) => {
      setUser(session ? session?.user : null);
    });

    () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AppShell
      header={{ height: 60, offset: true }}
      footer={{ height: 100, offset: false }}
    >
      <AppShell.Header>
        <Container h="100%">
          <Flex align="center" h="100%" justify="space-between">
            <Anchor
              component={Link}
              href="/"
              underline="never"
              c="white"
              size="lg"
              fw="bold"
            >
              Newspring
            </Anchor>
            <Text>{user === null ? "logged out" : "logged in"}</Text>
          </Flex>
        </Container>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer bg="dark.7" pos="static">
        <Container my={16}>
          <Text size="sm" fw="Medium">
            ©️ Newspring 2024
          </Text>

          <Flex gap="md" mt={16}>
            <FooterLinks />
          </Flex>
        </Container>
      </AppShell.Footer>
    </AppShell>
  );
}

function CustomAnchor({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Anchor component={Link} href={href} classNames={{ root: classes.root }}>
      {children}
    </Anchor>
  );
}

function FooterLinks() {
  return (
    <>
      {footerLinks.map(({ label, href }, index) => (
        <CustomAnchor children={label} href={href} key={index} />
      ))}
    </>
  );
}
