import { atom } from "jotai";
import type { AuthUser } from "@supabase/supabase-js";

export const userAtom = atom<AuthUser | null>(null);
export const getUserAtom = atom((get) => {
  return get(userAtom);
});
export const setUserAtom = atom(null, (get, set, newUser: AuthUser | null) => {
  set(userAtom, newUser);
});
