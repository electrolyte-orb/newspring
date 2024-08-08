import { createClient } from "@/lib/server";
import { cookies } from "next/headers";
import RealtimeMessages from "@/components/RealtimeMessages";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "edge";

export default async function DynamicApp({
	params,
}: {
	params: { id: string };
}) {
	const supabase = createClient(cookies());
	const { data: userData, error: userError } = await supabase.auth.getUser();
	if (userError) {
		console.log(userError);
		return <div>USER ERROR</div>;
	}

	const { data, error } = await supabase
		.from("contact_view")
		.select()
		.eq("owner_id", userData.user.id)
		.eq("friendship_id", params.id)
		.single();
	if (error || data == null || data.friendship_id == null) {
		return (
			<div>ERROR: SOMETHING WENT WRONG, YOU NO LONGER SEEMS TO BE FRIENDS</div>
		);
	}
	const { data: serverMessages, error: messageError } = await supabase
		.from("message")
		.select()
		.eq("friendship_id", data.friendship_id);

	if (messageError) {
		return <div>ERROR: CANNOT FETCH MESSAGES</div>;
	}

	return (
		<>
			<RealtimeMessages
				serverMessages={serverMessages}
				user_id={userData.user.id}
				user_picture={userData.user.user_metadata.picture}
				contact={data ?? "Unknown"}
			/>
		</>
	);
}
