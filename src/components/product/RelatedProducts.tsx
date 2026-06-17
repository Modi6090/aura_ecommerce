"use client";

import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
  className?: string;
}

export function RelatedProducts({ 
  products, 
  title = "You Might Also Like",
  className 
}: RelatedProductsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!products || products.length === 0) return null;

  return (
    <div className={cn("w-full py-12", className)}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-stone-900">{title}</h2>
        
        <div className="flex gap-2">
          <button 
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-[#0F5A37] hover:text-white hover:border-[#0F5A37] transition-all"
            aria-label="Previous items"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={scrollNext}
            className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-[#0F5A37] hover:text-white hover:border-[#0F5A37] transition-all"
            aria-label="Next items"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 pb-4">
          {products.map((product) => (
            <div key={product.id} className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_23%] min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
