import React from "react";

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
    { src: "/gallery/download (10).jpeg", alt: "Campus Outreach Group" },
    { src: "/gallery/images.jpeg", alt: "Student Prayer Circle" },
    { src: "/gallery/images (1).jpeg", alt: "Team Ministry Leadership" }
  ];

  // We duplicate the array to guarantee a seamless, gap-free loop cycle
  const infiniteLoopImages = [...galleryImages, ...galleryImages];

  return (
    <section className="w-full bg-white py-16 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center lg:text-left">
        <h2 className="text-2xl font-bold text-fellowship-blue tracking-tight flex items-center justify-center lg:justify-start gap-2">
          <span className="w-2.5 h-6 bg-fellowship-gold rounded-full inline-block"></span>
         ለ እግዝዓብሄር ክብርን ሲጡ፤ ግርማው በ እስራአል ላይ፤ ኃይሉም በደመናት ላይ ነው።
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Explore scenes from our weekly gatherings, prayer groups, and vibrant community life at JUAC.
        </p>
      </div>

      {/* Infinite Horizontal Carousel Strip Track Container */}
      <div className="hover-pause relative w-full overflow-hidden bg-slate-900 py-6 shadow-inner flex">
        {/* Sliding Flex Track */}
        <div className="flex w-max animate-marquee gap-6 px-3">
          {infiniteLoopImages.map((image, index) => (
            <div 
              key={index}
              className="relative w-120 h-100 md:w-80 md:h-90 rounded-xl overflow-hidden shadow-md group border border-slate-800 flex-shrink-0"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay Caption Display */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-semibold tracking-wide">
                  {image.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}