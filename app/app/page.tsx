import { createClient } from "@/lib/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { AddContact } from "./AddContact";

export const revalidate = 0;

export default async function App() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("contact_view").select();

  if (error != null) {
    console.error(error);
    return <div>CANNOT LOAD CONTACTS, SOMETHING WENT WRONG</div>;
  }

  return (
    <div>
      <h1>App Console</h1>
      <AddContact />
      <ul>
        {data.map((contact, i) => (
          <li key={i}>
            <Link href={`/app/${contact.friendship_id}`}>
              {contact.name} - <b>{contact.username}</b>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
