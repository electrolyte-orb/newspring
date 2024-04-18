import { ReactNode } from "react";
import Appshell from "./Appshell";
import { getSession } from "@/lib/get-session";
import { cookies } from "next/headers";

export default async function AppshellServer({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await getSession(cookieStore);

  return (
    <>
      <Appshell userFromServer={session?.user ?? null}>{children}</Appshell>
    </>
  );
}
