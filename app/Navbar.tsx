"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { userAtom } from "./store";
import { createClient } from "@/lib/client";
import type { User } from "@supabase/supabase-js";

interface NavbarClientProps {
  userFromServer: User | null;
}

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
      <div style={{ display: "flex", gap: 10 }}>
        <Link href="/">Home</Link>
        {user ? (
          <>
            <Link href="/app/settings">Settings</Link>
            <Link href="/app">App</Link>
            <i>{user.email}</i>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </>
  );
}
