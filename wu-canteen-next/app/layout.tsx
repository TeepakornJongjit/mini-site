import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
// Import Font Awesome Core and Styles
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
export const metadata: Metadata = {
  title: "WU Canteen",
  description: "Next.js + TypeScript + Tailwind version of the WU Canteen site",
};
type RootLayoutProps = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gray-100 text-gray-900">

        <header className="flex items-center justify-between border-b border-gray-200 bg-gray-50 text-gray-900 px-6 py-
4">

          <h1 className="text-xl font-bold">WU Canteen</h1>
          <nav>
            <ul className="flex gap-6 text-gray-900">

              <li><Link href="/" className="inline-block transition-all duration-300 hover:text-purple-500 hover:scale-
105">Home</Link></li>

              <li><Link href="/menu" className="inline-block transition-all duration-300 hover:text-purple-500

hover:scale-105">Menu</Link></li>

              <li><Link href="/about" className="inlsine-block transition-all duration-300 hover:text-purple-500

hover:scale-105">About</Link></li>

            </ul>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
          {children}
        </main>
        <footer className="bg-gray-800 py-5 text-center text-white">
          <p>&copy; 2026 WU Canteen. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}