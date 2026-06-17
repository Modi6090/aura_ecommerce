import { supabase } from "./supabase";
import { Order, OrderItem, ShippingAddress, OrderStatus, PaymentStatus } from "@/types/order";

export const getOrders = async (userId: string): Promise<Order[]> => {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products (
          name,
          product_images (image_url)
        )
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products (
          name,
          product_images (image_url)
        )
      )
    `)
    .eq("id", orderId)
    .single();

  if (error) throw error;
  return data;
};

export const createOrder = async (
  userId: string,
  totalAmount: number,
  shippingAddress: ShippingAddress,
  paymentStatus: PaymentStatus = "pending",
  orderStatus: OrderStatus = "pending"
): Promise<Order> => {
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        total_amount: totalAmount,
        shipping_address: shippingAddress,
        payment_status: paymentStatus,
        order_status: orderStatus,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const createOrderItems = async (items: Omit<OrderItem, "id">[]): Promise<void> => {
  const { error } = await supabase.from("order_items").insert(items);
  if (error) throw error;
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
  const { error } = await supabase
    .from("orders")
    .update({ order_status: status })
    .eq("id", orderId);
  if (error) throw error;
};

export const updatePaymentStatus = async (orderId: string, status: PaymentStatus): Promise<void> => {
  const { error } = await supabase
    .from("orders")
    .update({ payment_status: status })
    .eq("id", orderId);
  if (error) throw error;
};

// Admin Functions
export const getAllOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from("orders")
    .select(`*, order_items(*, products(name))`)
    .order("created_at", { ascending: false });
    
  if (error) throw error;
  return data;
};
