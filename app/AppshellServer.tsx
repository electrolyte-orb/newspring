import { ReactNode } from "react";
import Appshell from "./Appshell";
import { getCachedSession } from "@/lib/get-session";
import { cookies } from "next/headers";

export default async function AppshellServer({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = cookies();
  const {
    data: { session: cachedSession },
  } = await getCachedSession(cookieStore);

  return (
    <>
      <Appshell userFromServer={cachedSession?.user ?? null}>
        {children}
      </Appshell>
    </>
  );
}
