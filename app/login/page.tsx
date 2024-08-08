import { getSession } from "@/lib/get-session";
import SignIn from "./sign-in";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";
export const runtime = "edge";

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
		<>
			{redirectError &&
				(redirectError === "LoggedOut" ? (
					<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Logged Out</AlertTitle>
						<AlertDescription>You have been logged out.</AlertDescription>
					</Alert>
				) : (
					<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Error occured</AlertTitle>
						<AlertDescription>
							Something has gone wrong. Please refresh the page and try again.
						</AlertDescription>
					</Alert>
				))}
			<SignIn />
		</>
	);
}
