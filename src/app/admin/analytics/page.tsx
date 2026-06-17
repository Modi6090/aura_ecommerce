"use client";

import { RevenueChart } from "@/components/admin/RevenueChart";
import { StatsCard } from "@/components/admin/StatsCard";
import { TrendingUp, Users, ShoppingCart, Activity } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend } from "recharts";
import { formatCurrency } from "@/lib/utils";

const salesData = [
  { name: "Mon", sales: 4000, orders: 240 },
  { name: "Tue", sales: 3000, orders: 139 },
  { name: "Wed", sales: 2000, orders: 980 },
  { name: "Thu", sales: 2780, orders: 390 },
  { name: "Fri", sales: 1890, orders: 480 },
  { name: "Sat", sales: 2390, orders: 380 },
  { name: "Sun", sales: 3490, orders: 430 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-1">Analytics</h1>
          <p className="text-stone-500">Deep dive into your store's performance metrics.</p>
        </div>
        <select className="h-10 px-4 rounded-lg border border-stone-200 bg-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5A37]">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>This Year</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Sales" value="$45,231" icon={TrendingUp} trend={12.5} />
        <StatsCard title="Active Sessions" value="1,204" icon={Activity} trend={5.2} />
        <StatsCard title="Total Orders" value="384" icon={ShoppingCart} trend={-2.4} />
        <StatsCard title="New Customers" value="89" icon={Users} trend={18.2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm h-[400px]">
          <h3 className="text-lg font-bold text-stone-900 mb-6">Sales vs Orders (Weekly)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} tickFormatter={(val) => `$${val/1000}k`} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={10} />
              <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Bar yAxisId="left" dataKey="sales" fill="#0F5A37" radius={[4, 4, 0, 0]} name="Sales Revenue" />
              <Bar yAxisId="right" dataKey="orders" fill="#9CA3AF" radius={[4, 4, 0, 0]} name="Order Volume" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <RevenueChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-stone-900 mb-6">Top Selling Categories</h3>
          <div className="space-y-4">
            {[
              { name: "Living Room", sales: "$12,450", width: "85%" },
              { name: "Bedroom", sales: "$8,230", width: "65%" },
              { name: "Dining", sales: "$5,120", width: "45%" },
              { name: "Office", sales: "$3,400", width: "30%" },
              { name: "Outdoor", sales: "$1,800", width: "15%" },
            ].map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-stone-700">{cat.name}</span>
                  <span className="font-bold text-stone-900">{cat.sales}</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2">
                  <div className="bg-[#0F5A37] h-2 rounded-full" style={{ width: cat.width }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-stone-900 mb-6">Top Products</h3>
          <div className="space-y-4">
            {[
              { name: "Modern Velvet Sofa", qty: 45, rev: "$40,500" },
              { name: "Oak Dining Table", qty: 32, rev: "$28,800" },
              { name: "Ergonomic Office Chair", qty: 89, rev: "$26,700" },
              { name: "Minimalist Bed Frame", qty: 28, rev: "$22,400" },
              { name: "Ceramic Table Lamp", qty: 156, rev: "$15,600" },
            ].map((prod, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-stone-200 rounded text-stone-500 flex items-center justify-center font-bold text-xs">{i+1}</div>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm">{prod.name}</p>
                    <p className="text-xs text-stone-500">{prod.qty} units sold</p>
                  </div>
                </div>
                <div className="font-bold text-[#0F5A37]">{prod.rev}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
