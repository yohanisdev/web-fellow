"use client";

import React from "react";
import { useEffect, useState } from "react";

export default function BelongSection() {
  // A collection of images reflecting fellowship life
  const galleryImages = [
    { src: "/gallery/download (1).jpeg", alt: "i blong to jessus" },
    { src: "/gallery/download (2).jpeg", alt: "i blong to jessus" },
    { src: "/gallery/download (3).jpeg", alt: "i blong to jessus" },
    { src: "/gallery/download (4).jpeg", alt: "i blong to jessus" },
    { src: "/gallery/download (5).jpeg", alt: "i blong to jessus" },
    { src: "/gallery/download (6).jpeg", alt: "i blong to jessus" },
    { src: "/gallery/download (7).jpeg", alt: "i blong to jessus" },
    { src: "/gallery/download (8).jpeg", alt: "The King Of King JESUS" },
    { src: "/gallery/download (9).jpeg", alt: "i blong to jessus" },
    { src: "/gallery/download (10).jpeg", alt: "Lord Jesus Christ" },
    { src: "/gallery/images.jpeg", alt: "Student Prayer Circle" },
    { src: "/gallery/images (1).jpeg", alt: "Team Ministry Leadership" }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % galleryImages.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [galleryImages.length]);

  const showPrevious = () => setActiveIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % galleryImages.length);

  return (
    <section className="w-full overflow-hidden border-t border-slate-100 bg-white py-16 sm:py-20">
      <div className="mx-auto mb-10 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-fellowship-gold">Our community</p>
        <h2 className="mx-auto max-w-4xl text-xl font-bold leading-relaxed tracking-tight text-fellowship-blue sm:text-2xl">
          ለ እግዝዓብሄር ክብርን ሲጡ፤ ግርማው በ እስራአል ላይ፤ ኃይሉም በደመናት ላይ ነው።
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
        ክብር ለ እየሱስ ይሁን
        </p>
      </div>

      <div
        className="relative mx-auto flex h-[310px] max-w-7xl items-center justify-center overflow-hidden px-4 sm:h-[390px]"
        aria-label="Fellowship photo stories"
        aria-roledescription="carousel"
      >
        {galleryImages.map((image, index) => {
          const rawOffset = index - activeIndex;
          const offset = rawOffset > galleryImages.length / 2
            ? rawOffset - galleryImages.length
            : rawOffset < -galleryImages.length / 2
              ? rawOffset + galleryImages.length
              : rawOffset;
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          return (
            <div
              key={image.src}
              aria-hidden={!isActive}
              className={`absolute left-1/2 overflow-hidden bg-slate-100 shadow-[0_22px_60px_-20px_rgba(15,23,42,0.45)] transition-[transform,width,height,border-radius,filter,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "h-[210px] w-[min(76vw,500px)] rounded-2xl sm:h-[300px]" : "h-28 w-28 rounded-full sm:h-40 sm:w-40"} ${isVisible ? "opacity-100" : "pointer-events-none opacity-0"} ${isActive ? "z-20 brightness-100 blur-0" : "z-10 brightness-75 blur-[2px]"}`}
              style={{ transform: `translate3d(calc(-50% + ${offset * 70}%), 0, 0) scale(${isActive ? 1 : 0.82})` }}
            >
              <img
                src={image.src}
                alt={isActive ? image.alt : ""}
                loading={Math.abs(offset) <= 1 ? "eager" : "lazy"}
                className="h-full w-full object-contain"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`} />
              <p className={`absolute inset-x-5 bottom-4 text-sm font-semibold text-white transition-opacity duration-500 sm:bottom-5 sm:text-base ${isActive ? "opacity-100" : "opacity-0"}`}>
                {image.alt}
              </p>
            </div>
          );
        })}

        <button
          type="button"
          onClick={showPrevious}
          aria-label="Show previous photo"
          className="absolute left-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/85 text-slate-700 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fellowship-blue sm:left-8"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Show next photo"
          className="absolute right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/85 text-slate-700 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fellowship-blue sm:right-8"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
        </button>

        <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 gap-1.5" aria-label={`Photo ${activeIndex + 1} of ${galleryImages.length}`}>
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-6 bg-fellowship-blue" : "w-1.5 bg-slate-300 hover:bg-slate-400"}`}
            />
          ))}
        </div>
      </div>
      <p className="mt-7 text-center text-xs font-medium tracking-wide text-slate-400">Growing together in faith and fellowship</p>
    </section>
  );
}
