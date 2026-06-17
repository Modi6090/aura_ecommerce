"use client";

import { useState, useCallback, useEffect } from "react";
import { Order } from "@/types/order";
import { useAuth } from "@/context/AuthContext";
import * as ordersApi from "@/lib/orders";
import { toast } from "sonner";

export function useOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await ordersApi.getOrders(user.id);
      setOrders(data);
    } catch (err: any) {
      console.error("Failed to fetch orders:", err);
      setError(err.message || "Failed to load orders");
      toast.error("Failed to load your orders");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getOrderById = async (orderId: string) => {
    try {
      return await ordersApi.getOrderById(orderId);
    } catch (err: any) {
      console.error("Failed to fetch order:", err);
      toast.error("Failed to load order details");
      return null;
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    getOrderById
  };
}
