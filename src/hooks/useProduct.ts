"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProductById } from "@/services/productService";

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const data = await getProductById(id);

        setProduct(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return {
    product,
    loading,
    error,
  };
};