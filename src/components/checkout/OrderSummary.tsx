"use client";

import { CartItem } from "@/types/cart";
import { formatCurrency } from "@/lib/utils";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  grandTotal: number;
}

export function OrderSummary({ items, subtotal, shipping, tax, discount, grandTotal }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm sticky top-24">
      <h2 className="text-xl font-bold text-stone-900 mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="w-16 h-16 bg-stone-50 rounded-lg overflow-hidden shrink-0 p-1 flex items-center justify-center">
              <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-stone-900 truncate">{item.title}</p>
              <p className="text-stone-500 text-xs mt-1">Qty: {item.quantity}</p>
            </div>
            <div className="font-semibold text-stone-900 shrink-0">
              {formatCurrency(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-6 pt-6 border-t border-stone-100">
        <div className="flex justify-between text-stone-600 text-sm">
          <span>Subtotal</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-stone-600 text-sm">
          <span>Shipping</span>
          <span className="font-medium text-[#0F5A37]">{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
        </div>
        <div className="flex justify-between text-stone-600 text-sm">
          <span>Tax</span>
          <span className="font-medium">{formatCurrency(tax)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600 text-sm font-medium">
            <span>Discount</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}
      </div>
      
      <div className="border-t border-stone-100 pt-4">
        <div className="flex justify-between items-center text-lg font-bold text-stone-900">
          <span>Grand Total</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>
    </div>
  );
}
