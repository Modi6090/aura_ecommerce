"use client";

import { Navbar } from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { Container } from "@/components/ui/Container";
import { useCart } from "@/context/CartContext";
import { CartItemCard } from "@/components/cart/CartItemCard";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";

export default function CartPage() {
  const { cart, loading } = useCart();

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24">
        <Container>
          <h1 className="text-4xl font-bold text-stone-900 mb-2">Your Cart</h1>
          <p className="text-stone-500 mb-10">Review your items and proceed to checkout.</p>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#0F5A37] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="w-full lg:flex-1 space-y-6">
                {cart.map((item) => (
                  <CartItemCard key={item.id} item={item} />
                ))}
              </div>
              <div className="w-full lg:w-96 shrink-0">
                <CartSummary />
              </div>
            </div>
          )}
        </Container>
      </div>
      
      <Footer />
    </main>
  );
}
