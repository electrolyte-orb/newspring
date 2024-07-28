import { atom } from "jotai";
import type { AuthUser } from "@supabase/supabase-js";
import { Database } from "@/types/database-types";

export const userAtom = atom<AuthUser | null>(null);
// export const contactsAtom = atom<Database["public"]["Views"]["contact_view"]["Row"][] | null>(null);

export const getUserAtom = atom((get) => {
  return get(userAtom);
});
export const setUserAtom = atom(null, (get, set, newUser: AuthUser | null) => {
  set(userAtom, newUser);
});

// export const getContactsAtom = atom((get) => {
//   return get(contactsAtom);
// });
