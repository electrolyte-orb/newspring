"use client";

import { useState } from "react";
import { createClient } from "@/lib/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export function AddContact() {
	const [uuidField, setUuidField] = useState("");
	const [nameField, setNameField] = useState("");
	const [status, setStatus] = useState("");
	const supabase = createClient();

	async function handleSubmit() {
		const { data, error } = await supabase
			.rpc("create_contact_friendship", {
				p_friend_user_id: uuidField,
				p_name: nameField,
			})
			.single();
		setStatus(error ? error.message : data.id);
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Open</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Add contact</SheetTitle>
					<SheetDescription>
						Add your friend in your contacts list. You need their{" "}
						<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
							uuid
						</code>
						. Beware that you adding your friend to your contact list does not
						make changes to your friend contact list.
					</SheetDescription>
				</SheetHeader>
				<form
					className="grid gap-4 py-4"
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="uuid" className="text-right">
							UUID
						</Label>
						<Input
							placeholder="2ebc3afa-2ce4-49e2-8238-674bb2d87ef9"
							type="text"
							onChange={(e) => {
								setUuidField(e.target.value);
							}}
							id="uuid"
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							className="col-span-3"
							placeholder="John Doe"
							type="text"
							onChange={(e) => {
								setNameField(e.target.value);
							}}
						/>
					</div>
					<Button asChild>
						<input type="submit" value="Add Contact" />
					</Button>
				</form>
			</SheetContent>
		</Sheet>
	);
}
