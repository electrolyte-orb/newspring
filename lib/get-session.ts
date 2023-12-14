import { unstable_cache } from "next/cache";
import type { cookies } from "next/headers";
import { createClient } from "./server";

export const getCachedSession = unstable_cache(
  async (cookieStore: ReturnType<typeof cookies>) => {
    const supabase = createClient(cookieStore);
    return await supabase.auth.getSession();
  },
  ["newspring-supabase-user"]
);
