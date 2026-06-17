import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-05-27.dahlia",
});

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!signature || !endpointSecret) {
      // In dev mode without webhook secret, we might parse it directly, but it's unsafe.
      throw new Error("Missing stripe-signature or webhook secret");
    }
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Retrieve metadata we set during checkout creation
    const userId = session.metadata?.userId;
    const addressStr = session.metadata?.address;
    const address = addressStr ? JSON.parse(addressStr) : null;
    
    if (!userId || !address) {
      console.error("Missing metadata in session");
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    try {
      // Get the line items to know what was purchased
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      
      // We need product IDs, which we could have passed in metadata, 
      // but let's fetch the cart from DB for this user since it hasn't been cleared yet.
      // A more robust way is to pass cart items as a JSON string in session metadata 
      // if within limits, or store a pending order beforehand.
      
      const { data: cartItems, error: cartError } = await supabase
        .from("carts")
        .select(`*, products(name, price)`)
        .eq("user_id", userId);
        
      if (cartError || !cartItems || cartItems.length === 0) {
         throw new Error("Could not find cart items for this order.");
      }

      const totalAmount = session.amount_total ? session.amount_total / 100 : 0;

      // 1. Create Order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: userId,
          total_amount: totalAmount,
          payment_status: "paid",
          order_status: "processing",
          shipping_address: address,
        })
        .select()
        .single();

      if (orderError || !order) throw new Error("Order creation failed");

      // 2. Create Order Items & Update Inventory
      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.products?.price || 0,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      // Update Inventory
      for (const item of cartItems) {
        // Fetch current stock
        const { data: product } = await supabase.from("products").select("stock").eq("id", item.product_id).single();
        if (product) {
          const newStock = Math.max(0, product.stock - item.quantity);
          await supabase.from("products").update({ stock: newStock }).eq("id", item.product_id);
        }
      }

      // 3. Clear Cart
      await supabase.from("carts").delete().eq("user_id", userId);

      // 4. Send Email Confirmation
      const userEmail = session.customer_details?.email;
      if (userEmail && resend) {
        try {
          await resend.emails.send({
            from: "Aura Store <onboarding@resend.dev>", // Replace with verified domain
            to: userEmail,
            subject: `Order Confirmation - #${order.id.slice(0, 8)}`,
            html: `
              <h1>Thank you for your order!</h1>
              <p>Your order <strong>#${order.id}</strong> has been confirmed and is now processing.</p>
              <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
              <h3>Shipping Address:</h3>
              <p>${address.fullName}<br/>${address.address}<br/>${address.city}, ${address.state} ${address.postalCode}</p>
            `,
          });
        } catch (emailError) {
          console.error("Email sending failed:", emailError);
          // Don't fail the webhook if email fails
        }
      }

      return NextResponse.json({ received: true });
    } catch (err: any) {
      console.error("Fulfilling order failed:", err);
      return NextResponse.json({ error: "Fulfillment failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
