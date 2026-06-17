"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { getAIRecommendations } from "@/lib/recommendations";
import { Sparkles } from "lucide-react";

export function AIRecommendations({ productId }: { productId: string }) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    getAIRecommendations(productId)
      .then(setRecommendations)
      .catch(console.error);
  }, [productId]);

  if (recommendations.length === 0) return null;

  return (
    <div className="py-12">
      <div className="flex items-center gap-2 mb-8">
        <Sparkles className="text-yellow-500" size={24} />
        <h2 className="text-2xl font-bold text-stone-900">Frequently Bought Together</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
