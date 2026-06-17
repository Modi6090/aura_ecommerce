"use client";

import { useState } from "react";
import { Search, Bell, X, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";

const mockNotifications = [
  { id: 1, title: "New Order #1024", time: "5 min ago", read: false },
  { id: 2, title: "Low Inventory: Velvet Sofa", time: "1 hour ago", read: false },
  { id: 3, title: "Payment Failed: Order #1021", time: "3 hours ago", read: true },
];

export function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <Input 
            placeholder="Search orders, products, or customers..." 
            className="pl-10 h-10 bg-stone-50 border-stone-200 rounded-lg w-full max-w-md focus-visible:ring-[#0F5A37]"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 text-stone-500 hover:text-stone-900 transition-colors"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              {unreadCount}
            </span>
          )}
        </button>
        
        {showNotifications && (
          <div className="absolute top-12 right-12 w-80 bg-white border border-stone-200 shadow-xl rounded-2xl overflow-hidden z-50">
            <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <h4 className="font-bold text-stone-900">Notifications</h4>
              <button onClick={markAllAsRead} className="text-xs font-semibold text-[#0F5A37] hover:underline">
                Mark all as read
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className={`p-4 border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors ${!n.read ? 'bg-[#0F5A37]/5' : ''}`}>
                  <div className="flex justify-between items-start mb-1">
                    <p className={`text-sm ${!n.read ? 'font-bold text-stone-900' : 'font-medium text-stone-700'}`}>{n.title}</p>
                    {!n.read && (
                      <button onClick={() => markAsRead(n.id)} className="text-stone-400 hover:text-[#0F5A37]">
                        <CheckCircle size={14} />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-stone-500">{n.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="h-8 w-8 rounded-full bg-[#0F5A37] text-white flex items-center justify-center font-bold text-sm">
          A
        </div>
      </div>
    </header>
  );
}
