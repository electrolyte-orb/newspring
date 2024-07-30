import { Provider as JotaiProvider } from "jotai";
import type { Metadata } from "next";
import Navbar from "./Navbar";
import React from "react";

export const metadata: Metadata = {
	title: "Codenamed newspring",
	description: "Next.js app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<JotaiProvider>
					<Navbar />
					{children}
				</JotaiProvider>
			</body>
		</html>
	);
}
