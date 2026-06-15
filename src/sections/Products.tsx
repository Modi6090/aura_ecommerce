"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Star, Heart, Eye, ShoppingBag, Maximize2 } from "lucide-react";

const tabs = ["All Products", "Latest Products", "Best Sellers", "Featured Products"];

const products = [
  // Latest Products
  {
    id: 1,
    name: "Wooden Sofa Chair",
    category: "Chair",
    price: 80.00,
    originalPrice: 160.00,
    rating: 4.9,
    badge: "50% off",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600",
    hasTimer: true,
    tab: "Latest Products"
  },
  {
    id: 2,
    name: "Circular Sofa Chair",
    category: "Chair",
    price: 108.00,
    originalPrice: 120.00,
    rating: 5.0,
    badge: "10% off",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600",
    tab: "Latest Products"
  },
  {
    id: 3,
    name: "Wooden Nightstand",
    category: "Nightstand",
    price: 54.00,
    originalPrice: 60.00,
    rating: 4.8,
    badge: "10% off",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=600",
    tab: "Latest Products"
  },
  {
    id: 4,
    name: "Bean Bag Chair",
    category: "Chair",
    price: 72.00,
    originalPrice: 80.00,
    rating: 4.7,
    badge: "10% off",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600",
    tab: "Latest Products"
  },
  // Best Sellers
  {
    id: 5,
    name: "Velvet Accent Chair",
    category: "Chair",
    price: 180.00,
    originalPrice: 240.00,
    rating: 4.9,
    badge: "25% off",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600",
    tab: "Best Sellers"
  },
  {
    id: 6,
    name: "Minimalist Coffee Table",
    category: "Table",
    price: 150.00,
    originalPrice: 200.00,
    rating: 4.8,
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600",
    tab: "Best Sellers"
  },
  {
    id: 7,
    name: "Modern Shelf Unit",
    category: "Storage",
    price: 90.00,
    originalPrice: 110.00,
    rating: 4.6,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600",
    tab: "Best Sellers"
  },
  {
    id: 8,
    name: "Tufted Chesterfield Sofa",
    category: "Sofa",
    price: 650.00,
    originalPrice: 800.00,
    rating: 5.0,
    badge: "15% off",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600",
    tab: "Best Sellers"
  },
  // Featured Products
  {
    id: 9,
    name: "Industrial Pendant Light",
    category: "Lighting",
    price: 45.00,
    originalPrice: 60.00,
    rating: 4.7,
    badge: "Featured",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600",
    tab: "Featured Products"
  },
  {
    id: 10,
    name: "Oak Dining Table",
    category: "Table",
    price: 320.00,
    originalPrice: 400.00,
    rating: 4.9,
    badge: "Featured",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=600",
    tab: "Featured Products"
  },
  {
    id: 11,
    name: "Minimalist Armchair",
    category: "Chair",
    price: 140.00,
    originalPrice: 180.00,
    rating: 4.8,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600",
    tab: "Featured Products"
  },
  {
    id: 12,
    name: "Sleek Desk Lamp",
    category: "Lighting",
    price: 35.00,
    originalPrice: 50.00,
    rating: 4.5,
    badge: "New",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600",
    tab: "Featured Products"
  }
];

function FlashSaleTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 30,
    seconds: 25,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="absolute bottom-4 left-4 right-4 bg-[#F9C80E] rounded-xl py-2 px-4 flex justify-between items-center z-10 shadow-md">
      <div className="flex flex-col items-center">
        <span className="text-base font-bold text-stone-900 leading-tight">{format(timeLeft.days)}</span>
        <span className="text-[10px] text-stone-800 font-medium">Days</span>
      </div>
      <span className="text-stone-900 font-bold mb-3">:</span>
      <div className="flex flex-col items-center">
        <span className="text-base font-bold text-stone-900 leading-tight">{format(timeLeft.hours)}</span>
        <span className="text-[10px] text-stone-800 font-medium">Hours</span>
      </div>
      <span className="text-stone-900 font-bold mb-3">:</span>
      <div className="flex flex-col items-center">
        <span className="text-base font-bold text-stone-900 leading-tight">{format(timeLeft.minutes)}</span>
        <span className="text-[10px] text-stone-800 font-medium">Mins</span>
      </div>
      <span className="text-stone-900 font-bold mb-3">:</span>
      <div className="flex flex-col items-center">
        <span className="text-base font-bold text-stone-900 leading-tight">{format(timeLeft.seconds)}</span>
        <span className="text-[10px] text-stone-800 font-medium">Sec</span>
      </div>
    </div>
  );
}

export function Products() {
  const [activeTab, setActiveTab] = useState("Latest Products");

  const filteredProducts = activeTab === "All Products"
    ? products
    : products.filter((p) => p.tab === activeTab);

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-[#F9C80E]"></span>
            <span className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Our Products</span>
          </div>
          <h2 className="text-4xl font-bold text-stone-900 mb-8">
            Our <span className="text-[#0F5A37]">Products Collections</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all border ${
                  activeTab === tab
                    ? "bg-[#0F5A37] text-white border-[#0F5A37]"
                    : "bg-white text-stone-600 border-stone-200 hover:border-[#0F5A37] hover:text-[#0F5A37]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col"
              >
                {/* Image Container */}
                <div className="relative bg-[#FAFAFA] rounded-[24px] aspect-[4/5] mb-4 overflow-hidden p-6 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-[#0F5A37] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      {product.badge}
                    </div>
                  )}

                  {/* Hover Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-600 hover:text-[#0F5A37] hover:shadow-md transition-all">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-600 hover:text-[#0F5A37] hover:shadow-md transition-all">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-600 hover:text-[#0F5A37] hover:shadow-md transition-all">
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Timer for Flash Sale Product */}
                  {product.hasTimer && <FlashSaleTimer />}
                </div>

                {/* Details */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs text-stone-500">{product.category}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#F9C80E] text-[#F9C80E]" />
                      <span className="text-xs font-bold text-stone-700">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-stone-900 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-stone-900">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-stone-400 line-through">${product.originalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
