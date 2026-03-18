import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { AuthProvider } from "@/lib/AuthContext";
import { ProfileProvider } from "@/lib/ProfileContext";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduQuest - Learning Made Fun",
  description: "A gamified learning platform for rural students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ProfileProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}