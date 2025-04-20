// src/app/layout.tsx
import "./globals.css";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Globetrotter Challenge",
  description: "Guess the cities based on clues and fun facts!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Toaster position="top-right" richColors expand />
        {children}
      </body>
    </html>
  );
}
