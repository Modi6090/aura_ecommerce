import { supabase } from "@/lib/supabase";
import { Category } from "@/types/category";
import { MOCK_CATEGORIES } from "@/lib/mockData";

// Helper: check if Supabase is properly configured
const isSupabaseConfigured = () =>
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co";

export const getCategories = async (): Promise<Category[]> => {
  if (!isSupabaseConfigured()) return MOCK_CATEGORIES;
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*");

    if (error) throw error;
    const result = data || [];
    return result.length > 0 ? result : MOCK_CATEGORIES;
  } catch (error) {
    console.warn("Supabase unavailable, using mock categories:", error);
    return MOCK_CATEGORIES;
  }
};