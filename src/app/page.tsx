import { Navbar } from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { Hero } from "@/sections/Hero";
import { Features } from "@/sections/Features";
import { CategoryShowcase } from "@/sections/CategoryShowcase";
import { Products } from "@/sections/Products";

import { TrendingCarousel } from "@/sections/TrendingCarousel";
import { Testimonials } from "@/sections/Testimonials";
import { BrandLogos } from "@/sections/BrandLogos";
import { Newsletter } from "@/sections/Newsletter";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <CategoryShowcase />
      <Products />

      <TrendingCarousel />
      <Testimonials />
      <BrandLogos />
      <Newsletter />
      <Footer />
    </main>
  );
}
