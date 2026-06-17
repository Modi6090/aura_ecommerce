"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useProduct } from "@/hooks/useProduct";
import { getRelatedProducts } from "@/services/productService";
import { Product } from "@/types/product";
import { ProductDetailsSkeleton } from "@/components/product/ProductDetailsSkeleton";
import { ProductRating } from "@/components/product/ProductRating";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { formatCurrency, cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Minus, Plus, ShoppingBag, Heart, ShieldCheck, Truck, ArrowLeft, RotateCcw, Star } from "lucide-react";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { product, loading, error } = useProduct(id);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (product) {
      getRelatedProducts(product.category_id, product.id)
        .then(setRelatedProducts)
        .catch(console.error);
    }
  }, [product]);

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (error || !product) {
    return (
      <Container className="py-32 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-stone-400" />
        </div>
        <h1 className="text-4xl font-bold text-stone-900 mb-4 tracking-tight">Product Not Found</h1>
        <p className="text-lg text-stone-500 mb-8 max-w-md">
          We couldn't find the product you're looking for. It might have been removed or the link is incorrect.
        </p>
        <Link href="/products">
          <Button variant="primary" size="lg">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Products
          </Button>
        </Link>
      </Container>
    );
  }

  const isDiscounted = product.discount_price && product.discount_price < product.price;
  const percentageOff = isDiscounted
    ? Math.round(((product.price - (product.discount_price || 0)) / product.price) * 100)
    : 0;

  const images = product.images?.length 
    ? product.images 
    : [{ id: 'default', image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80" }];

  const currentImage = images[mainImageIndex]?.image_url;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const getStockStatus = () => {
    if (product.stock === 0) return { label: "Out of Stock", color: "text-red-500", dot: "bg-red-500" };
    if (product.stock < 10) return { label: "Low Stock", color: "text-orange-500", dot: "bg-orange-500" };
    return { label: "In Stock", color: "text-[#0F5A37]", dot: "bg-[#0F5A37]" };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="bg-white">
      <Container className="py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-stone-500 mb-8">
          <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-stone-900 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-stone-900 font-medium truncate">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Left Side: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 sticky top-24 h-fit">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-stone-100 group">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {isDiscounted && (
                <div className="absolute top-6 left-6 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  -{percentageOff}% OFF
                </div>
              )}
            </div>
            
            {images.length > 1 && (
              <div 
                className="flex gap-4 overflow-x-auto pb-4 snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setMainImageIndex(index)}
                    className={cn(
                      "relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 snap-center transition-all duration-300",
                      mainImageIndex === index 
                        ? "ring-2 ring-[#0F5A37] ring-offset-2 opacity-100" 
                        : "opacity-60 hover:opacity-100"
                    )}
                  >
                    <img
                      src={image.image_url}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {product.brand && (
              <span className="text-stone-500 font-semibold tracking-wider uppercase text-sm mb-3">
                {product.brand}
              </span>
            )}
            
            <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 mb-6 tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-3 bg-stone-50 px-4 py-2 rounded-full">
                <ProductRating rating={product.rating} reviewCount={product.review_count} />
              </div>
              
              <div className="flex items-center gap-2">
                <span className={cn("w-2.5 h-2.5 rounded-full animate-pulse", stockStatus.dot)}></span>
                <span className={cn("font-medium", stockStatus.color)}>{stockStatus.label}</span>
              </div>
            </div>

            <div className="py-8 border-y border-stone-100 mb-8">
              <div className="flex items-end gap-4">
                {isDiscounted ? (
                  <>
                    <span className="text-5xl font-bold text-stone-900 tracking-tight">
                      {formatCurrency(product.discount_price ?? 0)}
                    </span>
                    <span className="text-2xl text-stone-400 line-through mb-1">
                      {formatCurrency(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-5xl font-bold text-stone-900 tracking-tight">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>
              <p className="text-stone-500 mt-2 text-sm">Taxes and shipping calculated at checkout.</p>
            </div>

            <p className="text-lg text-stone-600 mb-10 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-8 mb-10 text-sm text-stone-500">
              {product.sku && (
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-stone-900">SKU</span>
                  <span>{product.sku}</span>
                </div>
              )}
              {product.category_id && (
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-stone-900">Category</span>
                  <span className="capitalize">{product.category_id.replace('-', ' ')}</span>
                </div>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <span className="font-semibold text-stone-900">Quantity</span>
                <div className="flex items-center bg-stone-100 rounded-full p-1 border border-stone-200">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-semibold text-lg text-stone-900">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button 
                  size="lg" 
                  variant="primary"
                  className="flex-1 w-full text-lg shadow-lg shadow-[#0F5A37]/20"
                >
                  <ShoppingBag className="mr-2" size={20} />
                  Add to Cart
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="flex-1 w-full border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white text-lg"
                >
                  Buy Now
                </Button>
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="h-14 w-14 flex items-center justify-center rounded-full border-2 border-stone-200 text-stone-600 hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
                  aria-label="Add to wishlist"
                >
                  <Heart size={24} className={cn(isWishlisted && "fill-red-500 text-red-500")} />
                </button>
              </div>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 py-8 border-t border-stone-100">
              <div className="flex items-center gap-4 text-stone-600">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-[#0F5A37]">
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900">Free Shipping</h4>
                  <p className="text-sm">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-stone-600">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-[#0F5A37]">
                  <RotateCcw size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900">Free Returns</h4>
                  <p className="text-sm">Within 30 days</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-stone-600">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-[#0F5A37]">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900">Secure Checkout</h4>
                  <p className="text-sm">100% protected payments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Description Section */}
      <div className="bg-stone-50 py-24 border-y border-stone-100 mt-12">
        <Container>
          <div className="max-w-4xl mx-auto bg-white rounded-[2rem] p-8 md:p-16 shadow-sm border border-stone-100">
            <h2 className="text-3xl font-bold text-stone-900 mb-8">Product Details</h2>
            <div className="prose prose-stone prose-lg max-w-none text-stone-600">
              <p>{product.description}</p>
              {/* Additional mocked details could go here */}
              <p className="mt-6">
                Expertly crafted using premium materials, this product is designed to elevate your everyday experience. 
                The attention to detail in the construction ensures both durability and exceptional aesthetic appeal. 
                Whether you're looking for functionality or simply a stunning addition to your collection, 
                this piece delivers on all fronts.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Reviews Section */}
      <Container className="py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Customer Reviews</h2>
            <div className="flex items-center gap-4">
              <div className="flex gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={28} 
                    className={cn(star <= Math.round(product.rating) ? "fill-current" : "text-stone-200")} 
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-stone-900">{product.rating.toFixed(1)}</span>
              <span className="text-stone-500">Based on {product.review_count} reviews</span>
            </div>
          </div>
          <Button variant="outline">Write a Review</Button>
        </div>

        {product.review_count === 0 ? (
          <div className="bg-stone-50 rounded-3xl p-16 text-center border border-stone-100">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Star size={32} className="text-stone-300" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">No reviews yet</h3>
            <p className="text-stone-500 mb-8 max-w-md mx-auto">Be the first to review this product and share your thoughts with other customers.</p>
            <Button variant="primary">
              Write the first review
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mocked reviews since we don't have review fetching logic yet */}
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-500 font-bold text-lg">
                      {i === 1 ? 'JD' : 'AS'}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900">{i === 1 ? 'John Doe' : 'Alice Smith'}</h4>
                      <p className="text-sm text-stone-500">Verified Buyer</p>
                    </div>
                  </div>
                  <div className="flex gap-1 text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={16} 
                        className={cn(star <= (i === 1 ? 5 : 4) ? "fill-current" : "text-stone-200")} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-stone-600 leading-relaxed italic">
                  "{i === 1 
                    ? "Absolutely fantastic product! Exceeded all my expectations. The quality is top-notch and it looks even better in person." 
                    : "Really good quality, solid build. Shipping was fast too. Definitely recommend it."}"
                </p>
                <div className="mt-6 text-sm text-stone-400">
                  {i === 1 ? '2 days ago' : '1 week ago'}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-stone-100 bg-white pt-12 pb-24">
          <Container>
            <RelatedProducts products={relatedProducts} title="You May Also Like" />
          </Container>
        </div>
      )}
    </div>
  );
}
