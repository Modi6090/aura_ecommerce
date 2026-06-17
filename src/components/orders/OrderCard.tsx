import { Order } from "@/types/order";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, Calendar, Package } from "lucide-react";

export function OrderCard({ order }: { order: Order }) {
  const date = new Date(order.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const itemCount = order.order_items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const firstItemImage = order.order_items?.[0]?.product?.product_images?.[0]?.image_url;

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 hover:shadow-md transition-shadow group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-stone-900 truncate max-w-[200px] sm:max-w-xs">
              Order #{order.id.split("-")[0]}
            </h3>
            <OrderStatusBadge status={order.order_status} />
          </div>
          <div className="flex items-center gap-4 text-sm text-stone-500">
            <span className="flex items-center gap-1"><Calendar size={14} /> {date}</span>
            <span className="flex items-center gap-1"><Package size={14} /> {itemCount} items</span>
          </div>
        </div>
        <div className="text-left md:text-right">
          <p className="text-sm text-stone-500 mb-1">Total Amount</p>
          <p className="font-bold text-xl text-stone-900">{formatCurrency(order.total_amount)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 pt-6">
        <div className="flex -space-x-3">
          {order.order_items?.slice(0, 4).map((item, i) => (
            <div key={item.id} className="w-12 h-12 rounded-full border-2 border-white bg-stone-50 overflow-hidden relative z-0" style={{ zIndex: 10 - i }}>
              <img 
                src={item.product?.product_images?.[0]?.image_url || "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=100"} 
                alt={item.product?.name || "Product"} 
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
          ))}
          {order.order_items && order.order_items.length > 4 && (
            <div className="w-12 h-12 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-600 relative z-0">
              +{order.order_items.length - 4}
            </div>
          )}
        </div>
        
        <Link 
          href={`/orders/${order.id}`}
          className="flex items-center gap-1 text-sm font-semibold text-[#0F5A37] group-hover:underline"
        >
          View Details <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
