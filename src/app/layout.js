import { Roboto } from "next/font/google";
import "./globals.css";
import ThemeInitializer from "./components/ThemeInitializer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Task Tracker - Santosh Thapa",
  description:
    "A simple and efficient personal task management application with dark/light theme support",
  authors: [{ name: "Santosh Thapa" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <ThemeInitializer />
        {children}
      </body>
    </html>
  );
}
