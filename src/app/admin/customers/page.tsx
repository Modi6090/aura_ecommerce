"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// Mock data for UI demonstration
const mockCustomers = [
  { id: "CUST-001", name: "Alice Smith", email: "alice@example.com", phone: "+1 234-567-8901", orders: 12, totalSpent: 1450.00, joined: "2023-01-15" },
  { id: "CUST-002", name: "Bob Johnson", email: "bob@example.com", phone: "+1 234-567-8902", orders: 3, totalSpent: 320.50, joined: "2023-04-22" },
  { id: "CUST-003", name: "Charlie Davis", email: "charlie@example.com", phone: "+1 234-567-8903", orders: 1, totalSpent: 45.00, joined: "2024-02-10" },
  { id: "CUST-004", name: "Diana Prince", email: "diana@example.com", phone: "+1 234-567-8904", orders: 8, totalSpent: 890.75, joined: "2022-11-05" },
  { id: "CUST-005", name: "Evan Wright", email: "evan@example.com", phone: "+1 234-567-8905", orders: 0, totalSpent: 0, joined: "2024-05-01" },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");

  const filteredCustomers = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-1">Customers</h1>
          <p className="text-stone-500">Manage your customer database and view history.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-stone-50/50">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <Input 
              placeholder="Search customers by name or email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-10 w-full"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2 h-10 w-full sm:w-auto">
            <Filter size={18} />
            Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead>
              <tr className="bg-stone-50 text-stone-500 text-sm border-b border-stone-100">
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Contact Info</th>
                <th className="px-6 py-4 font-semibold">Orders</th>
                <th className="px-6 py-4 font-semibold">Total Spent</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-sm">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0F5A37]/10 text-[#0F5A37] flex items-center justify-center font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900">{customer.name}</p>
                        <p className="text-stone-500 text-xs mt-0.5">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-stone-600">
                      <span className="flex items-center gap-1"><Mail size={12}/> {customer.email}</span>
                      <span className="text-xs">{customer.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-900 font-medium">
                    {customer.orders} orders
                  </td>
                  <td className="px-6 py-4 font-bold text-stone-900">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-stone-600">
                    {new Date(customer.joined).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-stone-400 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-100">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-stone-500">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
