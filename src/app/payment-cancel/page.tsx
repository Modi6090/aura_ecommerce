"use client";

import { Navbar } from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { Container } from "@/components/ui/Container";
import { XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PaymentCancelPage() {
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
              className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <XCircle size={48} />
            </motion.div>
            
            <h1 className="text-4xl font-extrabold text-stone-900 mb-4">Payment Cancelled</h1>
            <p className="text-stone-500 text-lg mb-8 max-w-md mx-auto">
              Your payment process was interrupted or cancelled. No charges were made to your account.
            </p>
            
            <div className="flex justify-center">
              <Link 
                href="/checkout" 
                className="flex items-center justify-center gap-2 bg-[#0F5A37] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0c4a2d] transition-colors"
              >
                <ArrowLeft size={20} />
                Return to Checkout
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>
      
      <Footer />
    </main>
  );
}
