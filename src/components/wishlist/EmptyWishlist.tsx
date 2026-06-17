"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-stone-100 shadow-sm text-center px-6">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-32 h-32 bg-stone-50 rounded-full flex items-center justify-center mb-8"
      >
        <Heart className="w-16 h-16 text-stone-300" />
      </motion.div>
      <h2 className="text-3xl font-bold text-stone-900 mb-4">Your wishlist is empty</h2>
      <p className="text-stone-500 max-w-md mb-8 text-lg">
        Save items you love here to easily find them later or add them to your cart.
      </p>
      <Link href="/shop">
        <Button className="h-12 px-8 text-base font-semibold rounded-full">
          Explore Products
        </Button>
      </Link>
    </div>
  );
}
