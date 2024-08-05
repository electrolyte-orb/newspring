import { createClient } from "@/lib/server";
import { cookies } from "next/headers";
import RealtimeMessages from "./realtime-messages";

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
    .from("contact")
    .select("*, friend(*)")
    .eq("friendship_id", params.id)
    .single();
  if (error || data == null || data.friend == null) {
    return (
      <div>ERROR: SOMETHING WENT WRONG, YOU NO LONGER SEEMS TO BE FRIENDS</div>
    );
  }
  const { data: serverMessages, error: messageError } = await supabase
    .from("message")
    .select()
    .eq("friendship_id", data.friend.id);

  if (messageError) {
    return <div>ERROR: CANNOT FETCH MESSAGES</div>;
  }

  return (
    <main>
      <h1>This is dynamic: {params.id}</h1>
      <RealtimeMessages
        serverMessages={serverMessages}
        friend={data.friend}
        user_id={userData.user.id}
        contact_name={data.name ?? "Unknown"}
      />
    </main>
  );
}
