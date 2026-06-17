"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { Container } from "@/components/ui/Container";
import { CheckCircle, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { fetchCart } = useCart();
  
  useEffect(() => {
    // Force refresh cart context to show empty cart after successful payment
    if (sessionId) {
      fetchCart();
    }
  }, [sessionId, fetchCart]);

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24 flex items-center justify-center">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-white rounded-3xl border border-stone-100 p-8 md:p-12 text-center shadow-xl shadow-stone-200/20"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle size={48} />
            </motion.div>
            
            <h1 className="text-4xl font-extrabold text-stone-900 mb-4">Payment Successful!</h1>
            <p className="text-stone-500 text-lg mb-8 max-w-md mx-auto">
              Thank you for your purchase. We've received your order and are getting it ready for shipment.
            </p>
            
            {sessionId && (
              <div className="bg-stone-50 p-4 rounded-xl mb-8 border border-stone-100">
                <p className="text-sm text-stone-500 font-medium">Session ID (Reference)</p>
                <p className="text-xs text-stone-700 font-mono mt-1 truncate">{sessionId}</p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/orders" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0F5A37] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0c4a2d] transition-colors"
              >
                <Truck size={20} />
                Track Order
              </Link>
              <Link 
                href="/shop" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-100 text-stone-700 px-8 py-4 rounded-xl font-bold hover:bg-stone-200 transition-colors"
              >
                <ShoppingBag size={20} />
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>
      
      <Footer />
    </main>
  );
}
