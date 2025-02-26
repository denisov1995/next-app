import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import AuthButton from "./components/AuthButton";
import { SessionProvider } from "next-auth/react";
import ClientSessionProvider from "./ClientSessionProvider";
import CustomLink from "./components/CustomLink";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ClientSessionProvider>
          <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between">
              <div className="flex items-center">
                <Image
                  src="/next.svg"
                  alt="Next.js Logo"
                  width={50}
                  height={50}
                />
                <CustomLink link="/">My Website</CustomLink>
              </div>
              <div className="flex items-center">
                <CustomLink link="/about-us">About Us</CustomLink>
                <CustomLink link="/users">Products</CustomLink>
                <CustomLink link="/profile">Profile</CustomLink>
                <AuthButton />
              </div>
            </nav>
          </header>

          {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
