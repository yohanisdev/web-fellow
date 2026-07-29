import type { Metadata } from "next";
import "./globals.css";

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
        
        {/* Global Navigation Shell */}
        <header className="bg-fellowship-blue text-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            {/* Logo on the left */}
            <div className="flex items-center gap-3">
              <svg 
                id="toolbar-logo" 
                className="w-10 h-10 filter drop-shadow(0px 2px 4px rgba(0,0,0,0.3))" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 740 740"
              >
                <circle cx="370" cy="370" r="370" fill="#111b2d"/>
                <g>
                  <path fill="#d6a019" d="M673.58,552.24,637.72,509a3.58,3.58,0,0,1-.82-2.28V403.57a3.57,3.57,0,0,1,3.58-3.57H745.33a3.57,3.57,0,0,1,3.57,3.57V577.31a3.56,3.56,0,0,1-1.31,2.76l-36.85,30.15a3.58,3.58,0,0,1-5.84-2.76V492.57a3.57,3.57,0,0,1,3.58-3.57H734.9V464.6a3.57,3.57,0,0,0-3.57-3.58H708.48a3.57,3.57,0,0,1-3.58-3.57V429.57a3.57,3.57,0,0,0-3.57-3.57H683.48a3.57,3.57,0,0,0-3.58,3.57v27.88a3.57,3.57,0,0,1-3.57,3.57H655.48a3.58,3.58,0,0,0-3.58,3.58v20.83a3.57,3.57,0,0,0,3.58,3.57h20.85a3.57,3.57,0,0,1,3.57,3.57V550A3.57,3.57,0,0,1,673.58,552.24Z" transform="translate(-151 -177)"/>
                </g>
                <g>
                  <path fill="#d6a019" d="M650.4,598.5a243.32,243.32,0,0,0-64-21c-29.78-5.36-57.73-5.7-75.5-3.5-56.67-84.67-110.83-167.83-167.5-252.5,17.4-7.2,62.07-22.95,118-12a205.55,205.55,0,0,1,92,44,113.56,113.56,0,0,1,24-16c10.69-5.29,21.53-8.52,37-11,29.48-4.72,57.73-3.81,78-2l7,22a220.58,220.58,0,0,0-42-7c-12.14-.83-27.86-1.91-47,2a142.6,142.6,0,0,0-53,23l35,67-49-70a273.2,273.2,0,0,0-169-23l152,219a155.22,155.22,0,0,1,48,2C612.56,567.15,638.28,587.44,650.4,598.5Z" transform="translate(-151 -177)"/>
                  <path fill="#d6a019" d="M620.9,611c-15.64-4.58-43.38-10.39-71-10-26.24.37-48.35,4.8-63.5,9.5l-201-262,60-2-29,10,185,232a128.56,128.56,0,0,1,43-5C579.45,585.42,610,603,620.9,611Z" transform="translate(-151 -177)"/>
                </g>
              </svg>
              <div className="font-bold text-lg tracking-wide text-fellowship-gold-light">
                JUAC-EvaSUE
              </div>
            </div>

            <nav className="hidden md:flex space-x-8 text-sm font-medium">
              <a href="/" className="hover:text-fellowship-gold-light transition-colors">Home</a>
              <a href="/about" className="hover:text-fellowship-gold-light transition-colors">About Us</a>
              <a href="/resources" className="hover:text-fellowship-gold-light transition-colors">Resources</a>
              <a href="/leaders" className="hover:text-fellowship-gold-light transition-colors">Leaders</a>
              <a href="/bible" className="hover:text-fellowship-gold-light transition-colors">Bible</a>
            </nav>

            <div>
              <a href="/admin" className="text-sm bg-fellowship-gold hover:bg-fellowship-gold-dark text-white px-3 py-1.5 rounded transition-colors font-medium">
                Sign in
              </a>
            </div>
          </div>
        </header>

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