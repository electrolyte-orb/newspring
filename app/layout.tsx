import { Provider as JotaiProvider } from "jotai";
import type { Metadata } from "next";
import Navbar from "./Navbar";
import React from "react";
import { GeistSans as FontSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import "./global.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Codenamed newspring",
  description: "Next.js app",
};

export const preferredRegion = ["bom1"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          FontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <JotaiProvider>
            <Navbar />
            {children}
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
