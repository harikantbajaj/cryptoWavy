// app/layout.tsx
import { AuthProvider } from "@/components/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Font imports
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO and Social Sharing Metadata
export const metadata: Metadata = {
  title: "Crypto Wavy",
  description:
    "Your AI-powered crypto companion for real-time insights and market analysis.",
  metadataBase: new URL("https://crypto-Wavy-eta.vercel.app/"),
  openGraph: {
    title: "Crypto Talks",
    description:
      "Your AI-powered crypto companion for real-time insights and market analysis.",
    url: "https://crypto-Wavy-eta.vercel.app/",
    siteName: "Crypto Wavy",
    images: ["/preview.png"],
  },
};

// Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <Toaster />
        <AuthProvider>
          <CopilotKit runtimeUrl="/api/copilotkit">
            {children}
          </CopilotKit>
        </AuthProvider>
      </body>
    </html>
  );
}
