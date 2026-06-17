import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, product_images(image_url)");

    if (error) throw error;
    return (data || []).map(p => ({ ...p, images: p.product_images || [] }));
  } catch (err) {
    console.warn("Using mock products due to Supabase error:", err);
    return []; // Reverted mock data for brevity, but returning empty array if error
  }
};

// Get product by id
export const getProductById = async (
  id: string
): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(image_url)")
    .eq("id", id)
    .single();

  if (error) throw error;

  if (data) {
    data.images = data.product_images || [];
  }

  return data;
};

// Get products by category
export const getProductsByCategory = async (
  categoryId: string
): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(image_url)")
    .eq("category_id", categoryId);

  if (error) throw error;

  return (data || []).map(p => ({ ...p, images: p.product_images || [] }));
};

// Get featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(image_url)")
    .eq("featured", true);

  if (error) throw error;

  return (data || []).map(p => ({ ...p, images: p.product_images || [] }));
};

// Search products
export const searchProducts = async (
  query: string
): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(image_url)")
    .ilike("name", `%${query}%`);

  if (error) throw error;

  return (data || []).map(p => ({ ...p, images: p.product_images || [] }));
};

// Related products
export const getRelatedProducts = async (
  categoryId: string | undefined | null,
  currentProductId: string
): Promise<Product[]> => {
  if (!categoryId) return [];
  
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(image_url)")
    .eq("category_id", categoryId)
    .neq("id", currentProductId)
    .limit(4);

  if (error) throw error;

  return (data || []).map(p => ({ ...p, images: p.product_images || [] }));
};