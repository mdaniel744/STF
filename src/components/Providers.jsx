"use client";

import { Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/AuthContext";
import { CartProvider } from "@/lib/CartContext";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { queryClientInstance } from "@/lib/query-client";
import ScrollToTop from "@/components/ScrollToTop";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Suspense fallback={null}>
          <LanguageProvider>
            <CartProvider>
              <ScrollToTop />
              {children}
            </CartProvider>
          </LanguageProvider>
        </Suspense>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}
