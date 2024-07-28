import { Provider as JotaiProvider } from "jotai";
import AppshellServer from "./AppshellServer";
import type { Metadata } from "next";

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
          {/*@ts-ignore*/}
          <AppshellServer>{children}</AppshellServer>
        </JotaiProvider>
      </body>
    </html>
  );
}
