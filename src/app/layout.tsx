import type { Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { ColorsThemeProvider } from "@/providers/colors-theme-provider";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Shadcn Components Showcase",
  description: "A comprehensive display of 38 beautiful Shadcn UI components with Vercel-inspired theming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="antialiased">
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <ColorsThemeProvider>
            {children}
            <Toaster />
          </ColorsThemeProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
