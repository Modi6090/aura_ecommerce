"use client";

import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { getCategories } from "@/services/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(
    []
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const data = await getCategories();

        setCategories(data);
      } catch (err: any) {
        console.error("Supabase Error:", err);
        setError(err?.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
  };
};