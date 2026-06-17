"use client";

import Link from "next/link";
import { Product } from "@/types/product";
import { ProductRating } from "./ProductRating";
import { formatCurrency } from "@/lib/utils";
import { ShoppingCart, Heart, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.image_url || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80";
  const isDiscounted = product.discount_price && product.discount_price < product.price;
  
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  
  const [isAddingCart, setIsAddingCart] = useState(false);
  const [isAddingWishlist, setIsAddingWishlist] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddingCart(true);
    try {
      await addToCart({
        id: product.id,
        title: product.name,
        price: product.discount_price ?? product.price,
        image: imageUrl
      }, 1);
    } finally {
      setIsAddingCart(false);
    }
  };

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddingWishlist(true);
    try {
      await addToWishlist({
        id: product.id,
        title: product.name,
        price: product.discount_price ?? product.price,
        image: imageUrl
      });
    } finally {
      setIsAddingWishlist(false);
    }
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100">
      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-stone-100 block">
        <img
          src={imageUrl}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isDiscounted && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              SALE
            </span>
          )}
          {product.featured && (
            <span className="bg-[#0F5A37] text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              NEW
            </span>
          )}
        </div>
        
        {/* Wishlist Button Overlay */}
        <button
          onClick={handleAddToWishlist}
          disabled={isAddingWishlist}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2.5 rounded-full text-stone-500 hover:text-red-500 hover:bg-white transition-all shadow-sm z-10 disabled:opacity-50"
          aria-label="Add to wishlist"
        >
          {isAddingWishlist ? <Loader2 size={18} className="animate-spin" /> : <Heart size={18} />}
        </button>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <ProductRating rating={product.rating} reviewCount={product.review_count} />
        </div>
        
        <Link href={`/product/${product.slug}`} className="block mb-2 group-hover:text-[#0F5A37] transition-colors">
          <h3 className="font-semibold text-lg text-stone-900 line-clamp-1">{product.name}</h3>
        </Link>
        
        <p className="text-sm text-stone-500 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-50">
          <div className="flex flex-col">
            {isDiscounted ? (
              <>
                <span className="text-lg font-bold text-stone-900">
                  {formatCurrency(product.discount_price ?? 0)}
                </span>
                <span className="text-sm text-stone-400 line-through">
                  {formatCurrency(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-stone-900">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={isAddingCart}
            className="bg-stone-100 hover:bg-[#0F5A37] hover:text-white text-stone-700 p-3 rounded-full transition-colors duration-200 disabled:opacity-50 flex items-center justify-center min-w-[42px] min-h-[42px]"
            aria-label="Add to cart"
          >
            {isAddingCart ? <Loader2 size={18} className="animate-spin" /> : <ShoppingCart size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
