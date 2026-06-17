import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductRatingProps {
  rating: number;
  reviewCount?: number;
  className?: string;
  size?: number;
}

export function ProductRating({ rating, reviewCount, className, size = 16 }: ProductRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex text-amber-500">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={size} className="fill-current" />
        ))}
        {hasHalfStar && <StarHalf size={size} className="fill-current" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-stone-300" />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-sm text-stone-500 ml-1">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
