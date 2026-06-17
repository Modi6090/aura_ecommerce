"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";
import { CartItem } from "@/types/cart";
import { useAuth } from "@/context/AuthContext";
import * as cartApi from "@/lib/cart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CartContextType = {
  cart: CartItem[];
  loading: boolean;
  error: string | null;
  addToCart: (product: { id: string; title: string; price: number; image: string }, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
  cartCount: number;
  cartTotal: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCart([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const items = await cartApi.getCartItems(user.id);
      setCart(items);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setError("Failed to load cart.");
      toast.error("Something went wrong loading your cart.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (product: { id: string; title: string; price: number; image: string }, quantity = 1) => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      router.push("/auth/login");
      return;
    }

    const previousCart = [...cart];
    const existing = cart.find((item) => item.product_id === product.id);
    const tempId = `temp-${Date.now()}`;
    
    // Optimistic Update
    setCart((prev) => {
      if (existing) {
        return prev.map((item) =>
          item.product_id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: tempId,
          product_id: product.id,
          user_id: user.id,
          quantity,
          title: product.title,
          price: product.price,
          image: product.image,
        },
      ];
    });

    toast.success("Product added to cart");

    try {
      await cartApi.addCartItem(user.id, product.id, quantity);
      const items = await cartApi.getCartItems(user.id);
      setCart(items);
    } catch (err) {
      console.error("Cart add failed:", err);
      setCart(previousCart); // Rollback
      toast.error("Something went wrong");
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    if (!user) return;

    const previousCart = [...cart];
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    toast.success("Removed from cart");

    if (cartItemId.startsWith("temp-")) return;

    try {
      await cartApi.removeCartItem(cartItemId);
    } catch (err) {
      console.error("Supabase remove failed", err);
      setCart(previousCart); // Rollback
      toast.error("Something went wrong");
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (!user || quantity < 1) return;
    
    const previousCart = [...cart];
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
    toast.success("Quantity changed");

    if (cartItemId.startsWith("temp-")) return;

    try {
      await cartApi.updateCartQuantity(cartItemId, quantity);
    } catch (err) {
      console.error("Supabase update failed", err);
      setCart(previousCart); // Rollback
      toast.error("Something went wrong");
    }
  };

  const clearCartState = async () => {
    if (!user) return;
    const previousCart = [...cart];
    setCart([]);

    try {
      await cartApi.clearCart(user.id);
    } catch (err) {
      console.error("Supabase clear failed", err);
      setCart(previousCart);
      toast.error("Something went wrong");
    }
  };

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);
  const cartTotal = subtotal; // If taxes/shipping exist, they would be added here

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart: clearCartState,
        fetchCart,
        cartCount,
        cartTotal,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}