"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortOption = "featured" | "newest" | "price_asc" | "price_desc" | "rating" | "reviews";

interface ProductSortProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  className?: string;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviewed" },
];

export function ProductSort({ currentSort, onSortChange, className }: ProductSortProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLabel = SORT_OPTIONS.find(o => o.value === currentSort)?.label || "Sort by";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative z-10 inline-block w-[220px]", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0F5A37]/20"
      >
        <span>Sort by: {currentLabel}</span>
        <ChevronDown size={16} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-stone-100 py-2 origin-top animate-in fade-in slide-in-from-top-2 z-50">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSortChange(option.value);
                setIsOpen(false);
              }}
              className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-left hover:bg-stone-50 transition-colors"
            >
              <span className={cn(currentSort === option.value ? "text-[#0F5A37] font-medium" : "text-stone-700")}>
                {option.label}
              </span>
              {currentSort === option.value && <Check size={16} className="text-[#0F5A37]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
