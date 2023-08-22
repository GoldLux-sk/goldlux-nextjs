import payload from "payload";
import "./globals.css";
import { Inter, Poppins, Roboto, Syne } from "next/font/google";

export const metadata = {
  title: "Goldlux",
  description: "Goldlux, the new way of cleaning",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const syne = Syne({
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body id="root">{children}</body>
    </html>
  );
}
