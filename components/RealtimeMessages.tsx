"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/client";
import type { Tables } from "@/types/database-types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface RealtimeMessagesProps {
	serverMessages: Tables<"message">[];
	user_id: string;
	contact: Tables<"contact_view">;
	user_picture: string | null;
}

export default function RealtimeMessages({
	serverMessages,
	user_id,
	user_picture,
	contact,
}: RealtimeMessagesProps) {
	const [messages, setMessages] = useState(serverMessages);
	const [inputMessage, setInputMessage] = useState("");
	const [isConnected, setIsConnected] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);
	const supabase = createClient();
	const router = useRouter();

	function handleInput() {
		if (inputRef?.current) {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			setInputMessage(inputRef.current.value!);
		}
	}

	async function handleSubmit() {
		if (
			contact.contact_id === null ||
			contact.friend_id === null ||
			contact.friendship_id === null ||
			contact.name === null ||
			contact.owner_id === null ||
			contact.username === null
		) {
			throw new Error("RealtimeMessages contact object properties found null");
		}

		// TODO: IMPLEMENT SEND FEATURE,
		if (inputMessage.length <= 1) return;

		const { error } = await supabase.from("message").insert({
			friendship_id: contact.friendship_id,
			content: inputMessage,
			owner_id: user_id,
			viewer_id: contact.friend_id,
		});

		if (error) {
			return console.log({ error });
		}
		if (inputRef.current) {
			setInputMessage("");
		}
	}

	useEffect(() => {
		const messageChannel = supabase.channel(contact.friendship_id ?? "");

		messageChannel
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "message",
					filter: `friendship_id=eq.${contact.friendship_id}`,
				},
				(payload) => {
					console.log("Payload recieved");
					switch (payload.eventType) {
						case "UPDATE":
							setMessages((oldMessages) => {
								const __old = [...(oldMessages ?? [])];

								oldMessages.forEach((msg, i) => {
									if (msg.id === payload.old.id) {
										__old[i] = payload.new as Tables<"message">;
									}
								});

								return __old;
							});
							break;
						case "INSERT":
							setMessages((oldMessage) => {
								const __old = [
									...(oldMessage ?? []),
									payload.new as Tables<"message">,
								];
								return __old;
							});
							break;
						case "DELETE":
							setMessages((oldMessage) => {
								const __old = [...oldMessage];
								return __old.filter((msg) => msg.id !== payload.old.id);
							});
							break;
						default:
							break;
					}
				},
			)
			.subscribe((status) => {
				if (status === "SUBSCRIBED") {
					setIsConnected(true);
				} else if (!(status === "CLOSED")) {
					router.refresh();
				}
			}, 5000);

		return () => {
			messageChannel.unsubscribe();
		};
	}, [supabase, contact.friendship_id, router]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// scroll last message into view
		if (bottomRef.current) bottomRef.current.scrollIntoView(false);
	}, [messages]);

	return (
		<div>
			{messages?.map((message, i) => (
				<div
					className={cn(
						"flex gap-2 my-2",
						message.owner_id === user_id ? "flex-row-reverse" : "",
					)}
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={i}
				>
					<Avatar>
						<AvatarImage
							src={
								(message.owner_id === user_id
									? user_picture
									: contact.picture_url) ?? "/image/user-fallback.png"
							}
						/>
					</Avatar>
					<div className="flex-col">
						<div className="text-muted-foreground text-sm">
							{message.owner_id === user_id ? "Me" : contact.username}{" "}
							<span className="text-neutral-600">
								{new Date(message.created_at).toLocaleTimeString("en-IN")}
							</span>
						</div>
						<div>{message.content}</div>
					</div>
				</div>
			))}
			<div className="h-16 w-1" ref={bottomRef} />
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				className="bg-background fixed bottom-0 left-0 z-10 w-full flex items-center px-4 py-2 border-t border-x rounded-t-md"
			>
				<Input
					type="text"
					minLength={1}
					value={inputMessage}
					onChange={handleInput}
					ref={inputRef}
					placeholder={
						isConnected
							? "Type your message here..."
							: "Connecting... (Please Wait)"
					}
					className="border-0 focus-visible:ring-0 focus-visible:ring-offset focus-visible:ring-transparent px-0 py-0 h-8"
				/>
				<Button
					disabled={!isConnected}
					className="h-6 px-2"
					type="submit"
					variant="ghost"
				>
					Send
					<ChevronRight className="w-4 h-4 ml" />
				</Button>
			</form>
		</div>
	);
}
