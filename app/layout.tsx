// app/layout.tsx
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], weight: ["200","300","400","500","600","700","800"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
