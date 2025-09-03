import { Manrope } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

const manrope = Manrope({ 
  subsets: ["latin"], 
  weight: ["200", "300", "400", "500", "600", "700", "800"] 
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <NavBar />
        <main className="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}