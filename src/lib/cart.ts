import { supabase } from "./supabase";
import { CartItem } from "@/types/cart";

export const getCartItems = async (userId: string): Promise<CartItem[]> => {
  const { data, error } = await supabase
    .from("carts")
    .select(`
      *,
      products (
        *,
        product_images (image_url),
        categories (name)
      )
    `)
    .eq("user_id", userId);

  if (error) {
    console.error("Supabase getCartItems error:", error);
    throw error;
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    product_id: row.product_id,
    user_id: row.user_id,
    quantity: row.quantity,
    created_at: row.created_at,
    title: row.products?.name || "Unknown Product",
    price: row.products?.discount_price ?? row.products?.price ?? 0,
    image: row.products?.product_images?.[0]?.image_url || "",
    description: row.products?.description || "",
    category: row.products?.categories?.name || "Uncategorized",
    rating: row.products?.rating || 0,
    stock: row.products?.stock || 0,
  }));
};

export const checkExistingCartItem = async (
  userId: string,
  productId: string
): Promise<{ id: string; quantity: number } | null> => {
  const { data } = await supabase
    .from("carts")
    .select("id, quantity")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .single();

  return data || null;
};

export const addCartItem = async (
  userId: string,
  productId: string,
  quantity: number = 1
): Promise<any> => {
  const existing = await checkExistingCartItem(userId, productId);

  if (existing) {
    return updateCartQuantity(existing.id, existing.quantity + quantity);
  }

  const { data, error } = await supabase
    .from("carts")
    .insert([{ user_id: userId, product_id: productId, quantity }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeCartItem = async (cartItemId: string): Promise<void> => {
  const { error } = await supabase.from("carts").delete().eq("id", cartItemId);
  if (error) throw error;
};

export const updateCartQuantity = async (
  cartItemId: string,
  quantity: number
): Promise<void> => {
  const { error } = await supabase
    .from("carts")
    .update({ quantity })
    .eq("id", cartItemId);
  if (error) throw error;
};

export const clearCart = async (userId: string): Promise<void> => {
  const { error } = await supabase.from("carts").delete().eq("user_id", userId);
  if (error) throw error;
};