"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, trendLabel }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-stone-500 font-medium text-sm">{title}</h3>
        <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-600">
          <Icon size={20} />
        </div>
      </div>
      
      <div>
        <div className="text-3xl font-bold text-stone-900">{value}</div>
        {trend !== undefined && (
          <div className="flex items-center gap-2 mt-2">
            <span className={cn(
              "text-xs font-semibold px-2 py-1 rounded-full",
              trend > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            )}>
              {trend > 0 ? "+" : ""}{trend}%
            </span>
            {trendLabel && <span className="text-xs text-stone-500">{trendLabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
