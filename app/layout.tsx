import { Manrope } from "next/font/google";
import "./globals.css"; // Убедитесь, что импортируете глобальные стили



import { ReactNode } from "react";
import { relative } from "path";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={"relative"}>{children}</body>
    </html>
  );
}