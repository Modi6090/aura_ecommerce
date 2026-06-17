"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingCart, User, Menu, X, LogOut, Package, UserCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.signOut();
      toast.success("Logged out successfully");
      setUserMenuOpen(false);
      router.push("/auth/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

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
            <ShoppingCart className="w-5 h-5" />
          </motion.button>

          {user ? (
            <div className="relative" ref={userMenuRef}>
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="hover:text-[#0F5A37] transition-colors flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-[#0F5A37] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {user.email?.[0].toUpperCase() || <User className="w-4 h-4" />}
                </div>
              </motion.button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-stone-100"
                  >
                    <Link href="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-[#0F5A37]">
                      <UserCircle className="w-4 h-4" /> Profile
                    </Link>
                    <Link href="/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-[#0F5A37]">
                      <Package className="w-4 h-4" /> Orders
                    </Link>
                    <Link href="/wishlist" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-[#0F5A37]">
                      <Heart className="w-4 h-4" /> Wishlist
                    </Link>
                    <div className="border-t border-stone-100 my-1"></div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-stone-50">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-4 text-sm font-medium">
              <Link href="/auth/login" className="hover:text-[#0F5A37] transition-colors">
                Login
              </Link>
              <Link href="/auth/signup" className="bg-[#0F5A37] text-white px-4 py-2 rounded-lg hover:bg-[#0c4a2d] transition-colors">
                Register
              </Link>
            </div>
          )}
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
            className="fixed inset-0 bg-white z-50 flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-bold text-[#0F5A37]">AURA.</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-stone-900" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 text-xl font-medium mb-10">
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

            <div className="border-t border-stone-200 my-6"></div>

            <div className="flex flex-col gap-6 text-lg font-medium">
              {user ? (
                <>
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-stone-800">
                    <UserCircle className="w-5 h-5" /> Profile
                  </Link>
                  <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-stone-800">
                    <Package className="w-5 h-5" /> Orders
                  </Link>
                  <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-stone-800">
                    <Heart className="w-5 h-5" /> Wishlist
                  </Link>
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="flex items-center gap-3 text-red-600 text-left">
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 text-center border border-[#0F5A37] text-[#0F5A37] rounded-lg">
                    Login
                  </Link>
                  <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 text-center bg-[#0F5A37] text-white rounded-lg">
                    Register
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-auto pt-10 flex items-center justify-center gap-8 text-stone-600">
              <Search className="w-6 h-6 hover:text-[#0F5A37]" />
              <ShoppingCart className="w-6 h-6 hover:text-[#0F5A37]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
