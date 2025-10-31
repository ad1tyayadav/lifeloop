"use client"

import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { History, LogOut, Home, Play } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    const router = useRouter();
    const { dispatch } = useApp();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        router.push('/auth/login');
    };

    const handleNavigate = (path: string) => {
        router.push(path);
    };

    return (
        <header className="border-b border-[#39D98A]/20 bg-gradient-to-r from-white via-[#ECFFF9] to-white backdrop-blur-md sticky top-0 z-50 transition-smooth shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => handleNavigate('/dashboard')}
                        className="animate-fade-in text-left hover:opacity-80 transition-smooth"
                    >
                        <Link href={'/dashboard'} className="text-3xl font-bold text-[#39D98A]">
                            LIFELOOP
                        </Link>
                    </button>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2">
                        {/* Dashboard Button */}
                        <button
                            onClick={() => handleNavigate('/dashboard')}
                            className="p-2 rounded-lg text-[#39D98A] hover:bg-[#39D98A]/20 transition-colors group"
                        >
                            Dashboard
                        </button>

                        {/* History Button */}
                        <button
                            onClick={() => handleNavigate('/history')}
                            className="p-2 rounded-lg  text-[#39D98A] hover:bg-[#39D98A]/20 transition-colors group"
                            title="View History"
                        >
                            History
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-lg bg-[#39D98A]/10 text-[#39D98A] hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}