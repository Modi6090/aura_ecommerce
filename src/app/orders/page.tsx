"use client";

import { useEffect } from "react";
import { Navbar } from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { Container } from "@/components/ui/Container";
import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { OrderCard } from "@/components/orders/OrderCard";
import { EmptyOrders } from "@/components/orders/EmptyOrders";
import { Loader2 } from "lucide-react";

export default function OrdersPage() {
  const { orders, loading } = useOrders();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login?redirect=/orders");
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#0F5A37]" />
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24">
        <Container>
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-stone-900 mb-2">Order History</h1>
            <p className="text-stone-500">View and track your previous orders.</p>
          </div>

          {orders.length === 0 ? (
            <EmptyOrders />
          ) : (
            <div className="grid gap-6">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </Container>
      </div>
      
      <Footer />
    </main>
  );
}
