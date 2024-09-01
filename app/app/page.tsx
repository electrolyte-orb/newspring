import { createClient } from "@/lib/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { AddContact } from "@/components/AddContact";
import Image from "next/image";
import { ImageDataURI } from "@/lib/image-data-uri";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function App() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data: user, error: userError } = await supabase.auth.getUser();

	if (userError != null || user.user === null) {
		console.error(userError);
		return;
	}

	const { data, error } = await supabase
		.from("contact_view")
		.select()
		.eq("owner_id", user.user.id);

	if (error != null) {
		console.error(error);
		return <div>CANNOT LOAD CONTACTS, SOMETHING WENT WRONG</div>;
	}

	return (
		<>
			<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
				Hi, {user.user?.user_metadata.full_name}
			</h2>
			<div className="my-4">
				<AddContact />
			</div>
			<ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
				{data.map((contact, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: TODO: use UUID in future
					<li key={i}>
						<Link
							prefetch={false}
							href={`/app/${contact.friendship_id}`}
							className="p-2 border rounded-md grid grid-cols-[64px_1fr] gap-2"
						>
							<Image
								alt={`${contact.name} profile picture`}
								className="rounded-full"
								src={contact.picture_url ?? "/image/user-fallback.png"}
								placeholder="blur"
								blurDataURL={ImageDataURI}
								width={64}
								height={64}
							/>
							<div className="flex flex-col justify-center gap-1">
								<div className="font-bold line-clamp-1">{contact.name}</div>
								<div className="text-sm text-muted-foreground line-clamp-1">
									{contact.username}
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
			<p className="text-sm text-muted-foreground mt-4">
				UI icons are provided by Lucide.
			</p>
		</>
	);
}
