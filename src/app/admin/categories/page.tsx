"use client";

import { useState } from "react";
import { Search, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const mockCategories = [
  { id: "cat-1", name: "Living Room", slug: "living-room", productCount: 45, status: "Active" },
  { id: "cat-2", name: "Bedroom", slug: "bedroom", productCount: 32, status: "Active" },
  { id: "cat-3", name: "Dining", slug: "dining", productCount: 28, status: "Active" },
  { id: "cat-4", name: "Office", slug: "office", productCount: 15, status: "Draft" },
  { id: "cat-5", name: "Outdoor", slug: "outdoor", productCount: 8, status: "Active" },
];

export default function AdminCategoriesPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = mockCategories.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-1">Categories</h1>
          <p className="text-stone-500">Organize your products into categories.</p>
        </div>
        <Button className="bg-[#0F5A37] hover:bg-[#0c4a2d] text-white flex items-center gap-2 h-10 px-4 rounded-lg">
          <Plus size={18} />
          Add Category
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-stone-50/50">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <Input 
              placeholder="Search categories..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-10 w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead>
              <tr className="bg-stone-50 text-stone-500 text-sm border-b border-stone-100">
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Slug</th>
                <th className="px-6 py-4 font-semibold">Products</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-sm">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-stone-900">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-stone-500">
                    /{category.slug}
                  </td>
                  <td className="px-6 py-4 font-medium text-stone-900">
                    {category.productCount} products
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${category.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-700'}`}>
                      {category.status}
                    </span>
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
              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                    No categories found.
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
