"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";

export function CartSummary() {
  const { cartTotal } = useCart();
  const shipping = cartTotal > 0 ? 0 : 0; // Free shipping
  const tax = cartTotal * 0.08; // 8% tax
  const grandTotal = cartTotal + shipping + tax;

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm sticky top-24">
      <h2 className="text-xl font-bold text-stone-900 mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-stone-600">
          <span>Subtotal</span>
          <span className="font-medium">${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-stone-600">
          <span>Shipping</span>
          <span className="text-[#0F5A37] font-medium">Free</span>
        </div>
        <div className="flex justify-between text-stone-600">
          <span>Tax (8%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="border-t border-stone-100 pt-4 mb-8">
        <div className="flex justify-between items-center text-lg font-bold text-stone-900">
          <span>Grand Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <Button className="w-full h-12 text-base font-semibold">
        Proceed to Checkout
      </Button>
    </div>
  );
}
