import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./_components/ThemeProvider";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "AI Course Generator",
  description: "Create custom AI-powered courses with Gemini API, YouTube video integration, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <GoogleOneTap />
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}