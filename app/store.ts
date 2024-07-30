import { atom } from "jotai";
import type { AuthUser } from "@supabase/supabase-js";
import { Tables } from "@/types/database-types";

export const userAtom = atom<AuthUser | null>(null);
