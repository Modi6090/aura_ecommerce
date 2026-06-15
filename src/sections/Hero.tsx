"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
      {/* Background abstract dots / pattern could go here */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side */}
          <div className="flex flex-col items-start max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-50 border border-stone-100 shadow-sm text-stone-700 text-sm font-semibold mb-6"
            >
              <span className="w-5 h-5 bg-[#0F5A37] rounded-full flex items-center justify-center text-white text-[10px]">
                ✦
              </span>
              The Best Online Furniture Store
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold leading-[1.1] text-stone-900 mb-6"
            >
              Explore Our <span className="text-[#0F5A37]">Modern</span><br/>
              <span className="text-[#0F5A37]">Furniture Collection</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-stone-500 mb-8 max-w-md"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-6 mb-12"
            >
              <button className="h-12 px-8 rounded-full bg-[#0F5A37] text-white font-medium hover:bg-[#0c472c] transition-colors flex items-center gap-2 shadow-lg shadow-[#0F5A37]/20">
                Shop Now <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#" className="text-stone-700 font-medium hover:text-[#0F5A37] underline decoration-stone-300 underline-offset-4 hover:decoration-[#0F5A37] transition-all">
                View All Products
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt={`Customer ${i}`}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#F9C80E] flex items-center justify-center text-white text-xs font-bold">
                  +
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-stone-900">
                  4.9 Ratings+
                </p>
                <p className="text-xs text-stone-500">
                  Trusted by 50K+ Customers
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:pl-10"
          >
            <div className="flex gap-6 overflow-hidden pb-12 pt-4 pl-4 -ml-4">
              
              {/* Card 1 */}
              <div className="flex-none w-72 bg-white rounded-[24px] p-3 shadow-soft border border-stone-100 transition-transform hover:-translate-y-2 relative">
                <div className="relative h-64 rounded-[20px] overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800" 
                    alt="Living Room" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-stone-800 shadow-sm">
                    $1,500
                  </div>
                </div>
                <div className="px-2 pb-2 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-stone-900">Living Room</h3>
                    <p className="text-xs text-stone-500 mt-1">2,500+ Items</p>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-[#0F5A37] flex items-center justify-center text-white hover:bg-[#0c472c] transition-colors shadow-md">
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Card 2 (Partially visible/stacked look) */}
              <div className="flex-none w-72 bg-white rounded-[24px] p-3 shadow-soft border border-stone-100 transition-transform hover:-translate-y-2 opacity-80 scale-95 origin-left">
                <div className="relative h-64 rounded-[20px] overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800" 
                    alt="Bed Room" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-2 pb-2">
                  <h3 className="font-bold text-stone-900">Bed Room</h3>
                  <p className="text-xs text-stone-500 mt-1">1,500+ Items</p>
                </div>
              </div>

            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-0 left-10 flex gap-3">
              <button className="w-10 h-10 rounded-full bg-[#0F5A37] flex items-center justify-center text-white hover:bg-[#0c472c] transition-colors shadow-md">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#F9C80E] flex items-center justify-center text-white hover:bg-[#e6b70b] transition-colors shadow-md">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
