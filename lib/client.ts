import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database-types";

export function createClient() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL == null || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY == null) {
    throw new Error("Supabase Env not defined");
  }

  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
