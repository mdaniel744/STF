import React from "react";
import HeroSection from "@/components/home/HeroSection";
import SizeCards from "@/components/home/SizeCards";
import CategoryGrid from "@/components/home/CategoryGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ContainerFinder from "@/components/home/ContainerFinder";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SizeCards />
      <CategoryGrid />
      <WhyChooseUs />
      <FeaturedProducts />
      <ContainerFinder />
    </>
  );
}