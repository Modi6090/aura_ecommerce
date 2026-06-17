import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { MOCK_PRODUCTS } from "@/lib/mockData";

// Helper: check if Supabase is properly configured
const isSupabaseConfigured = () =>
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co";

export const getProducts = async (): Promise<Product[]> => {
  if (!isSupabaseConfigured()) return MOCK_PRODUCTS;
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, product_images(image_url)");

    if (error) throw error;
    const result = (data || []).map(p => ({ ...p, images: p.product_images || [] }));
    return result.length > 0 ? result : MOCK_PRODUCTS;
  } catch (err) {
    console.warn("Supabase unavailable, using mock products:", err);
    return MOCK_PRODUCTS;
  }
};

// Get product by id
export const getProductById = async (
  id: string
): Promise<Product | null> => {
  if (!isSupabaseConfigured()) {
    return MOCK_PRODUCTS.find(p => p.id === id) ?? null;
  }
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, product_images(image_url)")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (data) data.images = data.product_images || [];
    return data;
  } catch {
    return MOCK_PRODUCTS.find(p => p.id === id) ?? null;
  }
};

// Get products by category
export const getProductsByCategory = async (
  categoryId: string
): Promise<Product[]> => {
  if (!isSupabaseConfigured()) {
    return MOCK_PRODUCTS.filter(p => p.category_id === categoryId);
  }
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, product_images(image_url)")
      .eq("category_id", categoryId);

    if (error) throw error;
    const result = (data || []).map(p => ({ ...p, images: p.product_images || [] }));
    return result.length > 0 ? result : MOCK_PRODUCTS.filter(p => p.category_id === categoryId);
  } catch {
    return MOCK_PRODUCTS.filter(p => p.category_id === categoryId);
  }
};

// Get featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  if (!isSupabaseConfigured()) {
    return MOCK_PRODUCTS.filter(p => p.featured);
  }
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, product_images(image_url)")
      .eq("featured", true);

    if (error) throw error;
    const result = (data || []).map(p => ({ ...p, images: p.product_images || [] }));
    return result.length > 0 ? result : MOCK_PRODUCTS.filter(p => p.featured);
  } catch {
    return MOCK_PRODUCTS.filter(p => p.featured);
  }
};

// Search products
export const searchProducts = async (
  query: string
): Promise<Product[]> => {
  if (!isSupabaseConfigured()) {
    const q = query.toLowerCase();
    return MOCK_PRODUCTS.filter(
      p => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
    );
  }
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, product_images(image_url)")
      .ilike("name", `%${query}%`);

    if (error) throw error;
    return (data || []).map(p => ({ ...p, images: p.product_images || [] }));
  } catch {
    const q = query.toLowerCase();
    return MOCK_PRODUCTS.filter(
      p => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
    );
  }
};

// Related products
export const getRelatedProducts = async (
  categoryId: string | undefined | null,
  currentProductId: string
): Promise<Product[]> => {
  if (!isSupabaseConfigured()) {
    const pool = categoryId
      ? MOCK_PRODUCTS.filter(p => p.category_id === categoryId && p.id !== currentProductId)
      : MOCK_PRODUCTS.filter(p => p.id !== currentProductId);
    return pool.slice(0, 4);
  }
  try {
    let query = supabase
      .from("products")
      .select("*, product_images(image_url)")
      .neq("id", currentProductId);

    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }

    const { data, error } = await query.limit(4);
    if (error) throw error;

    const result = (data || []).map(p => ({ ...p, images: p.product_images || [] }));
    if (result.length > 0) return result;

    // Supabase returned empty — fall back to mock
    const pool = categoryId
      ? MOCK_PRODUCTS.filter(p => p.category_id === categoryId && p.id !== currentProductId)
      : MOCK_PRODUCTS.filter(p => p.id !== currentProductId);
    return pool.slice(0, 4);
  } catch {
    const pool = categoryId
      ? MOCK_PRODUCTS.filter(p => p.category_id === categoryId && p.id !== currentProductId)
      : MOCK_PRODUCTS.filter(p => p.id !== currentProductId);
    return pool.slice(0, 4);
  }
};