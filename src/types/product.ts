export interface ProductImage {
  id: string;
  image_url: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;

  price: number;
  discount_price?: number;

  stock: number;

  sku?: string;
  brand?: string;

  category_id: string;

  featured: boolean;

  rating: number;

  review_count: number;

  created_at: string;
  updated_at: string;

  images?: ProductImage[];
}