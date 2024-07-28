"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { getUserAtom, setUserAtom, userAtom } from "./store";
import { createClient } from "@/lib/client";
import type { User } from "@supabase/supabase-js";
import type { ReactNode } from "react";
import Image from "next/image";

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
  }, [supabase.auth.onAuthStateChange, setUser]);

  return <>{children}</>;
}
