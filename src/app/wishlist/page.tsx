"use client";

import { Navbar } from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { Container } from "@/components/ui/Container";
import { useWishlist } from "@/context/WishlistContext";
import { WishlistCard } from "@/components/wishlist/WishlistCard";
import { EmptyWishlist } from "@/components/wishlist/EmptyWishlist";

export default function WishlistPage() {
  const { wishlist, loading } = useWishlist();

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24">
        <Container>
          <h1 className="text-4xl font-bold text-stone-900 mb-2">Your Wishlist</h1>
          <p className="text-stone-500 mb-10">Items you've saved for later.</p>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#0F5A37] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : wishlist.length === 0 ? (
            <EmptyWishlist />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <WishlistCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </Container>
      </div>
      
      <Footer />
    </main>
  );
}
