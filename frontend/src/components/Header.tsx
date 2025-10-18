// components/Header.tsx
"use client"

import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { History, Bell, HelpCircle, Settings, LogOut, Home } from 'lucide-react';
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
        <header className="border-b border-mint-accent/40 bg-gradient-to-r from-white via-mint-light/50 to-white backdrop-blur-md sticky top-0 z-10 transition-smooth shadow-sm shadow-mint-dark/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo - Clickable to go to dashboard */}
                    <button
                        onClick={() => handleNavigate('/dashboard')}
                        className="animate-fade-in text-left hover:opacity-80 transition-smooth"
                    >
                        <Link href={'/dashboard'} className="text-3xl font-bold bg-gradient-to-r from-mint-dark to-mint-darker bg-clip-text text-transparent">
                            LIFELOOP
                        </Link>
                        <p className="text-sm text-deep-grey/60">Chaos Lab Simulation</p>
                    </button>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-3">
                        {/* Dashboard Button */}
                        <button
                            onClick={() => handleNavigate('/dashboard')}
                            className="p-2.5 rounded-lg bg-mint-light/40 text-mint-dark hover:bg-mint-light/60 transition-smooth hover:shadow-md active:scale-95 group"
                            title="Go to Dashboard"
                        >
                            <Home className="w-5 h-5 group-hover:scale-110 transition-smooth" />
                        </button>

                        {/* History Button */}
                        <button
                            onClick={() => handleNavigate('/history')}
                            className="p-2.5 rounded-lg bg-mint-light/40 text-mint-dark hover:bg-mint-light/60 transition-smooth hover:shadow-md active:scale-95 group"
                            title="View History"
                        >
                            <History className="w-5 h-5 group-hover:scale-110 transition-smooth" />
                        </button>

                        {/* Notifications
                        <button className="p-2.5 rounded-lg bg-mint-light/40 text-mint-dark hover:bg-mint-light/60 transition-smooth hover:shadow-md active:scale-95 group">
                            <Bell className="w-5 h-5 group-hover:scale-110 transition-smooth" />
                        </button> */}

                        {/* Help
                        <button className="p-2.5 rounded-lg bg-mint-light/40 text-mint-dark hover:bg-mint-light/60 transition-smooth hover:shadow-md active:scale-95 group">
                            <HelpCircle className="w-5 h-5 group-hover:scale-110 transition-smooth" />
                        </button> */}

                        {/* Settings
                        <button className="p-2.5 rounded-lg bg-mint-light/40 text-mint-dark hover:bg-mint-light/60 transition-smooth hover:shadow-md active:scale-95 group">
                            <Settings className="w-5 h-5 group-hover:scale-110 transition-smooth" />
                        </button> */}

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="p-2.5 rounded-lg bg-mint-light/40 text-mint-dark hover:bg-red-50 hover:text-red-600 transition-smooth hover:shadow-md active:scale-95 group"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5 group-hover:scale-110 transition-smooth" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}