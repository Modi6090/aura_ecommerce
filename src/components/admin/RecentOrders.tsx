"use client";

import { Order } from "@/types/order";
import { formatCurrency } from "@/lib/utils";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RecentOrdersProps {
  orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-stone-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-stone-900">Recent Orders</h3>
        <Link href="/admin/orders" className="text-sm font-medium text-[#0F5A37] hover:underline flex items-center gap-1">
          View all <ArrowRight size={16} />
        </Link>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-stone-50 text-stone-500 border-b border-stone-100">
            <tr>
              <th className="px-6 py-3 font-semibold">Order ID</th>
              <th className="px-6 py-3 font-semibold">Customer</th>
              <th className="px-6 py-3 font-semibold">Amount</th>
              <th className="px-6 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-stone-500">
                  No recent orders
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-stone-600">#{order.id.split("-")[0]}</td>
                  <td className="px-6 py-4 font-medium text-stone-900">{order.shipping_address?.fullName || "Guest"}</td>
                  <td className="px-6 py-4 font-semibold text-stone-900">{formatCurrency(order.total_amount)}</td>
                  <td className="px-6 py-4">
                    <OrderStatusBadge status={order.order_status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
