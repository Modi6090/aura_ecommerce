import { Navbar } from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { Container } from "@/components/ui/Container";

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <div className="bg-[#FAFAFA] pt-40 pb-20 mt-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-stone-900 mb-6">Crafting Comfort for Your Modern Life</h1>
            <p className="text-lg text-stone-500 leading-relaxed">
              We believe that furniture is more than just functional pieces in a room. It's about creating an environment that reflects your personality, supports your lifestyle, and brings comfort to your everyday moments.
            </p>
          </div>
        </Container>
      </div>

      {/* Our Story */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-[32px] overflow-hidden aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=1200" 
                alt="Our Workshop" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-[#0F5A37]/10 text-[#0F5A37] font-bold text-sm mb-6">
                Our Story
              </div>
              <h2 className="text-4xl font-bold text-stone-900 mb-6">It Started with a Simple Idea</h2>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Founded in 2020, Aura began with a simple mission: to make high-quality, beautifully designed furniture accessible to everyone. Frustrated by the compromise between cheap, disposable furniture and impossibly expensive designer pieces, we set out to create a new standard.
              </p>
              <p className="text-stone-600 leading-relaxed">
                By partnering directly with master craftsmen and sustainable material suppliers, we cut out the middlemen. The result? Premium furniture that doesn't just look good, but feels good and lasts a lifetime.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#0F5A37] text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Core Values</h2>
            <p className="text-white/80">Everything we do is guided by these principles to ensure we deliver the best possible experience to you.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center px-4">
              <div className="w-16 h-16 rounded-full bg-[#F9C80E] flex items-center justify-center mx-auto mb-6 text-stone-900 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">Uncompromising Quality</h3>
              <p className="text-white/80">We use only the finest, sustainably sourced materials to ensure our furniture stands the test of time.</p>
            </div>
            <div className="text-center px-4">
              <div className="w-16 h-16 rounded-full bg-[#F9C80E] flex items-center justify-center mx-auto mb-6 text-stone-900 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">Timeless Design</h3>
              <p className="text-white/80">Trends come and go. Our designs are rooted in timeless elegance, ensuring they never go out of style.</p>
            </div>
            <div className="text-center px-4">
              <div className="w-16 h-16 rounded-full bg-[#F9C80E] flex items-center justify-center mx-auto mb-6 text-stone-900 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">Customer First</h3>
              <p className="text-white/80">From seamless browsing to white-glove delivery, your satisfaction is our highest priority.</p>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
