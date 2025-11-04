import { X } from "lucide-react";
import { useState } from "react";

export const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary to-orange-600 text-white py-2 px-4 relative">
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-base font-medium">
          🎉 Great Indian Festival Sale - Up to 80% OFF on Electronics, Fashion & More! 
          <span className="ml-2 font-bold underline cursor-pointer">Shop Now</span>
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-white/20 rounded-full p-1"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
