"use client";

import { CartItem } from "@/types/cart";
import { QuantitySelector } from "./QuantitySelector";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartItemCard({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = async () => {
    await updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = async () => {
    if (item.quantity > 1) {
      await updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl border border-stone-100 shadow-sm relative group">
      <div className="w-full sm:w-28 h-28 shrink-0 bg-stone-50 rounded-xl overflow-hidden relative flex items-center justify-center p-2">
        <img
          src={item.image || "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=200"}
          alt={item.title}
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-semibold text-stone-900">{item.title}</h3>
            <p className="text-stone-500 font-medium mt-1">${item.price.toFixed(2)}</p>
          </div>
          <button 
            onClick={() => removeFromCart(item.id)}
            className="text-stone-400 hover:text-red-500 transition-colors p-2 -mr-2 -mt-2 opacity-100 sm:opacity-0 group-hover:opacity-100 bg-stone-50 sm:bg-transparent rounded-full sm:rounded-none"
            aria-label="Remove item"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-4 sm:mt-0">
          <QuantitySelector 
            quantity={item.quantity} 
            onIncrease={handleIncrease} 
            onDecrease={handleDecrease}
          />
          <div className="font-bold text-lg text-stone-900">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
