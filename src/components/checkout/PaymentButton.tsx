"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { createCheckoutSession } from "@/lib/payment";
import { CartItem } from "@/types/cart";
import { ShippingAddress } from "@/types/order";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to set this in your environment variables
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

interface PaymentButtonProps {
  items: CartItem[];
  address: ShippingAddress | null;
  couponId?: string;
  disabled?: boolean;
}

export function PaymentButton({ items, address, couponId, disabled }: PaymentButtonProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripeKey) {
      toast.error("Payment is not configured yet. Please contact support.");
      return;
    }

    if (!user) {
      toast.error("Please login to proceed to payment");
      return;
    }
    
    if (!address) {
      toast.error("Please fill in your shipping address");
      // Optionally focus the form
      document.getElementById("address-form")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);
    try {
      const sessionId = await createCheckoutSession(items, address, couponId);
      
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      // Redirect to Stripe checkout
      const { error } = await (stripe as any).redirectToCheckout({ sessionId });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error("Payment initiation failed:", error);
      toast.error(error.message || "Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handlePayment}
      disabled={disabled || loading}
      className="w-full h-14 text-lg font-bold flex items-center justify-center gap-2 mt-6"
    >
      {loading ? (
        <Loader2 size={24} className="animate-spin" />
      ) : (
        <>
          <Lock size={20} />
          Proceed to Payment
        </>
      )}
    </Button>
  );
}
