import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import ReduxProvider from "./ReduxProvider";

const inter = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Hava Durumu App",
  description: "Hava Durumu App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel='icon' href='/favicon.ico' />
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
