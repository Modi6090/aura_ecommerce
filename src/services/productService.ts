import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn("Using mock products due to Supabase error:", err);
    return [
      {
        id: "1",
        name: "Wooden Sofa Chair",
        slug: "wooden-sofa-chair",
        category_id: "chairs",
        brand: "Aura",
        description: "A comfortable wooden sofa chair.",
        price: 80.00,
        discount_price: 40.00,
        rating: 4.9,
        review_count: 120,
        stock: 50,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        images: [{ id: "1", image_url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600" }]
      },
      {
        id: "2",
        name: "Circular Sofa Chair",
        slug: "circular-sofa-chair",
        category_id: "sofas",
        brand: "Aura",
        description: "Modern circular sofa chair.",
        price: 108.00,
        discount_price: 97.20,
        rating: 5.0,
        review_count: 85,
        stock: 30,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        images: [{ id: "2", image_url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600" }]
      },
      {
        id: "3",
        name: "Wooden Nightstand",
        slug: "wooden-nightstand",
        category_id: "tables",
        brand: "Woodline",
        description: "Minimalist wooden nightstand for your bedroom.",
        price: 54.00,
        discount_price: 48.60,
        rating: 4.8,
        review_count: 200,
        stock: 100,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        images: [{ id: "3", image_url: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=600" }]
      },
      {
        id: "4",
        name: "Bean Bag Chair",
        slug: "bean-bag-chair",
        category_id: "chairs",
        brand: "ComfortPlus",
        description: "Soft and cozy bean bag chair.",
        price: 72.00,
        discount_price: undefined,
        rating: 4.7,
        review_count: 320,
        stock: 0,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        images: [{ id: "4", image_url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600" }]
      },
      {
        id: "5",
        name: "Velvet Accent Chair",
        slug: "velvet-accent-chair",
        category_id: "chairs",
        brand: "LuxuryHome",
        description: "Premium velvet accent chair.",
        price: 180.00,
        discount_price: 135.00,
        rating: 4.9,
        review_count: 45,
        stock: 15,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        images: [{ id: "5", image_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600" }]
      },
      {
        id: "6",
        name: "Minimalist Coffee Table",
        slug: "minimalist-coffee-table",
        category_id: "tables",
        brand: "Aura",
        description: "Sleek and minimalist coffee table.",
        price: 150.00,
        discount_price: undefined,
        rating: 4.8,
        review_count: 150,
        stock: 25,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        images: [{ id: "6", image_url: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600" }]
      },
      {
        id: "7",
        name: "Modern Shelf Unit",
        slug: "modern-shelf-unit",
        category_id: "storage",
        brand: "StorageCo",
        description: "Spacious modern shelf unit.",
        price: 90.00,
        discount_price: undefined,
        rating: 4.6,
        review_count: 89,
        stock: 40,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        images: [{ id: "7", image_url: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600" }]
      },
      {
        id: "8",
        name: "Tufted Chesterfield Sofa",
        slug: "tufted-chesterfield-sofa",
        category_id: "sofas",
        brand: "LuxuryHome",
        description: "Classic tufted chesterfield sofa.",
        price: 650.00,
        discount_price: 552.50,
        rating: 5.0,
        review_count: 210,
        stock: 10,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        images: [{ id: "8", image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600" }]
      },
      {
        id: "9",
        name: "Industrial Pendant Light",
        slug: "industrial-pendant-light",
        category_id: "lighting",
        brand: "Aura",
        description: "Vintage industrial pendant light.",
        price: 45.00,
        discount_price: undefined,
        rating: 4.7,
        review_count: 67,
        stock: 80,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        images: [{ id: "9", image_url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600" }]
      },
      {
        id: "10",
        name: "Oak Dining Table",
        slug: "oak-dining-table",
        category_id: "tables",
        brand: "Woodline",
        description: "Large oak dining table.",
        price: 320.00,
        discount_price: undefined,
        rating: 4.9,
        review_count: 42,
        stock: 12,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        images: [{ id: "10", image_url: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=600" }]
      },
      {
        id: "11",
        name: "Luxury King Bed Frame",
        slug: "luxury-king-bed-frame",
        category_id: "beds",
        brand: "DreamSleep",
        description: "Premium luxury king bed frame.",
        price: 850.00,
        discount_price: undefined,
        rating: 5.0,
        review_count: 15,
        stock: 8,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        images: [{ id: "11", image_url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600" }]
      },
      {
        id: "12",
        name: "Sleek Desk Lamp",
        slug: "sleek-desk-lamp",
        category_id: "lighting",
        brand: "Aura",
        description: "Modern sleek desk lamp.",
        price: 35.00,
        discount_price: undefined,
        rating: 4.5,
        review_count: 320,
        stock: 200,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        images: [{ id: "12", image_url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600" }]
      }
    ];
  }
};

// Get product by id
export const getProductById = async (
  id: string
): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};

// Get products by category
export const getProductsByCategory = async (
  categoryId: string
): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId);

  if (error) throw error;

  return data || [];
};

// Get featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true);

  if (error) throw error;

  return data || [];
};

// Search products
export const searchProducts = async (
  query: string
): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("name", `%${query}%`);

  if (error) throw error;

  return data || [];
};

// Related products
export const getRelatedProducts = async (
  categoryId: string,
  currentProductId: string
): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .neq("id", currentProductId)
    .limit(4);

  if (error) throw error;

  return data || [];
};