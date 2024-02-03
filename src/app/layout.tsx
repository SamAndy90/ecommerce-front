import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "components/Header";
import Providers from "components/Providers";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce Front",
  description: "Welcome to the ecommerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <div className={"flex flex-col min-h-screen"}>
            <Header />
            <main className={"flex-1 flex flex-col"}>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
