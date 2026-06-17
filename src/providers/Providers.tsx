'use client';

import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'sonner';

import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Toaster position="top-center" richColors />
          {children}
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};
