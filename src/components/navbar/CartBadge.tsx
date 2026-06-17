"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function CartBadge() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <div className="flex items-center gap-5 text-stone-600">
      <Link href="/wishlist">
        <motion.button whileHover={{ scale: 1.1 }} className="relative hover:text-[#0F5A37] transition-colors flex items-center justify-center w-10 h-10">
          <Heart className="w-5 h-5" />
          <AnimatePresence>
            {wishlistCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full"
              >
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </Link>

      <Link href="/cart">
        <motion.button whileHover={{ scale: 1.1 }} className="relative hover:text-[#0F5A37] transition-colors flex items-center justify-center w-10 h-10">
          <ShoppingCart className="w-5 h-5" />
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#0F5A37] rounded-full"
              >
                {cartCount > 99 ? "99+" : cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </Link>
    </div>
  );
}
