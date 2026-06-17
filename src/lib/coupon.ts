import { supabase } from "./supabase";
import { Coupon } from "@/types/coupon";

export const validateCoupon = async (code: string): Promise<Coupon | null> => {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", code.toUpperCase())
    .eq("active", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") { // Not found
      return null;
    }
    throw error;
  }
  return data;
};
