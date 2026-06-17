"use client";

import { Save } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-1">Settings</h1>
          <p className="text-stone-500">Manage your store preferences and configurations.</p>
        </div>
        <Button className="bg-[#0F5A37] hover:bg-[#0c4a2d] text-white flex items-center gap-2 h-10 px-6 rounded-lg">
          <Save size={18} />
          Save Changes
        </Button>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-8">
        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-4">Store Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Store Name</label>
              <Input defaultValue="Aura Ecommerce" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Contact Email</label>
              <Input defaultValue="support@aura.com" type="email" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-2">Store Description</label>
              <textarea 
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5A37] min-h-[100px]"
                defaultValue="Premium furniture and home decor ecommerce store."
              ></textarea>
            </div>
          </div>
        </div>

        <hr className="border-stone-100" />

        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-4">Currency & Formatting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Store Currency</label>
              <select className="w-full h-12 px-4 rounded-xl border border-stone-200 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#0F5A37]">
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Timezone</label>
              <select className="w-full h-12 px-4 rounded-xl border border-stone-200 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#0F5A37]">
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="EST">EST (Eastern Standard Time)</option>
                <option value="PST">PST (Pacific Standard Time)</option>
              </select>
            </div>
          </div>
        </div>

        <hr className="border-stone-100" />

        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-4">Order Settings</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-stone-300 text-[#0F5A37] focus:ring-[#0F5A37]" />
              <span className="text-sm text-stone-700">Automatically fulfill gift cards</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-stone-300 text-[#0F5A37] focus:ring-[#0F5A37]" />
              <span className="text-sm text-stone-700">Send order confirmation emails to customers</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-stone-300 text-[#0F5A37] focus:ring-[#0F5A37]" />
              <span className="text-sm text-stone-700">Enable inventory tracking warnings</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
