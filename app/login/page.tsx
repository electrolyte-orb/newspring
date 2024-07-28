import { getSession } from "@/lib/get-session";
import SignIn from "./sign-in";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Login({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const redirectError = searchParams.error;
  const cookieStore = cookies();
  const session = await getSession(cookieStore);

  if (session.data.session !== null && session.error === null) {
    return redirect("/app");
  }

  return (
    <main>
      {redirectError && (redirectError === "LoggedOut" ? <div>Logged Out</div> : <div>Error Occurred</div>)}
      <SignIn />
    </main>
  );
}
