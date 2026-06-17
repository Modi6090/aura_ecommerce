"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const addressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
  postalCode: z.string().min(4, "Postal code is required"),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void;
  defaultValues?: Partial<AddressFormData>;
}

export function AddressForm({ onSubmit, defaultValues }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: defaultValues?.fullName || "",
      phone: defaultValues?.phone || "",
      address: defaultValues?.address || "",
      city: defaultValues?.city || "",
      state: defaultValues?.state || "",
      country: defaultValues?.country || "",
      postalCode: defaultValues?.postalCode || "",
    },
  });

  return (
    <form id="address-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
          <Input {...register("fullName")} className={errors.fullName ? "border-red-500" : ""} />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
          <Input {...register("phone")} className={errors.phone ? "border-red-500" : ""} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Address</label>
        <Input {...register("address")} className={errors.address ? "border-red-500" : ""} />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-stone-700 mb-1">City</label>
          <Input {...register("city")} className={errors.city ? "border-red-500" : ""} />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-stone-700 mb-1">State</label>
          <Input {...register("state")} className={errors.state ? "border-red-500" : ""} />
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-stone-700 mb-1">ZIP</label>
          <Input {...register("postalCode")} className={errors.postalCode ? "border-red-500" : ""} />
          {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Country</label>
        <Input {...register("country")} className={errors.country ? "border-red-500" : ""} />
        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
      </div>
    </form>
  );
}
