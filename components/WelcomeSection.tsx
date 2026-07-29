"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Add your professional background images here
const BACKGROUND_IMAGES = [
  "/welcome/IMG_20260708_134447_415.jpg", // Example: Campus/Education theme
  "/welcome/photo_2026-07-08_21-00-44.jpg", // Example: Fellowship/Group theme
  "/welcome/photo_2026-07-08_21-01-01.jpg"  // Example: University building theme
];

export default function WelcomeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 1. Handle Background Slideshow Interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 5000); // Changes image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  // 2. Core GSAP Animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const mainTimeline = gsap.timeline();

      // Core Background Circle Entrance Animation
      mainTimeline.fromTo("#bg-circle", 
        { scale: 0, opacity: 0, transformOrigin: "50% 50%" },
        { scale: 1, opacity: 1, rotation: 360, duration: 1.2, ease: "expo.out" }
      );

      // Sequential Staggered Pop for Emblem Components
      mainTimeline.fromTo(".emblem-path",
        { scale: 1.6, opacity: 0, filter: "blur(10px) brightness(2)", transformOrigin: "50% 50%" },
        { scale: 1, opacity: 1, filter: "blur(0px) brightness(1)", duration: 0.9, ease: "power3.out", stagger: 0.15 },
        "-=0.6"
      );

      // Staggered Typing Reveal for Alphabet Characters
      mainTimeline.fromTo(".text-path",
        { y: -25, opacity: 0, scale: 0.6, transformOrigin: "50% 50%" },
        { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.45, ease: "back.out(2)" },
        "-=0.4"
      );

      // Subtle Slide Reveal for Descriptions
      mainTimeline.fromTo(".welcome-text-fade",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.15, ease: "power2.out" },
        "-=0.3"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-900 overflow-hidden flex flex-col items-center justify-center min-h-[75vh]"
    >
      {/* ================= BACKGROUND SLIDESHOW LAYER ================= */}
      <div className="absolute inset-0 z-0">
        {BACKGROUND_IMAGES.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } transform duration-[2000ms]`} // Added a slight scale transition for extra elegance
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      {/* ================= PROFESSIONAL BLUE OVERLAY LAYER ================= */}
      {/* Combines a rich dark blue/slate tone with low opacity (85%) to let images through elegantly */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#09152e]/90 via-[#050c1b]/85 to-[#02050c]/95 mix-blend-multiply" />

      {/* ================= CONTENT LAYER ================= */}
      {/* Added relative and z-20 to ensure text and SVGs stay cleanly above the background layer */}
      <div className="relative z-20 max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-around gap-12">
        
        {/* SVG Layout Shell */}
        <div className="w-full max-w-[320px] md:max-w-[420px] flex justify-center items-center">
          <svg 
            id="Layer_2" 
            className="w-full h-auto filter drop-shadow-[0_0_25px_rgba(214,160,25,0.15)] drop-shadow-[0_15px_40px_rgba(0,0,0,0.7)]" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 740 740"
          >
            <circle 
              id="bg-circle" 
              className="opacity-0 cursor-pointer transition-transform duration-500 hover:scale-[1.04]" 
              fill="#111b2d" 
              cx="370" 
              cy="370" 
              r="370"
            />
            
            {/* Native Emblem Vectors */}
            <path 
              className="emblem-path opacity-0 cursor-pointer transition-all duration-300 hover:scale-[1.05] origin-[50%_50%]" 
              fill="#d6a019" 
              d="M650.4,598.5a243.32,243.32,0,0,0-64-21c-29.78-5.36-57.73-5.7-75.5-3.5-56.67-84.67-110.83-167.83-167.5-252.5,17.4-7.2,62.07-22.95,118-12a205.55,205.55,0,0,1,92,44,113.56,113.56,0,0,1,24-16c10.69-5.29,21.53-8.52,37-11,29.48-4.72,57.73-3.81,78-2l7,22a220.58,220.58,0,0,0-42-7c-12.14-.83-27.86-1.91-47,2a142.6,142.6,0,0,0-53,23l35,67-49-70a273.2,273.2,0,0,0-169-23l152,219a155.22,155.22,0,0,1,48,2C612.56,567.15,638.28,587.44,650.4,598.5Z" 
              transform="translate(-151 -177)"
              style={{ transformBox: "fill-box" }}
            />
            <path 
              className="emblem-path opacity-0 cursor-pointer transition-all duration-300 hover:scale-[1.06] hover:drop-shadow-[0_0_15px_rgba(214,160,25,0.6)] origin-[50%_50%]" 
              fill="#d6a019" 
              d="M673.58,552.24,637.72,509a3.58,3.58,0,0,1-.82-2.28V403.57a3.57,3.57,0,0,1,3.58-3.57H745.33a3.57,3.57,0,0,1,3.57,3.57V577.31a3.56,3.56,0,0,1-1.31,2.76l-36.85,30.15a3.58,3.58,0,0,1-5.84-2.76V492.57a3.57,3.57,0,0,1,3.58-3.57H734.9V464.6a3.57,3.57,0,0,0-3.57-3.58H708.48a3.57,3.57,0,0,1-3.58-3.57V429.57a3.57,3.57,0,0,0-3.57-3.57H683.48a3.57,3.57,0,0,0-3.58,3.57v27.88a3.57,3.57,0,0,1-3.57,3.57H655.48a3.58,3.58,0,0,0-3.58,3.58v20.83a3.57,3.57,0,0,0,3.58,3.57h20.85a3.57,3.57,0,0,1,3.57,3.57V550A3.57,3.57,0,0,1,673.58,552.24Z" 
              transform="translate(-151 -177)"
              style={{ transformBox: "fill-box" }}
            />
            <path 
              className="emblem-path opacity-0 cursor-pointer transition-all duration-500 hover:-translate-y-2 origin-[50%_50%]" 
              fill="#d6a019" 
              d="M620.9,611c-15.64-4.58-43.38-10.39-71-10-26.24.37-48.35,4.8-63.5,9.5l-201-262,60-2-29,10,185,232a128.56,128.56,0,0,1,43-5C579.45,585.42,610,603,620.9,611Z" 
              transform="translate(-151 -177)"
              style={{ transformBox: "fill-box" }}
            />
            
            {/* Alphabet Word Mapping Characters Array */}
            {[
              "M300.37,738.83A24.49,24.49,0,0,1,290,736.62a19.56,19.56,0,0,1-7.86-6.46l6.29-7.48a17.68,17.68,0,0,0,5.4,5.1,12.64,12.64,0,0,0,6.5,1.7q9.18,0,9.18-11V687.83H288.3v-9.35h32.13v39.44q0,10.55-5.1,15.73T300.37,738.83Z",
              "M361.49,738.83q-12.17,0-19.08-6.88t-6.93-20V678.48h11v33.15q0,9.18,4,13.35t11.18,4.16c4.81,0,8.53-1.38,11.13-4.16s3.91-7.23,3.91-13.35V678.48h10.88V712q0,13.1-6.92,20T361.49,738.83Z",
              "M393.45,738l26.77-59.5H431.1L458,738H446.32l-22.95-53.63h4.42l-23,53.63Zm12.32-13.77,3.06-8.67h32.05l3,8.67Z",
              "M492.13,738.83a34.59,34.59,0,0,1-12.66-2.25,29.86,29.86,0,0,1-16.75-16.11,32.66,32.66,0,0,1,0-24.48,29.61,29.61,0,0,1,6.72-9.69,30.4,30.4,0,0,1,10.11-6.41,36.68,36.68,0,0,1,26,.25,26.29,26.29,0,0,1,10.2,7.44l-7.14,6.71a22.42,22.42,0,0,0-7.31-5.22,21.23,21.23,0,0,0-8.58-1.75,23,23,0,0,0-8.54,1.53,19.9,19.9,0,0,0-6.72,4.34,20.12,20.12,0,0,0-4.46,6.63,22.67,22.67,0,0,0,0,16.83,20.12,20.12,0,0,0,4.46,6.63,19.87,19.87,0,0,0,6.72,4.33,23,23,0,0,0,8.54,1.53,21.23,21.23,0,0,0,8.58-1.74,21.86,21.86,0,0,0,7.31-5.31l7.14,6.71a26.69,26.69,0,0,1-10.2,7.48A34.17,34.17,0,0,1,492.13,738.83Z",
              "M525.62,738v-59.5h43.44v9.35H536.67v40.8h33.58V738Zm10.2-25.67v-9.09H565.4v9.09Z",
              "M609.77,738.83a34.59,34.59,0,0,1-12.66-2.25,29.86,29.86,0,0,1-16.75-16.11,32.66,32.66,0,0,1,0-24.48,29.61,29.61,0,0,1,6.72-9.69,30.4,30.4,0,0,1,10.11-6.41,36.68,36.68,0,0,1,26,.25,26.43,26.43,0,0,1,10.2,7.44l-7.14,6.71a22.42,22.42,0,0,0-7.31-5.22,21.23,21.23,0,0,0-8.58-1.75,23.06,23.06,0,0,0-8.55,1.53,19.89,19.89,0,0,0-11.17,11,22.67,22.67,0,0,0,0,16.83,19.83,19.83,0,0,0,11.17,11,23.06,23.06,0,0,0,8.55,1.53A21.23,21.23,0,0,0,619,727.4,21.86,21.86,0,0,0,626.31,722l7.14,6.71a26.84,26.84,0,0,1-10.2,7.48A34.17,34.17,0,0,1,609.77,738.83Z",
              "M661.28,738.83a44,44,0,0,1-13.3-2,30.1,30.1,0,0,1-10.16-5.15l3.83-8.58a30.7,30.7,0,0,0,8.84,4.67,31.94,31.94,0,0,0,10.79,1.87,23.25,23.25,0,0,0,7.57-1,9.1,9.1,0,0,0,4.25-2.76,6.29,6.29,0,0,0,1.36-4,5.46,5.46,0,0,0-2-4.38,14.49,14.49,0,0,0-5-2.63q-3.11-1-6.89-1.79c-2.52-.54-5-1.2-7.56-2a33.49,33.49,0,0,1-6.93-3,13.58,13.58,0,0,1-7-12.71,16.08,16.08,0,0,1,2.59-8.88,17.84,17.84,0,0,1,7.9-6.46q5.32-2.43,13.48-2.43A42.61,42.61,0,0,1,673.69,679a30.68,30.68,0,0,1,9.18,3.91l-3.48,8.59a32.85,32.85,0,0,0-8.25-3.53,31.47,31.47,0,0,0-8.16-1.15,20.84,20.84,0,0,0-7.39,1.11,9,9,0,0,0-4.21,2.93,6.76,6.76,0,0,0-1.32,4,5.52,5.52,0,0,0,1.92,4.38,13.45,13.45,0,0,0,5,2.59c2.07.62,4.38,1.22,6.93,1.78s5.07,1.24,7.56,2a33,33,0,0,1,6.89,3,14.55,14.55,0,0,1,5,4.84,14.1,14.1,0,0,1,1.92,7.69,16,16,0,0,1-2.59,8.8,17.83,17.83,0,0,1-8,6.46Q669.45,738.84,661.28,738.83Z",
              "M696.3,738v-59.5h43.44v9.35H707.35V738Zm10.2-22.86v-9.18h29.58v9.18Z"
            ].map((dPath, i) => (
              <path 
                key={i} 
                className="text-path opacity-0 cursor-pointer origin-[50%_50%] transition-all duration-200 hover:scale-[1.28] hover:-translate-y-1.5 hover:fill-[#fff7d6]"
                fill="#d6a019" 
                d={dPath} 
                transform="translate(-151 -177)"
                style={{ transformBox: "fill-box" }}
              />
            ))}
          </svg>
        </div>

        {/* Vision Announcement Text Hook */}
        <div className="flex-1 text-center lg:text-left max-w-2xl px-4">
          <h1 className="welcome-text-fade opacity-0 text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Welcome to <span className="text-[#d6a019]">JUAC EvaSUE</span>
          </h1>
          <p className="welcome-text-fade opacity-0 mt-5 text-sm md:text-base text-slate-200 leading-relaxed max-w-xl mx-auto lg:mx-0 drop-shadow-sm">
            የ ሰላም አምላክ ራሱ ሁለንተናቹን ይቀድስ ፤ መንፈሳቹ ፤ነፍሳቹና ስጋቹ ጌታችን እየሱስ ክርስቶስ በምመጣበት ግዘ ያለ ነቀፋ ይጠበቁ።
          </p>
        </div>

      </div>
    </div>
  );
}