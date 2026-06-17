"use client";

import { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { Container } from "@/components/ui/Container";
import { AddressForm } from "@/components/checkout/AddressForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CouponInput } from "@/components/checkout/CouponInput";
import { PaymentButton } from "@/components/checkout/PaymentButton";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { ShippingAddress } from "@/types/order";
import { Coupon } from "@/types/coupon";
import { CartItem } from "@/types/cart";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const { cart, subtotal: cartSubtotal, loading: cartLoading } = useCart();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const buyNowProductId = searchParams.get("buy_now");
  const buyNowQty = parseInt(searchParams.get("qty") || "1", 10);

  const [address, setAddress] = useState<ShippingAddress | null>(null);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  
  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(null);
  const [buyNowLoading, setBuyNowLoading] = useState(false);

  // Fetch Buy Now Product
  useEffect(() => {
    if (buyNowProductId && user) {
      const fetchBuyNowItem = async () => {
        setBuyNowLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*, product_images(image_url)")
          .eq("id", buyNowProductId)
          .single();

        if (data && !error) {
          setBuyNowItem({
            id: "buy_now_temp_id",
            product_id: data.id,
            user_id: user.id,
            quantity: buyNowQty,
            title: data.name,
            price: data.discount_price ?? data.price,
            image: data.product_images?.[0]?.image_url || "",
          });
        }
        setBuyNowLoading(false);
      };
      fetchBuyNowItem();
    }
  }, [buyNowProductId, user, buyNowQty]);

  const itemsToCheckout = buyNowItem ? [buyNowItem] : cart;
  const subtotalToCheckout = buyNowItem ? buyNowItem.price * buyNowItem.quantity : cartSubtotal;
  const isDataLoading = authLoading || cartLoading || (buyNowProductId ? buyNowLoading : false);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please login to access checkout");
      router.push(`/auth/login?redirect=/checkout${buyNowProductId ? `?buy_now=${buyNowProductId}&qty=${buyNowQty}` : ''}`);
    }
  }, [user, authLoading, router, buyNowProductId, buyNowQty]);

  // Redirect if cart is empty and not buy_now
  useEffect(() => {
    if (!isDataLoading && !buyNowProductId && itemsToCheckout.length === 0) {
      toast.error("Your cart is empty");
      router.push("/cart");
    }
  }, [itemsToCheckout, isDataLoading, buyNowProductId, router]);

  if (isDataLoading || !user || itemsToCheckout.length === 0) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0F5A37] border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  // Calculations
  const shipping = subtotalToCheckout > 0 ? 0 : 0; // Currently free
  const tax = subtotalToCheckout * 0.08; // 8% tax
  const discount = coupon ? (subtotalToCheckout * coupon.discount_percentage) / 100 : 0;
  const grandTotal = subtotalToCheckout + shipping + tax - discount;

  const handleAddressSubmit = (data: ShippingAddress) => {
    setAddress(data);
    toast.success("Shipping address saved");
  };

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24">
        <Container>
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-stone-900 mb-2">Checkout</h1>
            <p className="text-stone-500">Complete your order details below.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3 space-y-8">
              
              {/* Shipping Address Section */}
              <section className="bg-white p-6 md:p-8 rounded-2xl border border-stone-100 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-stone-900">1. Shipping Address</h2>
                  {address && <CheckCircle2 className="text-green-500" size={24} />}
                </div>
                
                {address ? (
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 relative">
                    <p className="font-semibold text-stone-900">{address.fullName}</p>
                    <p className="text-stone-600 mt-1">{address.phone}</p>
                    <p className="text-stone-600 mt-2">{address.address}</p>
                    <p className="text-stone-600">{address.city}, {address.state} {address.postalCode}</p>
                    <p className="text-stone-600">{address.country}</p>
                    <button 
                      onClick={() => setAddress(null)}
                      className="absolute top-4 right-4 text-sm font-medium text-[#0F5A37] hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <AddressForm onSubmit={handleAddressSubmit} />
                )}
              </section>

              {/* Coupon Section */}
              <section className="bg-white p-6 md:p-8 rounded-2xl border border-stone-100 shadow-sm">
                <h2 className="text-xl font-bold text-stone-900 mb-6">2. Discount Code</h2>
                <CouponInput 
                  onApply={setCoupon} 
                  onRemove={() => setCoupon(null)} 
                  appliedCoupon={coupon} 
                />
              </section>

            </div>

            {/* Order Summary Sidebar */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-24">
                <OrderSummary 
                  items={itemsToCheckout}
                  subtotal={subtotalToCheckout}
                  shipping={shipping}
                  tax={tax}
                  discount={discount}
                  grandTotal={grandTotal}
                />
                <PaymentButton 
                  items={itemsToCheckout} 
                  address={address} 
                  couponId={coupon?.id} 
                  disabled={!address} 
                />
                {!address && (
                  <p className="text-center text-sm text-stone-500 mt-3">
                    Please provide a shipping address to proceed.
                  </p>
                )}
              </div>
            </div>

          </div>
        </Container>
      </div>
      
      <Footer />
    </main>
  );
}
