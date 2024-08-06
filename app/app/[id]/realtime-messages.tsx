"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/client";
import type { Tables } from "@/types/database-types";
import { useEffect, useRef, useState } from "react";

interface RealtimeMessagesProps {
	serverMessages: Tables<"message">[];
	friend: Tables<"friend">;
	user_id: string;
	contact_name: string;
}

export default function RealtimeMessages({
	serverMessages,
	friend,
	user_id,
	contact_name,
}: RealtimeMessagesProps) {
	const [messages, setMessages] = useState(serverMessages);
	const [inputMessage, setInputMessage] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const supabase = createClient();

	function handleInput() {
		if (inputRef?.current) {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			setInputMessage(inputRef.current.value!);
		}
	}

	async function handleSubmit() {
		// TODO: IMPLEMENT SEND FEATURE,
		if (inputMessage.length <= 1) return;

		const { error } = await supabase.from("message").insert({
			friendship_id: friend.id,
			content: inputMessage,
			owner_id: user_id,
			viewer_id:
				friend.friend_1 === user_id ? friend.friend_2 : friend.friend_1,
		});

		if (error) {
			return console.log({ error });
		}
		if (inputRef.current) inputRef.current.value = "";
	}

	useEffect(() => {
		const messageChannel = supabase.channel(friend.id);

		messageChannel
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "message",
				},
				(payload) => {
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
			.subscribe();

		return () => {
			messageChannel.unsubscribe();
		};
	}, [supabase, friend.id]);

	return (
		<>
			<h2>HERE ARE MESSAGES</h2>
			{messages?.map((message, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div key={i}>
					<i>{message.owner_id === user_id ? "Me: " : `${contact_name}: `}</i>
					{message.content}
				</div>
			))}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<Input
					type="text"
					minLength={1}
					onChange={handleInput}
					ref={inputRef}
				/>
				<Button asChild>
					<input type="submit" />
				</Button>
			</form>
		</>
	);
}
