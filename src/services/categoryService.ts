import { supabase } from "@/lib/supabase";
import { Category } from "@/types/category";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*");

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn("Supabase fetch failed, returning mock data.", error);
    return [
      {
        id: "1",
        name: "Chairs",
        slug: "chairs",
        image_url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "2",
        name: "Sofas",
        slug: "sofas",
        image_url: "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "3",
        name: "Lighting",
        slug: "lighting",
        image_url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "4",
        name: "Tables",
        slug: "tables",
        image_url: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "5",
        name: "Storage",
        slug: "storage",
        image_url: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "6",
        name: "Beds",
        slug: "beds",
        image_url: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800",
      }
    ];
  }
};  