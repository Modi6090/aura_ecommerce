"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Loader2, Tag, X } from "lucide-react";
import * as couponApi from "@/lib/coupon";
import { toast } from "sonner";
import { Coupon } from "@/types/coupon";

interface CouponInputProps {
  onApply: (coupon: Coupon) => void;
  onRemove: () => void;
  appliedCoupon: Coupon | null;
}

export function CouponInput({ onApply, onRemove, appliedCoupon }: CouponInputProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      const coupon = await couponApi.validateCoupon(code.trim());
      if (coupon) {
        onApply(coupon);
        setCode("");
        toast.success(`Coupon applied: ${coupon.discount_percentage}% off`);
      } else {
        toast.error("Invalid or expired coupon code");
      }
    } catch (error) {
      console.error("Coupon error:", error);
      toast.error("Failed to apply coupon");
    } finally {
      setLoading(false);
    }
  };

  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <Tag size={16} />
          </div>
          <div>
            <p className="font-semibold text-green-800">{appliedCoupon.code}</p>
            <p className="text-xs text-green-600">{appliedCoupon.discount_percentage}% discount applied</p>
          </div>
        </div>
        <button 
          onClick={onRemove}
          className="text-green-600 hover:text-green-800 p-2"
          aria-label="Remove coupon"
        >
          <X size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <Input
        value={code}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
        placeholder="Enter coupon code"
        className="flex-1"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleApply()}
      />
      <Button 
        onClick={handleApply} 
        disabled={loading || !code.trim()}
        variant="outline"
        className="shrink-0 border-[#0F5A37] text-[#0F5A37] hover:bg-[#0F5A37] hover:text-white"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : "Apply"}
      </Button>
    </div>
  );
}
