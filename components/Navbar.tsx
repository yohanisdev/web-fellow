"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const links = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About us" },
        { href: "/resources", label: "Resources" },
        { href: "/leaders", label: "Leaders" },
        { href: "/bible", label: "Bible" },
    ];

    const linkClass = (href: string) =>
        `relative rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fellowship-blue ${pathname === href ? "text-fellowship-blue" : "text-slate-700 hover:text-slate-950"}`;

    function movePointerLight(event: React.MouseEvent<HTMLDivElement>) {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
        event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    }

    return (
        <header className="sticky top-0 z-50 bg-[linear-gradient(110deg,#09152e_0%,#111b2d_52%,#02050c_100%)] px-3 py-2 text-slate-900 shadow-md sm:px-5">
            <div
                onMouseMove={movePointerLight}
                className="group/nav relative mx-auto grid h-14 max-w-6xl grid-cols-[1fr_auto] items-center overflow-hidden rounded-full border border-white/70 bg-white/70 px-4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition duration-300 hover:border-slate-400/80 hover:shadow-[0_18px_48px_-14px_rgba(0,0,0,0.55)] sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-7 motion-reduce:transition-none"
                style={{
                    backgroundImage: "radial-gradient(230px circle at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(15, 23, 42, 0.22), transparent 78%), linear-gradient(rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.78))",
                }}
            >
                <Link href="/" aria-label="JUAC EvaSUE Fellowship home" className="flex min-w-0 items-center gap-2.5 justify-self-start rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fellowship-blue">
                    <svg
                        id="toolbar-logo"
                        aria-hidden="true"
                        className="h-10 w-10 shrink-0 drop-shadow-sm"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 740 740"
                    >
                        <circle cx="370" cy="370" r="370" fill="#111b2d" />
                        <g>
                            <path fill="#d6a019" d="M673.58,552.24,637.72,509a3.58,3.58,0,0,1-.82-2.28V403.57a3.57,3.57,0,0,1,3.58-3.57H745.33a3.57,3.57,0,0,1,3.57,3.57V577.31a3.56,3.56,0,0,1-1.31,2.76l-36.85,30.15a3.58,3.58,0,0,1-5.84-2.76V492.57a3.57,3.57,0,0,1,3.58-3.57H734.9V464.6a3.57,3.57,0,0,0-3.57-3.58H708.48a3.57,3.57,0,0,1-3.58-3.57V429.57a3.57,3.57,0,0,0-3.57-3.57H683.48a3.57,3.57,0,0,0-3.58,3.57v27.88a3.57,3.57,0,0,1-3.57,3.57H655.48a3.58,3.58,0,0,0-3.58,3.58v20.83a3.57,3.57,0,0,0,3.58,3.57h20.85a3.57,3.57,0,0,1,3.57,3.57V550A3.57,3.57,0,0,1,673.58,552.24Z" transform="translate(-151 -177)" />
                        </g>
                        <g>
                            <path fill="#d6a019" d="M650.4,598.5a243.32,243.32,0,0,0-64-21c-29.78-5.36-57.73-5.7-75.5-3.5-56.67-84.67-110.83-167.83-167.5-252.5,17.4-7.2,62.07-22.95,118-12a205.55,205.55,0,0,1,92,44,113.56,113.56,0,0,1,24-16c10.69-5.29,21.53-8.52,37-11,29.48-4.72,57.73-3.81,78-2l7,22a220.58,220.58,0,0,0-42-7c-12.14-.83-27.86-1.91-47,2a142.6,142.6,0,0,0-53,23l35,67-49-70a273.2,273.2,0,0,0-169-23l152,219a155.22,155.22,0,0,1,48,2C612.56,567.15,638.28,587.44,650.4,598.5Z" transform="translate(-151 -177)" />
                            <path fill="#d6a019" d="M620.9,611c-15.64-4.58-43.38-10.39-71-10-26.24.37-48.35,4.8-63.5,9.5l-201-262,60-2-29,10,185,232a128.56,128.56,0,0,1,43-5C579.45,585.42,610,603,620.9,611Z" transform="translate(-151 -177)" />
                        </g>
                    </svg>
                    <span className="truncate text-sm font-extrabold leading-tight tracking-tight text-fellowship-blue sm:text-base">JUAC EvaSUE <span className="hidden sm:inline">Fellowship</span></span>
                </Link>

                <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
                    {links.map(({ href, label }) => (
                        <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className={`${linkClass(href)} hover:bg-slate-200/80`}>
                            {label}
                            {pathname === href && <span aria-hidden="true" className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-fellowship-gold" />}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2 justify-self-end">
                    <Link href="/admin" className="hidden rounded-full bg-fellowship-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-fellowship-blue-dark hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fellowship-blue motion-reduce:transform-none sm:inline-flex">
                        Sign in
                    </Link>
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen((open) => !open)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/60 text-slate-700 transition hover:border-blue-200 hover:bg-white hover:text-fellowship-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fellowship-blue lg:hidden"
                        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-navigation"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            <div id="mobile-navigation" className={`${isMobileMenuOpen ? "grid grid-rows-[1fr]" : "grid grid-rows-[0fr]"} mx-auto mt-2 max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-[0_14px_38px_-14px_rgba(0,0,0,0.48)] backdrop-blur-2xl transition-[grid-template-rows] duration-200 lg:hidden`}>
                <div className="min-h-0 overflow-hidden">
                    <nav aria-label="Mobile navigation" className="flex flex-col gap-1 p-3 sm:p-4">
                        {links.map(({ href, label }) => (
                            <Link key={href} href={href} onClick={() => setIsMobileMenuOpen(false)} aria-current={pathname === href ? "page" : undefined} className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${pathname === href ? "bg-blue-50 text-fellowship-blue" : "text-slate-700 hover:bg-slate-200/80 hover:text-slate-950"}`}>
                                {label}
                            </Link>
                        ))}
                        <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="mt-2 rounded-full bg-fellowship-blue px-4 py-3 text-center text-sm font-semibold text-white hover:bg-fellowship-blue-dark">Sign in</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
