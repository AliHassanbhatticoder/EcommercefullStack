import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Header from "./componenets/header2";
import Footer from "./componenets/footer";
import MobileNav from "./componenets/MobileNav";

export const metadata: Metadata = {
  title: "Zindagi Essentials",
  description: "Your ultimate e-commerce solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="preload"
            href="/fonts/Clashdisplay/ClashDisplay-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Satoshi/Satoshi-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Satoshi/Satoshi-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </head>
        <body>
          <Header />
          {children}
          <Footer />
          <MobileNav />
        </body>
      </html>
    </ClerkProvider>
  );
}
