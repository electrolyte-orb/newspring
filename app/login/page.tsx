import { getSession } from "@/lib/get-session";
import SignIn from "./sign-in";
import { Alert, Container } from "@mantine/core";
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
    <Container>
      {redirectError &&
        (redirectError === "LoggedOut" ? (
          <Alert variant="light" color="yellow" title="You logged out">
            You logged out of your account.
          </Alert>
        ) : (
          <Alert variant="light" color="red" title="Authentication error">
            You need to login once again, error: {redirectError}
          </Alert>
        ))}
      <SignIn />
    </Container>
  );
}
