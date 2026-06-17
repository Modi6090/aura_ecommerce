"use client";

import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useProducts } from "@/hooks/useProducts";
import { formatCurrency } from "@/lib/utils";

export default function AdminProductsPage() {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return <div className="animate-pulse h-96 bg-stone-100 rounded-2xl w-full"></div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-1">Products</h1>
          <p className="text-stone-500">Manage your product catalog and inventory.</p>
        </div>
        <Button className="bg-[#0F5A37] hover:bg-[#0c4a2d] text-white flex items-center gap-2 h-10 px-4 rounded-lg">
          <Plus size={18} />
          Add Product
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-stone-50/50">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <Input 
              placeholder="Search products..." 
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
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Inventory</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-sm">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center p-1">
                        <img 
                          src={product.images?.[0]?.image_url || "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80"} 
                          alt={product.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900">{product.name}</p>
                        <p className="text-stone-500 text-xs mt-1">{product.sku || "No SKU"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {product.stock > 0 ? "Active" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={product.stock < 10 ? "text-red-600 font-semibold" : "text-stone-600"}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-stone-900">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-stone-400 hover:text-[#0F5A37] transition-colors rounded-lg hover:bg-stone-100">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-stone-400 hover:text-red-600 transition-colors rounded-lg hover:bg-stone-100">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                    No products found matching your search.
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
