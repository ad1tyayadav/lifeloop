"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";

export default function Header() {
  const { logout } = useApp();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("hero");

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const sections = [
      "hero",
      "simulation-section",
      "history",
      "features",
      "about",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, threshold: 0.5 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="bg-[#E6F4F1] sticky top-0 z-50 border-b border-[#39D98A]/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between rounded-t-2xl">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-[#39D98A]">
          LIFELOOP
        </Link>

        {/* Center Navigation */}
        <nav className="flex items-center gap-3 px-3 py-1">
          {[
            { label: "Home", id: "hero" },
            { label: "Impact Studio", id: "simulation-section" },
            { label: "Archive", id: "history" },
            { label: "Features", id: "features" },
            { label: "About", id: "about" },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleScroll(item.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeSection === item.id
                    ? "bg-[#F2FFF9] text-gray-900 border border-[#39D98A]/30 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-[#F2FFF9]"
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Button */}
        <button
          onClick={handleLogout}
          className="bg-black text-white text-sm px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
