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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function AddContact() {
	const [userName, setUserName] = useState("");
	const [nameField, setNameField] = useState("");
	const [status, setStatus] = useState("");
	const [open, setOpen] = useState(false);
	const supabase = createClient();
	const router = useRouter();

	async function handleSubmit() {
		const { error } = await supabase
			.rpc("create_contact_friendship", {
				p_friend_username: userName,
				p_name: nameField,
			})
			.single();
		setStatus(error ? error.message : "");
		if (error === null) {
			setOpen(false);
			router.refresh();
		}
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="secondary">
					<Plus className="mr-2 h-4 w-4" />
					Add Contact
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Add contact</SheetTitle>
					<SheetDescription>
						Add your friend in your contacts list. You need their{" "}
						<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
							user_id
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
							User ID
						</Label>
						<Input
							placeholder="myfriend_ac12c45"
							type="text"
							onChange={(e) => {
								setUserName(e.target.value);
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
				{status && (
					<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Failed to create contact</AlertTitle>
						<AlertDescription>{status}</AlertDescription>
					</Alert>
				)}
			</SheetContent>
		</Sheet>
	);
}
