"use client";

import { useEffect, useState, useMemo } from "react";
import { getAllOrders, updateOrderStatus, updatePaymentStatus } from "@/lib/orders";
import { Order, OrderStatus, PaymentStatus } from "@/types/order";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { formatCurrency } from "@/lib/utils";
import { Loader2, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // In a real app, you would verify admin status securely.
  // We'll just ensure they are logged in for this demo.
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
      return;
    }

    if (user) {
      fetchAdminOrders();
    }
  }, [user, authLoading, router]);

  const fetchAdminOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) || 
                            order.user_id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || order.order_status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, order_status: newStatus } : o));
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handlePaymentChange = async (orderId: string, newStatus: PaymentStatus) => {
    try {
      await updatePaymentStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, payment_status: newStatus } : o));
      toast.success(`Payment status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update payment status");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#0F5A37]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-1">Orders</h1>
          <p className="text-stone-500">Manage all customer orders.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <Input 
              placeholder="Search Order ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          <div className="relative">
            <select 
              className="w-full sm:w-48 h-12 px-4 rounded-xl border border-stone-200 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#0F5A37]/20 focus:border-[#0F5A37]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={18} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[800px] text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 text-stone-500 text-sm border-b border-stone-100">
              <th className="p-4 font-semibold">Order ID</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Amount</th>
              <th className="p-4 font-semibold">Order Status</th>
              <th className="p-4 font-semibold">Payment Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-sm">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-stone-500">
                  No orders found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => {
                const date = new Date(order.created_at).toLocaleDateString();
                return (
                  <tr key={order.id} className="hover:bg-stone-50/50">
                    <td className="p-4 font-mono text-stone-600 truncate max-w-[120px]" title={order.id}>
                      {order.id.split("-")[0]}
                    </td>
                    <td className="p-4 text-stone-600">{date}</td>
                    <td className="p-4 font-bold text-stone-900">{formatCurrency(order.total_amount)}</td>
                    <td className="p-4">
                      <select 
                        className="bg-stone-50 border border-stone-200 rounded px-2 py-1 text-xs font-semibold focus:outline-none focus:border-[#0F5A37]"
                        value={order.order_status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <select 
                        className="bg-stone-50 border border-stone-200 rounded px-2 py-1 text-xs font-semibold focus:outline-none focus:border-[#0F5A37]"
                        value={order.payment_status}
                        onChange={(e) => handlePaymentChange(order.id, e.target.value as PaymentStatus)}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => router.push(`/orders/${order.id}`)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
