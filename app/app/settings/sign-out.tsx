"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/client";
import { useRouter } from "next/navigation";

export default function SignOut() {
	const supabase = createClient();
	const router = useRouter();
	async function handleSignOut() {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) console.error(error);
		} catch (err) {
			console.error(err);
		}
		router.refresh();
	}

	return (
		<>
			<Button onClick={() => handleSignOut()}>Sign Out</Button>
		</>
	);
}
