"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ThumbsUp, Send, Camera, PlayCircle, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white pt-24 pb-8 border-t border-stone-200">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="text-3xl font-bold tracking-tight text-[#0F5A37] mb-6 block">
              AURA.
            </Link>
            <p className="text-stone-500 mb-8 max-w-sm leading-relaxed">
              We create premium, modern furniture designed to transform your living space into a sanctuary of style and comfort.
            </p>
            <div className="flex items-center gap-4 text-stone-400">
              <a href="#" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-[#0F5A37] hover:text-white hover:border-[#0F5A37] transition-all">
                <ThumbsUp className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-[#0F5A37] hover:text-white hover:border-[#0F5A37] transition-all">
                <Send className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-[#0F5A37] hover:text-white hover:border-[#0F5A37] transition-all">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-[#0F5A37] hover:text-white hover:border-[#0F5A37] transition-all">
                <PlayCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 mb-6 text-lg">Shop</h4>
            <ul className="flex flex-col gap-4 text-stone-500">
              <li><Link href="#" className="hover:text-[#0F5A37] transition-colors">Living Room</Link></li>
              <li><Link href="#" className="hover:text-[#0F5A37] transition-colors">Bedroom</Link></li>
              <li><Link href="#" className="hover:text-[#0F5A37] transition-colors">Dining Room</Link></li>
              <li><Link href="#" className="hover:text-[#0F5A37] transition-colors">Home Office</Link></li>
              <li><Link href="#" className="hover:text-[#0F5A37] transition-colors">Lighting</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 mb-6 text-lg">Company</h4>
            <ul className="flex flex-col gap-4 text-stone-500">
              <li><Link href="#" className="hover:text-[#0F5A37] transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-[#0F5A37] transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-[#0F5A37] transition-colors">Our Blog</Link></li>
              <li><Link href="#" className="hover:text-[#0F5A37] transition-colors">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-[#0F5A37] transition-colors">Press</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 mb-6 text-lg">Support</h4>
            <ul className="flex flex-col gap-4 text-stone-500">
              <li><Link href="#" className="hover:text-[#0F5A37] transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-[#0F5A37] transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-[#0F5A37] transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-[#0F5A37] transition-colors">Track Order</Link></li>
              <li><Link href="#" className="hover:text-[#0F5A37] transition-colors">Warranty</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4 text-stone-500 text-sm">
          <p>© 2026 Aura Furniture. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#0F5A37] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#0F5A37] transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-[#0F5A37] transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
