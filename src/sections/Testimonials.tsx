"use client";

import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Container } from "@/components/ui/Container";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Interior Designer",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    review: "The quality of the furniture is absolutely outstanding. The minimal design fits perfectly in modern homes. Customer service was also top-notch.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Homeowner",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    review: "I bought the modern velvet sofa and it completely transformed my living room. It's incredibly comfortable and the fabric feels very premium.",
  },
  {
    id: 3,
    name: "Emma Watson",
    role: "Architect",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    review: "Great attention to detail and beautiful craftsmanship. The delivery was fast and the assembly instructions were clear. Highly recommended.",
  },
  {
    id: 4,
    name: "David Smith",
    role: "Real Estate Agent",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    review: "I furnish all my staging homes with Aura furniture. It gives every space that luxurious, high-end feel that buyers absolutely love.",
  },
];

export function Testimonials() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 5000 })]
  );

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#0F5A37]/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#F9C80E]/10 rounded-full blur-[100px]"></div>
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Thousands of happy customers have transformed their spaces with our furniture.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="overflow-hidden p-4 -m-4" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0">
                  <div className="bg-[#FAFAFA] rounded-[32px] p-8 md:p-10 h-full relative group hover:bg-white hover:shadow-premium transition-all duration-500 border border-stone-100">
                    <Quote className="absolute top-8 right-8 w-12 h-12 text-[#0F5A37]/10 group-hover:text-[#0F5A37]/20 transition-colors duration-500" />
                    
                    <div className="flex items-center gap-1 text-[#F9C80E] mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating ? "fill-current" : "text-stone-300"}`}
                        />
                      ))}
                    </div>

                    <p className="text-stone-700 text-lg md:text-xl leading-relaxed mb-10">
                      "{testimonial.review}"
                    </p>

                    <div className="flex items-center gap-4 mt-auto">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <h4 className="font-bold text-stone-900">{testimonial.name}</h4>
                        <p className="text-sm text-stone-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
