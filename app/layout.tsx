import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

const socialLinks = [
  {
    name: "Telegram",
    href: "https://t.me/+VnnLjNVsYNZmOTU0",
    className: "hover:bg-sky-500 hover:text-white",
    icon: <path d="M21.8 3.2 18.7 20c-.2 1.2-.9 1.5-1.8.9l-5-3.7-2.4 2.3c-.3.3-.6.6-1.2.6l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.2L6 13.6l-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6L20.4 3c.9-.3 1.7.2 1.4 1.7Z" fill="currentColor" stroke="none" />,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@your-channel",
    className: "hover:bg-red-600 hover:text-white",
    icon: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" /></>,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/agaro_evasue_fellowship/",
    className: "hover:bg-gradient-to-br hover:from-fuchsia-500 hover:to-amber-400 hover:text-white",
    icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" /></>,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/your-page",
    className: "hover:bg-blue-600 hover:text-white",
    icon: <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.4V10H7v3h2.9v8h3.6Z" fill="currentColor" stroke="none" />,
  },
];

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
      <body className="amharic-font min-h-full flex flex-col antialiased font-sans bg-slate-50 text-slate-900">

        {/* Interactive Global Navigation */}
        <Navbar />

        {/* Dynamic Page Target Vector */}
        <main className="flex-grow">
          {children}
        </main>

        <footer className="border-t border-white/10 bg-fellowship-blue-dark text-slate-300">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-5 py-10 sm:px-8 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-sm font-bold tracking-wide text-white">JUAC EvaSUE Fellowship</p>
              <p className="mt-1 text-sm text-slate-400">Stay Connected</p>
            </div>
            <div className="text-center">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Connect with us</h2>
              <nav aria-label="Social media" className="mt-3 flex items-center justify-center gap-3">
                {socialLinks.map(({ name, href, icon, className }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    title={name}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition duration-200 hover:-translate-y-0.5 hover:border-white/30 ${className}`}
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} JUAC EvaSUE Fellowship. All Rights Reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
