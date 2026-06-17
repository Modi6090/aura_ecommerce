import { supabase } from "@/lib/supabase";
import { Category } from "@/types/category";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*");

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn("Supabase fetch failed, returning mock data.", error);
    return []; // Reverted for brevity
  }
};  