import { Container } from "@/components/ui/Container";

export function ProductDetailsSkeleton() {
  return (
    <Container className="py-12 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="w-48 h-4 bg-stone-200 rounded-md mb-8"></div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Left Side: Images */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="w-full aspect-[4/5] bg-stone-200 rounded-2xl"></div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-24 h-24 flex-shrink-0 bg-stone-200 rounded-xl"></div>
            ))}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8 pt-4">
          {/* Title & Brand */}
          <div className="space-y-4">
            <div className="w-24 h-6 bg-stone-200 rounded-md"></div>
            <div className="w-full h-12 bg-stone-200 rounded-xl"></div>
            <div className="w-3/4 h-12 bg-stone-200 rounded-xl"></div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="w-32 h-6 bg-stone-200 rounded-md"></div>
            <div className="w-24 h-6 bg-stone-200 rounded-md"></div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 py-6 border-y border-stone-100">
            <div className="w-40 h-10 bg-stone-200 rounded-md"></div>
            <div className="w-24 h-8 bg-stone-200 rounded-md"></div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <div className="w-full h-4 bg-stone-200 rounded-md"></div>
            <div className="w-full h-4 bg-stone-200 rounded-md"></div>
            <div className="w-5/6 h-4 bg-stone-200 rounded-md"></div>
          </div>

          {/* Meta (SKU, Category) */}
          <div className="flex gap-8">
            <div className="w-24 h-6 bg-stone-200 rounded-md"></div>
            <div className="w-32 h-6 bg-stone-200 rounded-md"></div>
          </div>

          {/* Quantity */}
          <div className="w-40 h-12 bg-stone-200 rounded-full mt-4"></div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex-1 h-16 bg-stone-200 rounded-[24px]"></div>
            <div className="flex-1 h-16 bg-stone-200 rounded-[24px]"></div>
            <div className="w-16 h-16 bg-stone-200 rounded-full flex-shrink-0"></div>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-32 space-y-8">
        <div className="w-64 h-10 bg-stone-200 rounded-md"></div>
        <div className="w-full h-64 bg-stone-200 rounded-2xl"></div>
      </div>
    </Container>
  );
}
