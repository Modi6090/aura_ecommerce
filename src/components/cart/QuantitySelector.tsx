"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled?: boolean;
  className?: string;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  disabled = false,
  className,
}: QuantitySelectorProps) {
  return (
    <div className={cn("flex items-center gap-3 border border-stone-200 rounded-full px-3 py-1", className)}>
      <button
        onClick={onDecrease}
        disabled={quantity <= 1 || disabled}
        className="text-stone-400 hover:text-stone-900 transition-colors disabled:opacity-50"
      >
        <Minus size={16} />
      </button>
      <span className="w-4 text-center text-sm font-medium text-stone-900">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={disabled}
        className="text-stone-400 hover:text-stone-900 transition-colors disabled:opacity-50"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
