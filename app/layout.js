import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import SessionWrapper from "../app/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get-a-Developer | Hire Top Developers Instantly",
  description: "Find and hire skilled developers quickly and easily through Get-a-Developer. Secure, fast, and reliable developer hiring.",
  keywords: [
    "hire developer",
    "find developers",
    "remote developers",
    "freelance developers",
    "get a developer",
    "full-stack developer",
    "frontend backend hire"
  ],
  authors: [{ name: "Shahnawaz Saddam Butt", url: "https://yourdomain.com" }],
  creator: "Shahnawaz Saddam Butt",
  publisher: "Get-a-Developer",
  icons: {
    icon: "/butt.png",
  },
  openGraph: {
    title: "Get-a-Developer | Hire Top Developers Instantly",
    description: "Connect with expert developers around the world. Fast, secure, and vetted hiring process.",
    url: "https://yourdomain.com",
    siteName: "Get-a-Developer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Get-a-Developer Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get-a-Developer | Hire Top Developers",
    description: "Easily find and hire top-tier developers online.",
    creator: "@yourTwitterHandle",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://yourdomain.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={inter.className}>{children}</body>
      </SessionWrapper>
    </html>
  );
}
