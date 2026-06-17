export function ProductSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[4/5] bg-stone-200 w-full" />

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col gap-4">
        {/* Rating Skeleton */}
        <div className="w-24 h-4 bg-stone-200 rounded" />
        
        {/* Title Skeleton */}
        <div className="w-3/4 h-6 bg-stone-200 rounded" />
        
        {/* Description Skeleton */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-stone-200 rounded" />
          <div className="w-5/6 h-3 bg-stone-200 rounded" />
        </div>

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between mt-4">
          <div className="w-16 h-6 bg-stone-200 rounded" />
          <div className="w-10 h-10 bg-stone-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}
