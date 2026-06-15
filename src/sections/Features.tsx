"use client";

import { motion } from "framer-motion";
import { Package, Wallet, HeadphonesIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";

const features = [
  {
    title: "Free Shipping",
    description: "Free shipping for order above $150",
    icon: Package,
    color: "text-[#F9C80E]",
    bg: "bg-[#F9C80E]/10",
  },
  {
    title: "Flexible Payment",
    description: "Multiple secure payment options",
    icon: Wallet,
    color: "text-[#F9C80E]",
    bg: "bg-[#F9C80E]/10",
  },
  {
    title: "24x7 Support",
    description: "We support online all days",
    icon: HeadphonesIcon,
    color: "text-[#F9C80E]",
    bg: "bg-[#F9C80E]/10",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Features() {
  return (
    <section className="py-12 bg-white">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row justify-between items-center gap-8 px-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-4 w-full md:w-auto"
              >
                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">{feature.title}</h3>
                  <p className="text-sm text-stone-500">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
