"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-stone-100 shadow-sm text-center px-6">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-32 h-32 bg-stone-50 rounded-full flex items-center justify-center mb-8"
      >
        <ShoppingBag className="w-16 h-16 text-stone-300" />
      </motion.div>
      <h2 className="text-3xl font-bold text-stone-900 mb-4">Your cart is empty</h2>
      <p className="text-stone-500 max-w-md mb-8 text-lg">
        Looks like you haven't added anything to your cart yet. Discover our premium collection and find something you love.
      </p>
      <Link href="/shop">
        <Button className="h-12 px-8 text-base font-semibold rounded-full">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}
