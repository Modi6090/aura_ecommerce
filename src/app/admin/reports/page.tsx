"use client";

import { Download, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminReportsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-1">Reports & Exports</h1>
          <p className="text-stone-500">Generate and download data for accounting and analysis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Sales Report", desc: "Detailed breakdown of all sales, taxes, and shipping.", icon: FileText },
          { title: "Inventory Report", desc: "Current stock levels, low stock warnings, and valuations.", icon: FileText },
          { title: "Customer Report", desc: "Customer acquisition, total spend, and contact details.", icon: FileText },
          { title: "Tax Report", desc: "Tax collected broken down by region and date.", icon: FileText },
          { title: "Order Fulfillment", desc: "Fulfillment times and shipping status data.", icon: FileText },
        ].map((report, i) => {
          const Icon = report.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600 mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{report.title}</h3>
                <p className="text-sm text-stone-500 mb-6">{report.desc}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex-1 flex items-center gap-2">
                  <Calendar size={16} />
                  Date Range
                </Button>
                <Button className="bg-[#0F5A37] hover:bg-[#0c4a2d] text-white flex items-center gap-2 px-3">
                  <Download size={18} />
                  CSV
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
