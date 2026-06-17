export interface WishlistItem {
  id: string;
  product_id: string;
  user_id: string;
  created_at?: string;

  // Joined from products table
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: number;
  stock?: number;
}
