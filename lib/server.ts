import { createServerClient } from "@supabase/ssr";
import type { cookies } from "next/headers";
import type { Database } from "@/types/database-types";

export function createClient(cookieStore: ReturnType<typeof cookies>) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Supabase Env not defined");
  }

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        fetch: (...args) => fetch(args[0], { ...args[1], cache: "no-store" }),
      },
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );
}
