"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { userAtom } from "./store";
import { createClient } from "@/lib/client";
import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";

interface NavbarClientProps {
  userFromServer: User | null;
}

const links = [
  { href: "/", name: "Home" },
  { href: "/app/settings", name: "Settings" },
  { href: "/app", name: "App" },
];

export default function Navbar() {
  const [user, setUser] = useAtom(userAtom);

  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((e, session) => {
      setUser(session ? session?.user : null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, setUser]);

  return (
    <>
      <div className="bg-background p-4 sticky top-0 flex gap-2">
        {links.map((link, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Link href={link.href} key={i}>
            <Button variant="link" className="px-2 py-1">
              {link.name}
            </Button>
          </Link>
        ))}
      </div>
    </>
  );
}
