"use client";

import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ProductSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  initialValue?: string;
}

export function ProductSearch({ 
  onSearch, 
  placeholder = "Search products...", 
  className,
  initialValue = ""
}: ProductSearchProps) {
  const [query, setQuery] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
    onSearch("");
  };

  return (
    <div className={cn("relative flex items-center w-full", className)}>
      <div className="absolute left-4 text-stone-400 pointer-events-none">
        <Search size={20} />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F5A37]/20 focus:border-[#0F5A37] transition-all text-stone-800 placeholder:text-stone-400 shadow-sm"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-4 text-stone-400 hover:text-stone-600 transition-colors"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
