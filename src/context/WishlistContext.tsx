"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";
import { WishlistItem } from "@/types/wishlist";
import { useAuth } from "@/context/AuthContext";
import * as wishlistApi from "@/lib/wishlist";
import { useCart } from "./CartContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type WishlistContextType = {
  wishlist: WishlistItem[];
  loading: boolean;
  error: string | null;
  addToWishlist: (product: { id: string; title: string; price: number; image: string }) => Promise<void>;
  removeFromWishlist: (wishlistItemId: string) => Promise<void>;
  moveToCart: (wishlistItemId: string, product: { id: string; title: string; price: number; image: string }) => Promise<void>;
  fetchWishlist: () => Promise<void>;
  wishlistCount: number;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setWishlist([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const items = await wishlistApi.getWishlistItems(user.id);
      setWishlist(items);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      setError("Failed to load wishlist.");
      toast.error("Something went wrong loading your wishlist.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = async (product: { id: string; title: string; price: number; image: string }) => {
    if (!user) {
      toast.error("Please log in to add items to your wishlist.");
      router.push("/auth/login");
      return;
    }

    const existing = wishlist.find((item) => item.product_id === product.id);
    if (existing) {
      toast("Product is already in your wishlist");
      return;
    }

    const previousWishlist = [...wishlist];
    const tempId = `temp-${Date.now()}`;
    
    // Optimistic Update
    setWishlist((prev) => [
      ...prev,
      {
        id: tempId,
        product_id: product.id,
        user_id: user.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
    ]);

    toast.success("Wishlist updated");

    try {
      await wishlistApi.addWishlistItem(user.id, product.id);
      const items = await wishlistApi.getWishlistItems(user.id);
      setWishlist(items);
    } catch (err) {
      console.error("Wishlist add failed:", err);
      setWishlist(previousWishlist); // Rollback
      toast.error("Something went wrong");
    }
  };

  const removeFromWishlist = async (wishlistItemId: string) => {
    if (!user) return;

    const previousWishlist = [...wishlist];
    setWishlist((prev) => prev.filter((item) => item.id !== wishlistItemId));
    toast.success("Wishlist updated");

    if (wishlistItemId.startsWith("temp-")) return;

    try {
      await wishlistApi.removeWishlistItem(wishlistItemId);
    } catch (err) {
      console.error("Wishlist remove failed", err);
      setWishlist(previousWishlist); // Rollback
      toast.error("Something went wrong");
    }
  };

  const moveToCart = async (wishlistItemId: string, product: { id: string; title: string; price: number; image: string }) => {
    if (!user) return;

    const previousWishlist = [...wishlist];
    
    // 1. Optimistically remove from wishlist
    setWishlist((prev) => prev.filter((item) => item.id !== wishlistItemId));
    
    // 2. Add to cart context
    await addToCart(product, 1);

    if (wishlistItemId.startsWith("temp-")) return;

    // 3. Supabase integration
    try {
      await wishlistApi.moveWishlistItemToCart(user.id, wishlistItemId, product.id);
      // Wait to refetch to ensure real IDs
      const items = await wishlistApi.getWishlistItems(user.id);
      setWishlist(items);
    } catch (err) {
      console.error("Supabase move failed", err);
      setWishlist(previousWishlist); // Rollback
      toast.error("Something went wrong");
    }
  };

  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        error,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        fetchWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
