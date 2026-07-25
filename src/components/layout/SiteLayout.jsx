"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
