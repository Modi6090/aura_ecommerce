"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/admin/StatsCard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { RecentOrders } from "@/components/admin/RecentOrders";
import { DollarSign, ShoppingBag, Users, PackageX } from "lucide-react";
import { getAllOrders } from "@/lib/orders";
import { Order } from "@/types/order";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login?redirect=/admin");
      return;
    }

    const fetchData = async () => {
      try {
        const ordersData = await getAllOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0F5A37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0);
  const totalOrders = orders.length;
  // Mock customer & out of stock data for now
  const totalCustomers = 124;
  const outOfStock = 3;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Dashboard</h1>
          <p className="text-stone-500">Welcome back. Here's what's happening today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Revenue" 
          value={formatCurrency(totalRevenue)} 
          icon={DollarSign}
          trend={12.5}
          trendLabel="vs last month"
        />
        <StatsCard 
          title="Total Orders" 
          value={totalOrders} 
          icon={ShoppingBag}
          trend={8.2}
          trendLabel="vs last month"
        />
        <StatsCard 
          title="Total Customers" 
          value={totalCustomers} 
          icon={Users}
          trend={5.4}
          trendLabel="vs last month"
        />
        <StatsCard 
          title="Out of Stock" 
          value={outOfStock} 
          icon={PackageX}
          trend={-2.4}
          trendLabel="vs last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1 h-[400px]">
          <RecentOrders orders={orders.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
}
