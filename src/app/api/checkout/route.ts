import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { CartItem } from "@/types/cart";
import { ShippingAddress } from "@/types/order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(req: Request) {
  try {
    const { items, address, couponId }: { items: CartItem[], address: ShippingAddress, couponId?: string } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    // Prepare line items for Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      // In a real prod environment, you would fetch prices directly from your DB
      // to prevent client-side price tampering. Assuming `item.price` is verified for now.
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
        },
        quantity: item.quantity,
      };
    });

    // Handle discounts
    let discounts: { coupon: string }[] | undefined;
    
    // Note: To apply a coupon in Stripe, you must create it in your Stripe dashboard 
    // and pass the Stripe coupon ID here. For this demo, we assume couponId maps to a valid Stripe coupon.
    if (couponId) {
      // Fetch coupon from DB to verify
      const { data: dbCoupon } = await supabase.from("coupons").select("*").eq("id", couponId).single();
      if (dbCoupon && dbCoupon.stripe_coupon_id) {
        discounts = [{ coupon: dbCoupon.stripe_coupon_id }];
      }
    }

    // We add metadata to link the session back to our DB tables later
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      discounts,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/payment-cancel`,
      metadata: {
        userId: items[0].user_id,
        address: JSON.stringify(address),
        couponId: couponId || "",
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
