import { atom } from "jotai";
import type { AuthUser } from "@supabase/supabase-js";

export const userAtom = atom<AuthUser | null>(null);
