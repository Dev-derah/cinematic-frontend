import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { PopularMoviesProvider } from "@/context/PopularMoviesProvider";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";


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
    <AuthProvider>
      <html lang="en">
        <body
          className={`${manrope.className} flex flex-col bg-black-08 relative`}
        >
          <PopularMoviesProvider>
            <Toaster/>
            {children}
            </PopularMoviesProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
