"use client";

import { useState } from "react";
import { Search, AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useProducts } from "@/hooks/useProducts";
import { formatCurrency } from "@/lib/utils";

export default function AdminInventoryPage() {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  const lowStockThreshold = 10;
  
  const totalItems = products.length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= lowStockThreshold).length;

  if (loading) {
    return <div className="animate-pulse h-96 bg-stone-100 rounded-2xl w-full"></div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-1">Inventory</h1>
          <p className="text-stone-500">Monitor and update product stock levels.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-stone-500 font-medium">Out of Stock</p>
            <p className="text-2xl font-bold text-stone-900">{outOfStock}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm text-stone-500 font-medium">Low Stock</p>
            <p className="text-2xl font-bold text-stone-900">{lowStock}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm text-stone-500 font-medium">Total Products</p>
            <p className="text-2xl font-bold text-stone-900">{totalItems}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-stone-100 bg-stone-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <Input 
              placeholder="Search inventory..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-10 w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="bg-stone-50 text-stone-500 border-b border-stone-100">
                <th className="px-6 py-4 font-semibold">Product Info</th>
                <th className="px-6 py-4 font-semibold">SKU</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Available</th>
                <th className="px-6 py-4 font-semibold text-right">Update Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((product) => {
                let statusBadge = <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">In Stock</span>;
                if (product.stock === 0) {
                  statusBadge = <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Out of Stock</span>;
                } else if (product.stock <= lowStockThreshold) {
                  statusBadge = <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Low Stock</span>;
                }

                return (
                  <tr key={product.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-stone-100 rounded border border-stone-200 overflow-hidden flex items-center justify-center p-0.5 shrink-0">
                           <img 
                            src={product.images?.[0]?.image_url || "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80"} 
                            alt={product.name}
                            className="max-w-full max-h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <span className="font-medium text-stone-900 truncate max-w-[200px]" title={product.name}>{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-stone-500">
                      {product.sku || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {statusBadge}
                    </td>
                    <td className="px-6 py-4 font-bold text-stone-900">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <Input 
                        type="number" 
                        defaultValue={product.stock}
                        className="w-24 h-8 text-right ml-auto inline-block bg-stone-50 border-stone-200"
                        min="0"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
