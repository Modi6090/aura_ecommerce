"use client";

import { useState } from "react";
import { Navbar } from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Plus, MapPin, Edit2, Trash2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Mock saved addresses
const mockAddresses = [
  {
    id: "addr-1",
    label: "Home",
    fullName: "John Doe",
    street: "123 Main St, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    phone: "+1 234 567 8900",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    fullName: "John Doe",
    street: "456 Corporate Blvd, Suite 200",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States",
    phone: "+1 987 654 3210",
    isDefault: false,
  }
];

export default function SavedAddressesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState(mockAddresses);

  if (loading) return null;
  if (!user) {
    router.push("/auth/login?redirect=/profile/addresses");
    return null;
  }

  const setAsDefault = (id: string) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
  };

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24">
        <Container className="max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-stone-900 mb-2">Saved Addresses</h1>
              <p className="text-stone-500">Manage your shipping and billing addresses for faster checkout.</p>
            </div>
            <Button className="bg-[#0F5A37] text-white flex items-center gap-2">
              <Plus size={18} />
              Add New Address
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <div 
                key={address.id} 
                className={`bg-white p-6 rounded-2xl border ${address.isDefault ? 'border-[#0F5A37] ring-1 ring-[#0F5A37]' : 'border-stone-200'} relative`}
              >
                {address.isDefault && (
                  <span className="absolute top-4 right-4 text-[#0F5A37] flex items-center gap-1 text-sm font-bold bg-[#0F5A37]/10 px-2 py-1 rounded-full">
                    <CheckCircle2 size={16} /> Default
                  </span>
                )}
                
                <div className="flex items-center gap-2 text-stone-900 font-bold mb-4">
                  <MapPin size={20} className="text-stone-400" />
                  {address.label}
                </div>
                
                <div className="space-y-1 text-stone-600 text-sm mb-6">
                  <p className="font-bold text-stone-900">{address.fullName}</p>
                  <p>{address.street}</p>
                  <p>{address.city}, {address.state} {address.zipCode}</p>
                  <p>{address.country}</p>
                  <p className="pt-2">📞 {address.phone}</p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                  <Button variant="outline" size="sm" className="flex-1 text-stone-600 hover:text-[#0F5A37]">
                    <Edit2 size={16} className="mr-2" /> Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => deleteAddress(address.id)}
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
                  >
                    <Trash2 size={16} className="mr-2" /> Delete
                  </Button>
                </div>

                {!address.isDefault && (
                  <button 
                    onClick={() => setAsDefault(address.id)}
                    className="w-full mt-3 text-sm font-medium text-[#0F5A37] hover:underline"
                  >
                    Set as default
                  </button>
                )}
              </div>
            ))}
          </div>

        </Container>
      </div>
      
      <Footer />
    </main>
  );
}
