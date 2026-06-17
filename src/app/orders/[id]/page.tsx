"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { Container } from "@/components/ui/Container";
import { useOrders } from "@/hooks/useOrders";
import { useParams, useRouter } from "next/navigation";
import { Order } from "@/types/order";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { formatCurrency } from "@/lib/utils";
import { Loader2, ArrowLeft, MapPin, CreditCard, Package, Truck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function OrderDetailsPage() {
  const { id } = useParams() as { id: string };
  const { getOrderById } = useOrders();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
      return;
    }

    const fetchOrder = async () => {
      setLoading(true);
      const data = await getOrderById(id);
      if (data) {
        setOrder(data);
      }
      setLoading(false);
    };

    if (user && id) {
      fetchOrder();
    }
  }, [id, user, authLoading, getOrderById, router]);

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#0F5A37]" />
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-32 pb-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-stone-900 mb-2">Order Not Found</h1>
            <Link href="/orders" className="text-[#0F5A37] hover:underline flex items-center justify-center gap-1">
              <ArrowLeft size={16} /> Back to Orders
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const date = new Date(order.created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const statuses = ["pending", "processing", "shipped", "delivered"];
  const currentStatusIndex = statuses.indexOf(order.order_status);

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24">
        <Container>
          <Link href="/orders" className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-900 mb-8 transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> Back to Orders
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-stone-900 mb-2">Order #{order.id.split("-")[0]}</h1>
              <p className="text-stone-500">Placed on {date}</p>
            </div>
            <div className="flex gap-3">
              <OrderStatusBadge status={order.order_status} />
              <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${order.payment_status === "paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                Payment {order.payment_status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              
              {/* Status Timeline */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-100 shadow-sm">
                <h2 className="text-lg font-bold text-stone-900 mb-6">Order Status</h2>
                <div className="relative">
                  <div className="absolute top-5 left-6 right-6 h-1 bg-stone-100 -z-10"></div>
                  <div 
                    className="absolute top-5 left-6 h-1 bg-[#0F5A37] -z-10 transition-all duration-500" 
                    style={{ width: `${Math.max(0, (currentStatusIndex / (statuses.length - 1)) * 100)}%` }}
                  ></div>
                  <div className="flex justify-between relative z-10">
                    {[
                      { id: "pending", label: "Order Placed", icon: Package },
                      { id: "processing", label: "Processing", icon: Loader2 },
                      { id: "shipped", label: "Shipped", icon: Truck },
                      { id: "delivered", label: "Delivered", icon: CheckCircle2 },
                    ].map((step, i) => {
                      const Icon = step.icon;
                      const isCompleted = i <= currentStatusIndex;
                      const isActive = i === currentStatusIndex;
                      return (
                        <div key={step.id} className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white ${isCompleted ? 'bg-[#0F5A37] text-white' : 'bg-stone-200 text-stone-400'} ${isActive && step.id === 'processing' ? 'animate-pulse' : ''}`}>
                            <Icon size={18} className={isActive && step.id === 'processing' ? 'animate-spin' : ''} />
                          </div>
                          <p className={`mt-2 text-xs font-semibold ${isCompleted ? 'text-[#0F5A37]' : 'text-stone-400'}`}>{step.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-100 shadow-sm">
                <h2 className="text-lg font-bold text-stone-900 mb-6">Items Ordered</h2>
                <div className="divide-y divide-stone-100">
                  {order.order_items?.map((item) => (
                    <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                      <div className="w-20 h-20 bg-stone-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2">
                        <img 
                          src={item.product?.product_images?.[0]?.image_url || "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80"} 
                          alt={item.product?.name} 
                          className="max-w-full max-h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h3 className="font-semibold text-stone-900 line-clamp-1">{item.product?.name}</h3>
                          <p className="text-sm text-stone-500 mt-1">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-stone-900">{formatCurrency(item.price)}</p>
                      </div>
                      <div className="font-bold text-stone-900 pt-1 text-right">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Invoice Summary */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-100 shadow-sm">
                <h2 className="text-lg font-bold text-stone-900 mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatCurrency(order.total_amount)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Shipping</span>
                    <span className="font-medium text-[#0F5A37]">Free</span>
                  </div>
                </div>
                <div className="border-t border-stone-100 pt-4 flex justify-between items-center text-lg font-bold text-stone-900">
                  <span>Total</span>
                  <span>{formatCurrency(order.total_amount)}</span>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-[#0F5A37]" size={20} />
                  <h2 className="text-lg font-bold text-stone-900">Shipping Address</h2>
                </div>
                <div className="text-stone-600 space-y-1">
                  <p className="font-semibold text-stone-900">{order.shipping_address.fullName}</p>
                  <p>{order.shipping_address.address}</p>
                  <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postalCode}</p>
                  <p>{order.shipping_address.country}</p>
                  <p className="pt-2">Phone: {order.shipping_address.phone}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="text-[#0F5A37]" size={20} />
                  <h2 className="text-lg font-bold text-stone-900">Payment Method</h2>
                </div>
                <div className="text-stone-600">
                  <p>Paid via Stripe</p>
                  <p className="text-sm mt-1">Status: <span className="uppercase font-semibold">{order.payment_status}</span></p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      
      <Footer />
    </main>
  );
}
