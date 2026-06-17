"use client";

import Link from "next/link";
import { PackageX } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-stone-100 shadow-sm">
      <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center text-stone-300 mb-6">
        <PackageX size={40} />
      </div>
      <h2 className="text-2xl font-bold text-stone-900 mb-3">No orders yet</h2>
      <p className="text-stone-500 max-w-sm mb-8">
        You haven't placed any orders yet. Start exploring our collection to find something you'll love!
      </p>
      <Link href="/shop">
        <Button className="px-8 h-12 text-base font-semibold">Start Shopping</Button>
      </Link>
    </div>
  );
}
