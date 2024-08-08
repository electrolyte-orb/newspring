"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/client";

const PROD_URL = "https://newspring-app.vercel.app";
const DEV_URL = "http://localhost:3000";

export default function SignIn() {
	const supabase = createClient();

	async function handleLogin(provider: "google" | "azure") {
		try {
			await supabase.auth.signInWithOAuth({
				provider,
				options: {
					redirectTo: `${process.env.NODE_ENV === "production" ? PROD_URL : DEV_URL}/auth/callback`,
				},
			});
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div>
			<Button onClick={() => handleLogin("google")}>Google</Button>
			<Button onClick={() => handleLogin("azure")}>Microsoft</Button>
		</div>
	);
}
