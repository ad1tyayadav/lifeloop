/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white to-[#ECFFF9]">
        {/* <div className="h-[1px] w-full mx-auto bg-gradient-to-r from-[#39D98A] via-[#2dbd7a] to-[#39D98A] rounded-full mb-6"></div> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* Brand Section */}
          <div className="flex-1 max-w-md">
            <Link
              href="/"
              className="text-2xl font-bold text-[#6d8298] hover:opacity-80 transition-opacity inline-block mb-3"
            >
              LIFELOOP
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Predict the ripple. Perfect the response.
              <br />
              <span className="text-gray-600">
                LIFELOOP — the simulation layer for forward-thinking teams.
              </span>
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Product */}
            <div className="flex flex-col gap-3">
              <h4 className="text-gray-900 font-semibold text-sm">Product</h4>
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/"
                className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors"
              >
                Impact Studio
              </Link>
              <Link
                href="/"
                className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors"
              >
                Features
              </Link>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-3">
              <h4 className="text-gray-900 font-semibold text-sm">Company</h4>
              <Link
                href="/"
                className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors"
              >
                About
              </Link>
              <Link
                href="/"
                className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/"
                className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors"
              >
                Careers
              </Link>
            </div>

            {/* Support */}
            <div className="flex flex-col gap-3">
              <h4 className="text-gray-900 font-semibold text-sm">Support</h4>
              <Link
                href="/"
                className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors"
              >
                Docs
              </Link>
              <Link
                href="/help"
                className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors"
              >
                Help Center
              </Link>
              <Link
                href="/status"
                className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors"
              >
                Status
              </Link>
            </div>
          </div>
        </div>

        {/* Signature Credibility Line */}
        <div className="mt-12 text-center text-gray-400 text-xs tracking-wide">
           · Built on Agentic AI · 
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-[#39D98A]/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-gray-500 text-sm text-center sm:text-left">
              © {currentYear}{" "}
              <span className="text-gray-600">LIFELOOP.</span>{" "}
              Designed for those who lead through clarity.
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-500 hover:text-[#39D98A] text-xs transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/"
                className="text-gray-500 hover:text-[#39D98A] text-xs transition-colors"
              >
                Terms of Service
              </Link>
              <div className="w-px h-4 bg-gray-300"></div>
              <span className="text-gray-400 text-xs">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
