import "@mantine/core/styles.layer.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Provider as JotaiProvider } from "jotai";
import { theme, resolver } from "@/theme";
import Appshell from "./Appshell";
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
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <JotaiProvider>
          <MantineProvider
            cssVariablesResolver={resolver}
            theme={theme}
            defaultColorScheme="dark"
          >
            <Appshell>{children}</Appshell>
          </MantineProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
