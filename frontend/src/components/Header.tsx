"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { logout } = useApp();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
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

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Impact Studio", id: "simulation-section" },
    { label: "Archive", id: "history" },
    { label: "Features", id: "features" },
    { label: "About", id: "about" },
  ];

  return (
    <header className="bg-[#E6F4F1] sticky top-0 z-50 border-b border-[#39D98A]/20 backdrop-blur-md">
      <div className="max-w-8xl mx-auto px-6 py-3 flex items-center justify-between rounded-t-2xl">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-[#6d8298]">
          LIFELOOP
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3 px-3 py-1">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleScroll(item.id)}
              className={`relative flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeSection === item.id
                    ? "bg-[#F2FFF9] text-gray-900 border border-[#39D98A]/30 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-[#F2FFF9]"
                }`}
            >
              {/* Dot indicator */}
              <span
                className={`w-2 h-2 rounded-full border border-black ${
                  activeSection === item.id ? "bg-black" : "bg-transparent"
                }`}
              ></span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Button */}
        <button
          onClick={handleLogout}
          className="hidden md:block bg-black text-white text-sm px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Logout
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-black"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#E6F4F1] border-t border-[#39D98A]/20 px-6 py-4 space-y-2">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleScroll(item.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  activeSection === item.id
                    ? "bg-[#F2FFF9] text-gray-900 border border-[#39D98A]/30 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-[#F2FFF9]"
                }`}
            >
              <span
                className={`w-2 h-2 rounded-full border border-black ${
                  activeSection === item.id ? "bg-black" : "bg-transparent"
                }`}
              ></span>
              {item.label}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="w-full bg-black text-white text-sm px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
