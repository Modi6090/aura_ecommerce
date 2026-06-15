"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "/#categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-[#0F5A37]">
          AURA.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-stone-600 hover:text-[#0F5A37] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-5 text-stone-600">
          <motion.button whileHover={{ scale: 1.1 }} className="hover:text-[#0F5A37] transition-colors">
            <Search className="w-5 h-5" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} className="hover:text-[#0F5A37] transition-colors">
            <Heart className="w-5 h-5" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} className="hover:text-[#0F5A37] transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} className="hover:text-[#0F5A37] transition-colors">
            <User className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-stone-900"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-bold text-[#0F5A37]">AURA.</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-stone-900" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 text-xl font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-stone-800 hover:text-[#0F5A37]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex items-center justify-center gap-8 text-stone-600 pb-10">
              <Search className="w-6 h-6 hover:text-[#0F5A37]" />
              <Heart className="w-6 h-6 hover:text-[#0F5A37]" />
              <ShoppingCart className="w-6 h-6 hover:text-[#0F5A37]" />
              <User className="w-6 h-6 hover:text-[#0F5A37]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
