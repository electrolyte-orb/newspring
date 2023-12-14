"use client";

import { ReactNode } from "react";
import { Anchor, AppShell, Container, Flex, Text } from "@mantine/core";
import Link from "next/link";
import classes from "./Appshell.module.css";

const footerLinks = [
  { label: "Account", href: "/login" },
  { label: "Settings", href: "/" },
  { label: "Github", href: "https://github.com/electrolyte-orb" },
  { label: "Home", href: "/" },
];

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

export default function Appshell({ children }: { children: ReactNode }) {
  return (
    <AppShell
      header={{ height: 60, offset: true }}
      footer={{ height: 100, offset: false }}
    >
      <AppShell.Header>
        <Container h="100%">
          <Flex align="center" h="100%">
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
