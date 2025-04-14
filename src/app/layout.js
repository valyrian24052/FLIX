// ================================================
// FILE: src/app/layout.js
// Customized for "The Silent Echo" UI
// ================================================

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Silent Echo",
  description:
    "A psychological thriller about a detective who loses his hearing in an accident and must solve a high-profile case using his other senses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-papnm0eGqkH2f0k5Mx59NlJME5Sll1j3RkKVOzkH3XJeEJP8cDqgENhKnQ1zQ89Zb3FUdLkB3GAiWvvH3/jVtw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <title>The Silent Echo</title>
      </Head>
      <body
        className={`bg-black text-white ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}