import { supabase } from "./supabase";
import { Product } from "@/types/product";

export const getAIRecommendations = async (productId: string): Promise<Product[]> => {
  // In a real enterprise app, you would use OpenAI embeddings or collaborative filtering here.
  // For this implementation, we will simulate it by fetching trending/related products.
  
  try {
    const { data: currentProduct } = await supabase
      .from("products")
      .select("category_id")
      .eq("id", productId)
      .single();

    if (!currentProduct) return [];

    const { data } = await supabase
      .from("products")
      .select("*, product_images(image_url)")
      .eq("category_id", currentProduct.category_id)
      .neq("id", productId)
      .limit(4);

    return data || [];
  } catch (error) {
    console.error("Failed to fetch AI recommendations:", error);
    return [];
  }
};
