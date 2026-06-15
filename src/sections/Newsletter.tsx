"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Send, Mail } from "lucide-react";

export function Newsletter() {
  return (
    <section className="py-24 bg-white relative">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#0F5A37] to-[#0a3d25] p-10 md:p-20 shadow-premium"
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F9C80E]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-2xl text-center md:text-left text-white">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 mx-auto md:mx-0 border border-white/20"
              >
                <Mail className="w-8 h-8 text-[#F9C80E]" />
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Join our newsletter and get <span className="text-[#F9C80E]">15% off</span>
              </h2>
              <p className="text-white/80 text-lg mb-10">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals directly to your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto md:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 h-14 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#F9C80E] transition-all"
                  required
                />
                <Button variant="secondary" size="lg" className="whitespace-nowrap px-8">
                  Subscribe <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex-1 hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600"
                    alt="Newsletter Illustration"
                    className="w-full h-[400px] object-cover rounded-[32px] border-4 border-white/10 shadow-2xl"
                  />
                </motion.div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl border border-stone-100"
                >
                  <div className="flex gap-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">✓</div>
                    <div>
                      <p className="text-sm font-bold text-stone-900">Subscribed!</p>
                      <p className="text-xs text-stone-500">Check your inbox</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
