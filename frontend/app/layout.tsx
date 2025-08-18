import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '../context/AuthContext'; // Import the provider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Risk Mirror",
  description: "Your Risk Simulation Co-pilot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider> {/* Wrap your application here */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}