"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import Dashboard from "@/components/dashboard";
import HeroSection from "@/components/HeroSection";
import HistoryPage from "./history/page";
import AboutUsSection from "./about/page";
import { FocusCardsDemo } from "@/components/Features";
import GlassBlocks from "@/components/ThreeBlock";

export default function Home() {
  const { state } = useApp();
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setInitialized(true);
    } else if (!state.isLoading) {
      router.push("/auth/login");
    }
  }, [state.isAuthenticated, state.isLoading, router]);

  if (!state.isAuthenticated && !initialized) {
    return (
      <div className="min-h-screen mint-gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#39D98A] mx-auto"></div>
          <p className="mt-4 text-gray-600">Restoring session...</p>
        </div>
      </div>
    );
  }

  if (!state.isAuthenticated) return null;

  return (
    <div className="min-h-screen mint-gradient-bg">
      <HeroSection />
      <Dashboard />
      <HistoryPage />
      <FocusCardsDemo />
      <AboutUsSection />
      <GlassBlocks />
    </div>
  );
}
