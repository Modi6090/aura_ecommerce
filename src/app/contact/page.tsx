import { Navbar } from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { Container } from "@/components/ui/Container";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      
      {/* Header Banner */}
      <div className="bg-[#0F5A37] text-white py-20 mt-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-white/80 max-w-xl mx-auto">We'd love to hear from you. Please fill out the form below or reach out to us using the contact details provided.</p>
      </div>

      <Container className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <div className="bg-white rounded-[32px] p-10 shadow-soft border border-stone-100">
            <h2 className="text-3xl font-bold text-stone-900 mb-8">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#0F5A37] focus:ring-1 focus:ring-[#0F5A37] transition-all" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#0F5A37] focus:ring-1 focus:ring-[#0F5A37] transition-all" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#0F5A37] focus:ring-1 focus:ring-[#0F5A37] transition-all" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Subject</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#0F5A37] focus:ring-1 focus:ring-[#0F5A37] transition-all" placeholder="How can we help?" />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#0F5A37] focus:ring-1 focus:ring-[#0F5A37] transition-all resize-none" placeholder="Your message here..."></textarea>
              </div>

              <button type="button" className="w-full py-4 rounded-xl bg-[#0F5A37] text-white font-bold text-lg hover:bg-[#0c472c] transition-colors shadow-md">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-stone-900 mb-6">Get In Touch</h2>
            <p className="text-stone-500 mb-12 max-w-md leading-relaxed">
              Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-[#F9C80E]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#F9C80E]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">Head Office</h3>
                  <p className="text-stone-500 leading-relaxed">
                    123 Furniture Lane, Design District<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-[#0F5A37]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#0F5A37]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">Phone</h3>
                  <p className="text-stone-500 leading-relaxed">
                    +1 (555) 123-4567<br />
                    Mon - Fri, 9am - 6pm EST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-[#0F5A37]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#0F5A37]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">Email</h3>
                  <p className="text-stone-500 leading-relaxed">
                    support@aurafurniture.com<br />
                    sales@aurafurniture.com
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>

      <Footer />
    </main>
  );
}
