import SignOut from "./sign-out";
import { createClient } from "@/lib/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function Settings() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const {
		data: { user },
	} = await supabase.auth.getUser();
	let username = "";

	if (user) {
		const { data, error } = await supabase
			.from("user")
			.select("username")
			.eq("id", user.id)
			.single();
		if (!error) {
			username = data.username;
		}
	}

	return (
		<main>
			<h1>Settings Page</h1>
			<br />
			<pre>{JSON.stringify(user, null, 2)}</pre>
			<br />
			{username}
			<SignOut />
		</main>
	);
}
