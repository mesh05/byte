import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import { Providers } from "@/components/auth/sessionprovider";
import RecoidContextProvider from "@/components/recoil/RecoilProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Byte",
  description: "Online Coding Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoidContextProvider>
          <Providers>{children}</Providers>
        </RecoidContextProvider>
      </body>
    </html>
  );
}
