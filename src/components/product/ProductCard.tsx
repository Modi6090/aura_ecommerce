import Link from "next/link";
import { Product } from "@/types/product";
import { ProductRating } from "./ProductRating";
import { formatCurrency } from "@/lib/utils"; // Assuming you have a formatCurrency utility, else we'll use a local function
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.image_url || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"; // Fallback image
  const isDiscounted = product.discount_price && product.discount_price < product.price;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100">
      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isDiscounted && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              SALE
            </span>
          )}
          {product.featured && (
            <span className="bg-[#0F5A37] text-white text-xs font-bold px-2 py-1 rounded-md">
              NEW
            </span>
          )}
        </div>
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

        <div className="flex items-center justify-between mt-auto">
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
            className="bg-stone-100 hover:bg-[#0F5A37] hover:text-white text-stone-700 p-3 rounded-full transition-colors duration-200"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
