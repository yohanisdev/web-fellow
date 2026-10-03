import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "JUAC EvaSUE Fellowship",
  description: "Official portal for the JUAC EvaSUE Christian Fellowship community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased font-sans bg-slate-50 text-slate-900">

        {/* Interactive Global Navigation */}
        <Navbar />

        {/* Dynamic Page Target Vector */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Global Footer Shell */}
        <footer className="bg-fellowship-blue-dark text-slate-400 py-6 border-t border-slate-800 text-center text-xs">
          <p>© {new Date().getFullYear()} JUAC EvaSUE Fellowship. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}