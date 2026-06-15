"use client";

import { useState } from "react";
import { Navbar } from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { Container } from "@/components/ui/Container";
import { Star, Heart, Maximize2, ShoppingBag } from "lucide-react";

const categories = ["Living Room", "Bedroom", "Dining Room", "Office"];

const initialProducts = [
  {
    id: 1,
    name: "Wooden Sofa Chair",
    category: "Living Room",
    price: 80.00,
    originalPrice: 160.00,
    rating: 4.9,
    badge: "50% off",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Circular Sofa Chair",
    category: "Living Room",
    price: 108.00,
    originalPrice: 120.00,
    rating: 5.0,
    badge: "10% off",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Wooden Nightstand",
    category: "Bedroom",
    price: 54.00,
    originalPrice: 60.00,
    rating: 4.8,
    badge: "10% off",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    name: "Bean Bag Chair",
    category: "Living Room",
    price: 72.00,
    originalPrice: 80.00,
    rating: 4.7,
    badge: "10% off",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 5,
    name: "Velvet Accent Chair",
    category: "Living Room",
    price: 180.00,
    originalPrice: 240.00,
    rating: 4.9,
    badge: "25% off",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 6,
    name: "Minimalist Coffee Table",
    category: "Living Room",
    price: 150.00,
    originalPrice: 200.00,
    rating: 4.8,
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 7,
    name: "Modern Shelf Unit",
    category: "Office",
    price: 90.00,
    originalPrice: 110.00,
    rating: 4.6,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 8,
    name: "Tufted Chesterfield Sofa",
    category: "Living Room",
    price: 650.00,
    originalPrice: 800.00,
    rating: 5.0,
    badge: "15% off",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 9,
    name: "Industrial Pendant Light",
    category: "Office",
    price: 45.00,
    originalPrice: 60.00,
    rating: 4.7,
    badge: "Featured",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 10,
    name: "Oak Dining Table",
    category: "Dining Room",
    price: 320.00,
    originalPrice: 400.00,
    rating: 4.9,
    badge: "Featured",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 11,
    name: "Luxury King Bed Frame",
    category: "Bedroom",
    price: 850.00,
    originalPrice: 1000.00,
    rating: 5.0,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 12,
    name: "Sleek Desk Lamp",
    category: "Office",
    price: 35.00,
    originalPrice: 50.00,
    rating: 4.5,
    badge: "New",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600",
  }
];

export default function Shop() {
  const [selectedCats, setSelectedCats] = useState<string[]>(categories);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<string>("default");

  const isAllSelected = selectedCats.length === categories.length;

  const handleAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCats(categories);
    } else {
      setSelectedCats([]);
    }
  };

  const handleCatChange = (cat: string) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter((c) => c !== cat));
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const filteredProducts = initialProducts.filter((p) => {
    const matchesCategory = selectedCats.includes(p.category);
    const matchesPrice = p.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "lowToHigh") return a.price - b.price;
    if (sortBy === "highToLow") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // default sorted by array index / id
  });

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      
      {/* Header Banner */}
      <div className="bg-[#0F5A37] text-white py-20 mt-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop Our Collection</h1>
        <p className="text-white/80 max-w-xl mx-auto">Explore our wide range of premium, modern furniture designed for your living spaces.</p>
      </div>

      <Container className="py-16">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <h3 className="font-bold text-lg text-stone-900 mb-6">Categories</h3>
            <ul className="space-y-3 text-stone-600 mb-10">
              <li>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[#0F5A37]">
                  <input
                    type="checkbox"
                    className="accent-[#0F5A37] w-4 h-4"
                    checked={isAllSelected}
                    onChange={handleAllChange}
                  />
                  All
                </label>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <label className="flex items-center gap-3 cursor-pointer hover:text-[#0F5A37]">
                    <input
                      type="checkbox"
                      className="accent-[#0F5A37] w-4 h-4"
                      checked={selectedCats.includes(cat)}
                      onChange={() => handleCatChange(cat)}
                    />
                    {cat}
                  </label>
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-lg text-stone-900 mb-6">Price Range</h3>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0F5A37]"
              />
              <div className="flex justify-between text-sm text-stone-500 font-medium">
                <span>$0</span>
                <span>Max: ${maxPrice}</span>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-stone-500 font-medium">
                Showing {sortedProducts.length} results
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-stone-200 rounded-full text-stone-700 text-sm focus:outline-none focus:border-[#0F5A37]"
              >
                <option value="default">Default Sorting</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[24px] border border-stone-100 shadow-sm">
                <p className="text-stone-500 text-lg">No products match your selected filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="group flex flex-col">
                    {/* Image Container */}
                    <div className="relative bg-white rounded-[24px] aspect-[4/5] mb-4 overflow-hidden p-6 flex items-center justify-center border border-stone-100 shadow-sm transition-shadow hover:shadow-md">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Badge */}
                      {product.badge && (
                        <div className="absolute top-4 left-4 bg-[#0F5A37] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                          {product.badge}
                        </div>
                      )}

                      {/* Hover Action Buttons */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-600 hover:text-[#0F5A37] hover:shadow-md transition-all border border-stone-100">
                          <Heart className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-600 hover:text-[#0F5A37] hover:shadow-md transition-all border border-stone-100">
                          <Maximize2 className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-600 hover:text-[#0F5A37] hover:shadow-md transition-all border border-stone-100">
                          <ShoppingBag className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col px-2">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs text-stone-500">{product.category}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-[#F9C80E] text-[#F9C80E]" />
                          <span className="text-xs font-bold text-stone-700">{product.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-stone-900 mb-2">{product.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-stone-900">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-stone-400 line-through">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            <div className="flex justify-center mt-16 gap-2">
              <button className="w-10 h-10 rounded-full bg-[#0F5A37] text-white font-bold">1</button>
              <button className="w-10 h-10 rounded-full bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 font-bold transition-colors">2</button>
              <button className="w-10 h-10 rounded-full bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 font-bold transition-colors">3</button>
              <button className="w-10 h-10 rounded-full bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 font-bold transition-colors">...</button>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}
