import { supabase } from "./supabase";
import { WishlistItem } from "@/types/wishlist";
import { addCartItem } from "./cart";

export const getWishlistItems = async (userId: string): Promise<WishlistItem[]> => {
  const { data, error } = await supabase
    .from("wishlists")
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
    console.error("Supabase getWishlistItems error:", error);
    throw error;
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    product_id: row.product_id,
    user_id: row.user_id,
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

export const checkExistingWishlistItem = async (
  userId: string,
  productId: string
): Promise<{ id: string } | null> => {
  const { data } = await supabase
    .from("wishlists")
    .select("id")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .single();

  return data || null;
};

export const addWishlistItem = async (
  userId: string,
  productId: string
): Promise<any> => {
  // Prevent duplicate
  const existing = await checkExistingWishlistItem(userId, productId);

  if (existing) return existing;

  const { data, error } = await supabase
    .from("wishlists")
    .insert([{ user_id: userId, product_id: productId }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeWishlistItem = async (wishlistItemId: string): Promise<void> => {
  const { error } = await supabase
    .from("wishlists")
    .delete()
    .eq("id", wishlistItemId);
  if (error) throw error;
};

export const moveWishlistItemToCart = async (
  userId: string,
  wishlistItemId: string,
  productId: string
): Promise<void> => {
  // 1. Add to cart
  await addCartItem(userId, productId, 1);
  // 2. Remove from wishlist
  await removeWishlistItem(wishlistItemId);
};
