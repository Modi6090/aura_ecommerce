"use client";

import { WishlistItem } from "@/types/wishlist";
import { useWishlist } from "@/context/WishlistContext";
import { X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function WishlistCard({ item }: { item: WishlistItem }) {
  const { removeFromWishlist, moveToCart } = useWishlist();

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden group">
      <div className="relative aspect-square bg-stone-50 p-6 flex items-center justify-center">
        <img
          src={item.image || "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=400"}
          alt={item.title}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={() => removeFromWishlist(item.id)}
          className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-stone-400 hover:text-red-500 transition-colors shadow-sm"
        >
          <X size={16} />
        </button>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-stone-900 mb-2 line-clamp-1">{item.title}</h3>
        <p className="font-semibold text-stone-700 mb-6">${item.price.toFixed(2)}</p>
        
        <div className="mt-auto">
          <Button 
            onClick={() => moveToCart(item.id, { id: item.product_id, title: item.title, price: item.price, image: item.image })}
            className="w-full flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Move to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
