"use client";

import { Container } from "@/components/ui/Container";

const logos = ["IKEA", "Ashley", "Steelcase", "Herman Miller", "Philips"];

export function BrandLogos() {
  return (
    <section className="py-16 bg-[#FAFAFA] border-y border-stone-200 overflow-hidden">
      <Container>
        <div className="flex flex-col items-center">
          <p className="text-sm font-semibold text-stone-400 uppercase tracking-widest mb-8">
            Trusted by the world's best brands
          </p>
          
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
              {[...logos, ...logos, ...logos].map((logo, index) => (
                <li key={index} className="text-2xl md:text-3xl font-bold text-stone-300 opacity-60 hover:opacity-100 hover:text-stone-400 transition-all duration-300 whitespace-nowrap">
                  {logo}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
