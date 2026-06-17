import { CartItem } from "@/types/cart";
import { ShippingAddress } from "@/types/order";

export const createCheckoutSession = async (
  items: CartItem[], 
  address: ShippingAddress,
  couponId?: string
) => {
  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items, address, couponId }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to create checkout session");
    
    return data.sessionId;
  } catch (error) {
    console.error("Payment Error:", error);
    throw error;
  }
};
