"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ChevronLeft, ChevronRight, Eye, Heart, ShoppingCart } from "lucide-react";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

export function TrendingCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <Container>
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">Trending Now</h2>
            <p className="text-lg text-stone-600 max-w-xl">
              Discover the most loved pieces by our community.
            </p>
          </motion.div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-[#0F5A37] hover:text-white hover:border-[#0F5A37] transition-all duration-300 shadow-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-[#0F5A37] hover:text-white hover:border-[#0F5A37] transition-all duration-300 shadow-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="overflow-hidden -mx-4 px-4 py-8" ref={emblaRef}>
            <div className="flex gap-6">
              {products.map((product) => (
                <div key={product.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] min-w-0">
                  <div className="group relative bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-premium border border-stone-50 transition-all duration-300 h-full flex flex-col hover:-translate-y-2">
                    <div className="relative h-80 overflow-hidden bg-stone-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <button className="w-12 h-12 rounded-full bg-white text-stone-900 flex items-center justify-center hover:bg-[#0F5A37] hover:text-white transition-colors shadow-lg">
                          <Heart className="w-5 h-5" />
                        </button>
                        <button className="w-12 h-12 rounded-full bg-white text-stone-900 flex items-center justify-center hover:bg-[#0F5A37] hover:text-white transition-colors shadow-lg">
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                        <button className="w-12 h-12 rounded-full bg-white text-stone-900 flex items-center justify-center hover:bg-[#0F5A37] hover:text-white transition-colors shadow-lg">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-stone-900 mb-2">{product.name}</h3>
                      </div>
                      <div className="flex items-center gap-3 mt-4">
                        <span className="text-xl font-bold text-[#0F5A37]">${product.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  index === selectedIndex ? "bg-[#0F5A37] w-8" : "bg-stone-300"
                )}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
