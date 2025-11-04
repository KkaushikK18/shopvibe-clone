import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
    title: "Latest Electronics",
    subtitle: "Up to 50% off on smartphones & laptops",
    cta: "Shop Now",
    link: "/products?category=Electronics",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    title: "Fashion Deals",
    subtitle: "Trending styles at unbeatable prices",
    cta: "Explore Fashion",
    link: "/products?category=Fashion",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80",
    title: "Home & Kitchen",
    subtitle: "Transform your living space",
    cta: "Discover More",
    link: "/products?category=Home & Kitchen",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&q=80",
    title: "Gaming Paradise",
    subtitle: "Latest consoles and accessories",
    cta: "Start Gaming",
    link: "/products?category=Electronics",
  },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 drop-shadow-md">
                  {slide.subtitle}
                </p>
                <a href={slide.link}>
                  <Button size="lg" className="bg-primary hover:bg-primary-hover text-white font-semibold">
                    {slide.cta}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-primary w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
