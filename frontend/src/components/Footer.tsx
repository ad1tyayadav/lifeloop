/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link';
import { Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-white to-[#ECFFF9]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main Footer Content */}
                <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                    {/* Brand Section */}
                    <div className="flex-1 max-w-md">
                        <Link
                            href="/dashboard"
                            className="text-2xl font-bold text-[#39D98A] hover:opacity-80 transition-opacity inline-block mb-3"
                        >
                            LIFELOOP
                        </Link>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Predict the ripple before it hits. Advanced simulation and analytics
                            for forward-thinking teams.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col sm:flex-row gap-8">
                        <div className="flex flex-col gap-3">
                            <h4 className="text-gray-900 font-semibold text-sm">Product</h4>
                            <Link href="/dashboard" className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors">
                                Dashboard
                            </Link>
                            <Link href="/features" className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors">
                                Features
                            </Link>
                            <Link href="/pricing" className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors">
                                Pricing
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h4 className="text-gray-900 font-semibold text-sm">Company</h4>
                            <Link href="/about" className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors">
                                About
                            </Link>
                            <Link href="/contact" className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors">
                                Contact
                            </Link>
                            <Link href="/careers" className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors">
                                Careers
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h4 className="text-gray-900 font-semibold text-sm">Support</h4>
                            <Link href="/help" className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors">
                                Help Center
                            </Link>
                            <Link href="/docs" className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors">
                                Documentation
                            </Link>
                            <Link href="/status" className="text-gray-500 hover:text-[#39D98A] text-sm transition-colors">
                                Status
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-6 border-t border-[#39D98A]/10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <span>© {currentYear} Life Loop.</span>
                            <span>All rights reserved.</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/privacy"
                                className="text-gray-500 hover:text-[#39D98A] text-xs transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-gray-500 hover:text-[#39D98A] text-xs transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <span className="text-gray-400 text-xs">
                                v1.0.0
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}