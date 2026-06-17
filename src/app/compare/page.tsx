"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { Container } from "@/components/ui/Container";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { Loader2, Check, X, Star } from "lucide-react";
import { Suspense } from "react";

function ComparePageContent() {
  const searchParams = useSearchParams();
  const productIds = searchParams.get("products")?.split(",") || [];
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (productIds.length > 0) {
        const { data } = await supabase
          .from("products")
          .select("*, product_images(image_url)")
          .in("id", productIds);
        
        if (data) {
          // Map product_images to images array format expected by frontend
          const formattedData = data.map((p: any) => ({
            ...p,
            images: p.product_images || []
          }));
          setProducts(formattedData);
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-50 flex flex-col items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#0F5A37]" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24">
        <Container>
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-stone-900 mb-4">Compare Products</h1>
            <p className="text-stone-500 max-w-2xl mx-auto">Analyze features, pricing, and ratings side-by-side to make the best purchasing decision.</p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-stone-100 shadow-sm">
              <p className="text-stone-500">No products selected for comparison.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead>
                  <tr className="border-b border-stone-100">
                    <th className="p-6 w-48 bg-stone-50 rounded-tl-3xl border-r border-stone-100">Features</th>
                    {products.map((product) => (
                      <th key={product.id} className="p-6 text-center border-r border-stone-100 last:border-r-0 min-w-[250px]">
                        <div className="aspect-square w-full bg-stone-50 rounded-2xl overflow-hidden mb-4 p-4 flex items-center justify-center">
                          <img 
                            src={product.images?.[0]?.image_url || "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80"} 
                            alt={product.name}
                            className="max-w-full max-h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <h3 className="font-bold text-stone-900 text-lg">{product.name}</h3>
                        <p className="text-[#0F5A37] font-bold text-xl mt-2">{formatCurrency(product.price)}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-600">
                  <tr>
                    <td className="p-6 font-semibold bg-stone-50 border-r border-stone-100">Brand</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-6 text-center border-r border-stone-100 last:border-r-0 capitalize">
                        {product.brand || "Unbranded"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-6 font-semibold bg-stone-50 border-r border-stone-100">Rating</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-6 text-center border-r border-stone-100 last:border-r-0">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="text-yellow-400 fill-yellow-400" size={16} />
                          <span className="font-bold text-stone-900">{product.rating.toFixed(1)}</span>
                          <span className="text-sm text-stone-400">({product.review_count})</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-6 font-semibold bg-stone-50 border-r border-stone-100">Availability</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-6 text-center border-r border-stone-100 last:border-r-0">
                        {product.stock > 0 ? (
                          <span className="inline-flex items-center gap-1 text-green-600 font-semibold"><Check size={16} /> In Stock</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-500 font-semibold"><X size={16} /> Out of Stock</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-6 font-semibold bg-stone-50 border-r border-stone-100">Description</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-6 text-center border-r border-stone-100 last:border-r-0 text-sm">
                        {product.description}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Container>
      </div>
      
      <Footer />
    </main>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center"><Loader2 size={40} className="animate-spin text-[#0F5A37]" /></div>}>
      <ComparePageContent />
    </Suspense>
  );
}
