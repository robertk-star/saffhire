/*
 * HeroSlider Component SaffHire Background Screening
 * Design: Full-viewport hero with 3 slides, dark overlay, green CTA buttons
 * Slide indicators: 01, 02, 03 (bottom right)
 */

import { useState, useEffect, useCallback } from "react";
import { ChevronRight } from "lucide-react";

const slides = [
  {
    id: "01",
    label: "BUSINESS SERVICES",
    title: "The information you need to hire fast, secure and safe, serving Frisco, TX and businesses nationwide",
    cta: "Get Quote",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/hero-business-services-LxTs7NABnHvadLukN46vhX.webp",
  },
  {
    id: "02",
    label: "DIGITAL SOLUTIONS",
    title: "Data Security and Industry Compliance for Your Business",
    cta: "Get Quote",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/hero-digital-solutions-SooLb3FdgFGDAYyqNJsNt2.webp",
  },
  {
    id: "03",
    label: "BACKGROUND SCREENING",
    title: "Safely Fulfill and Hire the right people for your business",
    cta: "Get Quote",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/hero-background-screening-ToRFRtdzTw9rE5tadCJNaf.webp",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 800);
    },
    [animating, current]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [current, goTo]);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: 600 }}>
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.label}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: i === current ? "scale(1.03)" : "scale(1)", transition: "transform 6s ease-out" }}
          />
          {/* Dark Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.55) 50%, rgba(15,23,42,0.25) 100%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <p
                  className="text-sm font-bold tracking-widest mb-4"
                  style={{
                    color: "#22c55e",
                    fontFamily: "'Montserrat', sans-serif",
                    letterSpacing: "0.15em",
                    opacity: i === current ? 1 : 0,
                    transform: i === current ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
                  }}
                >
                  {slide.label}
                </p>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-8"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    opacity: i === current ? 1 : 0,
                    transform: i === current ? "translateY(0)" : "translateY(30px)",
                    transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
                  }}
                >
                  {slide.title}
                </h1>
                <div
                  style={{
                    opacity: i === current ? 1 : 0,
                    transform: i === current ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
                  }}
                >
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 btn-green rounded-sm text-base px-8 py-3"
                  >
                    {slide.cta}
                    <ChevronRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => goTo(i)}
            className="flex items-center justify-center transition-all duration-300"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: "0.75rem",
              color: i === current ? "#22c55e" : "rgba(255,255,255,0.5)",
              borderBottom: i === current ? "2px solid #22c55e" : "2px solid transparent",
              paddingBottom: "2px",
              letterSpacing: "0.05em",
            }}
            aria-label={`Go to slide ${slide.id}`}
          >
            {slide.id}
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div
          className="w-px h-12 animate-pulse"
          style={{ background: "linear-gradient(to bottom, transparent, #22c55e)" }}
        />
      </div>
    </section>
  );
}
