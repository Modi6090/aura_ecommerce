"use client";

import { useState, useEffect } from "react";
import { Review } from "@/types/review";
import { getProductReviews, addReview } from "@/lib/reviews";
import { useAuth } from "@/context/AuthContext";
import { Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getProductReviews(productId)
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to write a review");
      return;
    }
    if (!reviewText.trim()) {
      toast.error("Please write a review");
      return;
    }

    setSubmitting(true);
    try {
      const newReview = await addReview(productId, user.id, rating, reviewText);
      setReviews([newReview, ...reviews]);
      setReviewText("");
      toast.success("Review submitted successfully");
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : 0;

  if (loading) {
    return <div className="h-40 bg-stone-100 animate-pulse rounded-2xl"></div>;
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Customer Reviews</h2>
          <div className="flex items-center gap-4">
            <div className="flex gap-1 text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={28} 
                  className={cn(star <= Math.round(averageRating) ? "fill-current" : "text-stone-200")} 
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-stone-900">{averageRating.toFixed(1)}</span>
            <span className="text-stone-500">Based on {reviews.length} reviews</span>
          </div>
        </div>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
          <h3 className="text-lg font-bold text-stone-900 mb-4">Write a Review</h3>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                type="button"
                key={star} 
                onClick={() => setRating(star)}
                className={cn(star <= rating ? "text-yellow-400 fill-yellow-400" : "text-stone-300")}
              >
                <Star size={24} className={star <= rating ? "fill-current" : ""} />
              </button>
            ))}
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your thoughts about this product..."
            className="w-full h-32 p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#0F5A37] mb-4"
          />
          <Button type="submit" disabled={submitting} className="bg-[#0F5A37] text-white">
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      ) : (
        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 text-center">
          <p className="text-stone-600 mb-4">Please log in to write a review.</p>
          <Button variant="outline" onClick={() => window.location.href = '/auth/login'}>Log In</Button>
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-stone-100">
          <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <MessageSquare size={32} className="text-stone-300" />
          </div>
          <h3 className="text-2xl font-bold text-stone-900 mb-2">No reviews yet</h3>
          <p className="text-stone-500 max-w-md mx-auto">Be the first to review this product and share your thoughts with other customers.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-full overflow-hidden flex items-center justify-center text-[#0F5A37] font-bold text-lg">
                    {review.profiles?.avatar_url ? (
                      <img src={review.profiles.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      review.profiles?.full_name?.charAt(0) || "U"
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">{review.profiles?.full_name || "User"}</h4>
                    <p className="text-sm text-stone-500">Verified Buyer</p>
                  </div>
                </div>
                <div className="flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={16} 
                      className={cn(star <= review.rating ? "fill-current" : "text-stone-200")} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-stone-600 leading-relaxed italic">
                "{review.review}"
              </p>
              <div className="mt-6 text-sm text-stone-400">
                {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
