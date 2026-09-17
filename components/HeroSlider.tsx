import { useState, useEffect, useCallback } from "react";
import { ChevronRight } from "lucide-react";

const slides = [
  {
    id: "01",
    label: "BUSINESS SERVICES",
    title: "The information you need to hire fast, secure and safe, serving Frisco, TX and businesses nationwide",
    cta: "Get Quote",
    image: "/images/hero-business-services.webp",
  },
  {
    id: "02",
    label: "DIGITAL SOLUTIONS",
    title: "Data Security and Industry Compliance for Your Business",
    cta: "Get Quote",
    image: "/images/hero-digital-solutions.webp",
  },
  {
    id: "03",
    label: "BACKGROUND SCREENING",
    title: "Safely Fulfill and Hire the right people for your business",
    cta: "Get Quote",
    image: "/images/hero-background-screening.webp",
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
    <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: 600, overflow: "hidden", background: "#0f172a" }}>
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          style={{ position: "absolute", inset: 0, opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0, transition: "opacity 0.7s ease" }}
        >
          <img
            src={slide.image}
            alt={slide.label}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: i === current ? "scale(1.03)" : "scale(1)", transition: "transform 6s ease-out" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.55) 50%, rgba(15,23,42,0.25) 100%)",
            }}
          />
          <div style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", alignItems: "center" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%" }}>
              <div style={{ maxWidth: 680 }}>
                <p
                  style={{
                    color: "#22c55e",
                    fontFamily: "'Montserrat', sans-serif",
                    letterSpacing: "0.15em",
                    fontWeight: 700,
                    fontSize: 14,
                    marginBottom: 16,
                    opacity: i === current ? 1 : 0,
                    transform: i === current ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
                  }}
                >
                  {slide.label}
                </p>
                <h1
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: "clamp(32px, 5vw, 60px)",
                    lineHeight: 1.1,
                    margin: "0 0 32px",
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
                    className="btn-green"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#22c55e", color: "#fff", textDecoration: "none", fontWeight: 700, padding: "12px 32px" }}
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
      <div style={{ position: "absolute", bottom: 32, right: 32, zIndex: 20, display: "flex", gap: 12 }}>
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => goTo(i)}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: "0.75rem",
              color: i === current ? "#22c55e" : "rgba(255,255,255,0.5)",
              borderBottom: i === current ? "2px solid #22c55e" : "2px solid transparent",
              paddingBottom: "2px",
              letterSpacing: "0.05em",
              background: "transparent",
              borderLeft: 0,
              borderRight: 0,
              borderTop: 0,
              cursor: "pointer",
            }}
            aria-label={`Go to slide ${slide.id}`}
          >
            {slide.id}
          </button>
        ))}
      </div>
    </section>
  );
}
