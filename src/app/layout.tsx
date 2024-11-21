import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import "./globals.css";
import { PopularMoviesProvider } from "@/context/PopularMoviesProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinematic AI",
  description:
    "Discover your perfect movie match with Cinematic AI. Simply describe your mood, preferred genre, or any specific criteria, and let our AI-powered recommendation engine find the ideal films for you. From heartwarming comedies to thrilling adventures, find your next favorite movie in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${manrope.className} flex flex-col bg-black-08 relative`}
        >
          <PopularMoviesProvider>{children}</PopularMoviesProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
