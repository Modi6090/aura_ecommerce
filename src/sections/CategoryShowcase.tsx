"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function CategoryShowcase() {
  return (
    <section id="categories" className="py-16 bg-white">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Left Large Card (Chairs) */}
          <motion.div variants={itemVariants} className="lg:col-span-6 bg-[#FAFAFA] rounded-[32px] p-8 lg:p-10 relative overflow-hidden flex flex-col justify-between h-[600px]">
            <div className="z-10 relative max-w-[50%]">
              <div className="inline-block px-3 py-1 rounded-md bg-[#F9C80E]/10 text-[#F9C80E] font-bold text-sm mb-4">
                1500+ Items
              </div>
              <h2 className="text-4xl font-bold text-stone-900 mb-4">Chairs</h2>
              <p className="text-sm text-stone-500 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <ul className="flex flex-col gap-2 text-sm text-stone-500">
                <li className="hover:text-[#0F5A37] cursor-pointer transition-colors">Gaming Chair</li>
                <li className="hover:text-[#0F5A37] cursor-pointer transition-colors">Lounge Chair</li>
                <li className="hover:text-[#0F5A37] cursor-pointer transition-colors">Folding Chair</li>
                <li className="hover:text-[#0F5A37] cursor-pointer transition-colors">Dining Chair</li>
                <li className="hover:text-[#0F5A37] cursor-pointer transition-colors">Office Chair</li>
                <li className="hover:text-[#0F5A37] cursor-pointer transition-colors">Armchair</li>
                <li className="hover:text-[#0F5A37] cursor-pointer transition-colors">Bar Stool</li>
                <li className="hover:text-[#0F5A37] cursor-pointer transition-colors">Club Chair</li>
              </ul>
            </div>
            {/* Image container right side of the card */}
            <div className="absolute right-[-10%] bottom-0 h-[90%] w-[60%] flex items-end justify-end">
              <img 
                src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600" 
                alt="Chair" 
                className="object-contain h-full w-full object-right-bottom mix-blend-multiply"
              />
            </div>
          </motion.div>

          {/* Right Column with 2 stacked cards */}
          <div className="lg:col-span-6 flex flex-col gap-6 h-[600px]">
            {/* Top Right Card (Sofa) */}
            <motion.div variants={itemVariants} className="flex-1 bg-[#FAFAFA] rounded-[32px] p-8 relative overflow-hidden flex items-center">
              <div className="z-10 relative max-w-[50%]">
                <div className="inline-block px-3 py-1 rounded-md bg-[#F9C80E]/10 text-[#F9C80E] font-bold text-sm mb-4">
                  750+ Items
                </div>
                <h2 className="text-3xl font-bold text-stone-900 mb-4">Sofa</h2>
                <ul className="flex flex-col gap-2 text-sm text-stone-500">
                  <li className="hover:text-[#0F5A37] cursor-pointer transition-colors">Reception Sofa</li>
                  <li className="hover:text-[#0F5A37] cursor-pointer transition-colors">Sectional Sofa</li>
                  <li className="hover:text-[#0F5A37] cursor-pointer transition-colors">Armless Sofa</li>
                  <li className="hover:text-[#0F5A37] cursor-pointer transition-colors">Curved Sofa</li>
                </ul>
              </div>
              <div className="absolute right-0 bottom-0 h-full w-[50%] p-4 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&q=80&w=500" 
                  alt="Sofa" 
                  className="object-contain max-h-full w-full mix-blend-multiply"
                />
              </div>
            </motion.div>

            {/* Bottom Right Card (Lighting) */}
            <motion.div variants={itemVariants} className="flex-1 bg-[#FAFAFA] rounded-[32px] p-8 relative overflow-hidden flex items-center">
              <div className="z-10 relative max-w-[50%]">
                <div className="inline-block px-3 py-1 rounded-md bg-[#F9C80E]/10 text-[#F9C80E] font-bold text-sm mb-4">
                  450+ Items
                </div>
                <h2 className="text-3xl font-bold text-stone-900 mb-4">Lighting</h2>
                <ul className="flex flex-col gap-2 text-sm text-stone-500">
                  <li className="hover:text-[#0F5A37] cursor-pointer transition-colors">Table Lights</li>
                  <li className="hover:text-[#0F5A37] cursor-pointer transition-colors">Floor Lights</li>
                  <li className="hover:text-[#0F5A37] cursor-pointer transition-colors">Ceiling Lights</li>
                  <li className="hover:text-[#0F5A37] cursor-pointer transition-colors">Wall Lights</li>
                </ul>
              </div>
              <div className="absolute right-0 bottom-0 h-full w-[50%] p-4 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=500" 
                  alt="Lighting" 
                  className="object-contain max-h-full w-full mix-blend-multiply"
                />
              </div>
            </motion.div>
          </div>

        </motion.div>
      </Container>
    </section>
  );
}
