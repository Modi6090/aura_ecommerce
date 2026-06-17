"use client";

import { useState, useEffect } from "react";
import { Category } from "@/types/category";
import { Check, ChevronDown, ChevronUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
  className?: string;
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  selectedRating,
  onRatingChange,
  className
}: ProductFiltersProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);

  // Local state for price input before applying
  const [localMin, setLocalMin] = useState(priceRange[0].toString());
  const [localMax, setLocalMax] = useState(priceRange[1].toString());

  // Sync inputs if priceRange prop changes externally (e.g. Reset Filters)
  useEffect(() => {
    setLocalMin(priceRange[0].toString());
    setLocalMax(priceRange[1].toString());
  }, [priceRange]);

  const handlePriceApply = () => {
    const min = parseFloat(localMin) || 0;
    const max = parseFloat(localMax) || 10000;
    onPriceChange([Math.min(min, max), Math.max(min, max)]);
  };

  return (
    <div className={cn("w-full bg-white rounded-2xl border border-stone-100 p-5 shadow-sm space-y-6", className)}>
      <div>
        <h2 className="text-xl font-bold text-stone-900 mb-6">Filters</h2>
      </div>

      {/* Categories Filter */}
      <div className="border-b border-stone-100 pb-6">
        <button 
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-stone-800 mb-4"
        >
          Categories
          {isCategoryOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {isCategoryOpen && (
          <div className="space-y-3">
            <button
              onClick={() => onCategoryChange(null)}
              className={cn(
                "flex items-center gap-3 w-full text-left text-sm transition-colors",
                selectedCategory === null ? "text-[#0F5A37] font-medium" : "text-stone-600 hover:text-stone-900"
              )}
            >
              <div className={cn(
                "w-5 h-5 rounded border flex items-center justify-center",
                selectedCategory === null ? "bg-[#0F5A37] border-[#0F5A37]" : "border-stone-300"
              )}>
                {selectedCategory === null && <Check size={14} className="text-white" />}
              </div>
              All Categories
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.slug)}
                className={cn(
                  "flex items-center gap-3 w-full text-left text-sm transition-colors",
                  selectedCategory === category.slug ? "text-[#0F5A37] font-medium" : "text-stone-600 hover:text-stone-900"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded border flex items-center justify-center",
                  selectedCategory === category.slug ? "bg-[#0F5A37] border-[#0F5A37]" : "border-stone-300"
                )}>
                  {selectedCategory === category.slug && <Check size={14} className="text-white" />}
                </div>
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-stone-100 pb-6">
        <button 
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-stone-800 mb-4"
        >
          Price Range
          {isPriceOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {isPriceOpen && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">$</span>
                <input 
                  type="number" 
                  value={localMin}
                  onChange={(e) => setLocalMin(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#0F5A37]"
                  placeholder="Min"
                />
              </div>
              <span className="text-stone-400">-</span>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">$</span>
                <input 
                  type="number" 
                  value={localMax}
                  onChange={(e) => setLocalMax(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#0F5A37]"
                  placeholder="Max"
                />
              </div>
            </div>
            <button 
              onClick={handlePriceApply}
              className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Apply Filter
            </button>
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div>
        <button 
          onClick={() => setIsRatingOpen(!isRatingOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-stone-800 mb-4"
        >
          Rating
          {isRatingOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {isRatingOpen && (
          <div className="space-y-3">
            <button
              onClick={() => onRatingChange(null)}
              className={cn(
                "flex items-center gap-3 w-full text-left text-sm transition-colors",
                selectedRating === null ? "text-[#0F5A37] font-medium" : "text-stone-600 hover:text-stone-900"
              )}
            >
              <div className={cn(
                "w-5 h-5 rounded border flex items-center justify-center",
                selectedRating === null ? "bg-[#0F5A37] border-[#0F5A37]" : "border-stone-300"
              )}>
                {selectedRating === null && <Check size={14} className="text-white" />}
              </div>
              All Ratings
            </button>
            
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => onRatingChange(rating)}
                className={cn(
                  "flex items-center gap-3 w-full text-left text-sm transition-colors",
                  selectedRating === rating ? "text-[#0F5A37] font-medium" : "text-stone-600 hover:text-stone-900"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded border flex items-center justify-center",
                  selectedRating === rating ? "bg-[#0F5A37] border-[#0F5A37]" : "border-stone-300"
                )}>
                  {selectedRating === rating && <Check size={14} className="text-white" />}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={cn(i < rating ? "fill-yellow-400 text-yellow-400" : "fill-stone-200 text-stone-200")}
                    />
                  ))}
                  <span className="ml-1">& Up</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
