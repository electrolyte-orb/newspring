import SignOut from "./sign-out";
import { createClient } from "@/lib/server";
import { cookies } from "next/headers";

export const revalidate = 0;

export default async function Settings() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let username: string = "";

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
      <SignOut />
    </main>
  );
}
