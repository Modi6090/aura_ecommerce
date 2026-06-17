"use client";

import { useState, useMemo, useCallback, useEffect, useRef, Suspense } from "react";
import { Navbar } from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { Container } from "@/components/ui/Container";
import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductSearch } from "@/components/product/ProductSearch";
import { ProductSort, SortOption } from "@/components/product/ProductSort";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Pagination } from "@/components/product/Pagination";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { usePagination } from "@/hooks/usePagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, loading: productsLoading } = useProducts();
  const { categories } = useCategories();
  
  // Parse URL Params
  const initialCategory = searchParams.get("category");
  const initialSearch = searchParams.get("q") || "";
  const initialMinPrice = Number(searchParams.get("min")) || 0;
  const initialMaxPrice = Number(searchParams.get("max")) || 10000;
  const initialRating = searchParams.get("rating") ? Number(searchParams.get("rating")) : null;
  const initialSort = (searchParams.get("sort") as SortOption) || "featured";

  // State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState<[number, number]>([initialMinPrice, initialMaxPrice]);
  const [selectedRating, setSelectedRating] = useState<number | null>(initialRating);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false);
  const [useInfiniteScroll, setUseInfiniteScroll] = useState(true); // Toggle for infinite vs manual pagination

  // Sync to URL whenever state changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (searchQuery) params.set("q", searchQuery);
    if (priceRange[0] > 0) params.set("min", priceRange[0].toString());
    if (priceRange[1] < 10000) params.set("max", priceRange[1].toString());
    if (selectedRating) params.set("rating", selectedRating.toString());
    if (sortBy !== "featured") params.set("sort", sortBy);

    const newUrl = params.toString() ? `/shop?${params.toString()}` : "/shop";
    router.replace(newUrl, { scroll: false });
  }, [selectedCategory, searchQuery, priceRange, selectedRating, sortBy, router]);

  // Derived State (Filtering & Sorting)
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p => 
          p.name.toLowerCase().includes(q) || 
          p.brand?.toLowerCase().includes(q) || 
          p.description?.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category_id === selectedCategory);
    }

    result = result.filter(p => {
      const price = p.discount_price ?? p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (selectedRating) {
      result = result.filter(p => p.rating >= selectedRating);
    }

    result.sort((a, b) => {
      const priceA = a.discount_price ?? a.price;
      const priceB = b.discount_price ?? b.price;

      switch (sortBy) {
        case "price_asc": return priceA - priceB;
        case "price_desc": return priceB - priceA;
        case "rating": return b.rating - a.rating;
        case "reviews": return b.review_count - a.review_count;
        case "newest": return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "featured": return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default: return 0;
      }
    });

    return result;
  }, [products, searchQuery, selectedCategory, priceRange, selectedRating, sortBy]);

  // Pagination hook
  const { 
    currentPage, 
    totalPages, 
    nextPage,
    goToPage, 
    startIndex, 
    endIndex,
    itemsPerPage
  } = usePagination({ 
    totalItems: filteredAndSortedProducts.length, 
    initialItemsPerPage: 8 
  });

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    goToPage(1);
  }, [filteredAndSortedProducts.length, goToPage]);

  // Infinite Scroll Observer
  useEffect(() => {
    if (!useInfiniteScroll) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          setIsInfiniteLoading(true);
          setTimeout(() => {
            nextPage();
            setIsInfiniteLoading(false);
          }, 600); // Fake network delay for smooth UX
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [currentPage, totalPages, nextPage, useInfiniteScroll]);

  const displayedProducts = useInfiniteScroll
    ? filteredAndSortedProducts.slice(0, currentPage * itemsPerPage) // Append mode
    : filteredAndSortedProducts.slice(startIndex, endIndex); // Strict pagination mode

  const handleResetFilters = useCallback(() => {
    setSelectedCategory(null);
    setSearchQuery("");
    setPriceRange([0, 10000]);
    setSelectedRating(null);
    setSortBy("featured");
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full lg:w-72 shrink-0">
        <ProductSearch 
          onSearch={setSearchQuery} 
          initialValue={searchQuery}
          className="mb-8"
        />
        <div className="sticky top-24">
          <ProductFilters 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
          />
          <Button 
            variant="ghost" 
            onClick={handleResetFilters}
            className="w-full mt-4 text-stone-500 hover:text-stone-900 underline"
          >
            Reset All Filters
          </Button>
          
          <div className="mt-8 pt-6 border-t border-stone-200">
             <label className="flex items-center gap-3 cursor-pointer text-sm text-stone-600 font-medium">
                <input 
                  type="checkbox" 
                  checked={useInfiniteScroll} 
                  onChange={(e) => setUseInfiniteScroll(e.target.checked)}
                  className="accent-[#0F5A37] w-4 h-4"
                />
                Enable Infinite Scroll
             </label>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <p className="text-stone-500 font-medium">
            Showing <span className="text-stone-900 font-bold">{displayedProducts.length}</span> of <span className="text-stone-900 font-bold">{filteredAndSortedProducts.length}</span> results
          </p>
          <ProductSort 
            currentSort={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        <ProductGrid 
          products={displayedProducts}
          isLoading={productsLoading}
        />

        {/* Infinite Scroll target */}
        {useInfiniteScroll && currentPage < totalPages && (
          <div ref={observerTarget} className="h-24 w-full flex items-center justify-center mt-8">
            {isInfiniteLoading && (
              <div className="flex items-center gap-2 text-stone-500">
                <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
              </div>
            )}
          </div>
        )}

        {/* Manual Pagination UI (only show if not infinite scrolling OR if we want to let users jump pages) */}
        {!useInfiniteScroll && totalPages > 1 && (
          <div className="mt-16 border-t border-stone-100 pt-8">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      
      {/* Header Banner */}
      <div className="bg-[#0F5A37] text-white pt-32 pb-24 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Shop Our Collection</h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
          Explore our wide range of premium, modern furniture designed to transform your living spaces into sanctuaries of style.
        </p>
      </div>

      <Container className="py-16">
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading shop data...</div>}>
          <ShopContent />
        </Suspense>
      </Container>
      <Footer />
    </main>
  );
}
