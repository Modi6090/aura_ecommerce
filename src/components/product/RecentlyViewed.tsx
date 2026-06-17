"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

export function RecentlyViewed({ currentProductId }: { currentProductId?: string }) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("recently_viewed");
      if (stored) {
        let parsed: Product[] = JSON.parse(stored);
        if (currentProductId) {
          parsed = parsed.filter((p) => p.id !== currentProductId);
        }
        setRecentProducts(parsed.slice(0, 4));
      }
    } catch (e) {
      console.error("Failed to parse recently viewed", e);
    }
  }, [currentProductId]);

  if (recentProducts.length === 0) return null;

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-stone-900 mb-8">Recently Viewed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
