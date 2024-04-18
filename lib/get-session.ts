import type { cookies } from "next/headers";
import { createClient } from "./server";

export const getSession = async (cookieStore: ReturnType<typeof cookies>) => {
  const supabase = createClient(cookieStore);
  return await supabase.auth.getSession();
};
