import { supabase } from "./supabase";
import { Review } from "@/types/review";

export const getProductReviews = async (productId: string): Promise<Review[]> => {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      profiles (
        full_name,
        avatar_url
      )
    `)
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    if (error.code === '42P01') {
      // relation "public.reviews" does not exist, return empty for mock
      return [];
    }
    throw error;
  }
  return data || [];
};

export const addReview = async (productId: string, userId: string, rating: number, review: string): Promise<Review> => {
  const { data, error } = await supabase
    .from("reviews")
    .insert([
      { product_id: productId, user_id: userId, rating, review }
    ])
    .select(`*, profiles(full_name, avatar_url)`)
    .single();

  if (error) throw error;
  return data;
};
