/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login, state } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (state.isAuthenticated) router.push("/");
  }, [state.isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mint-gradient-bg">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Access Your LIFELOOP</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#39D98A] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#39D98A] focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={state.isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#39D98A] hover:bg-[#2dbd7a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#39D98A] disabled:opacity-50 transition-all"
          >
            {state.isLoading ? "Authenticating..." : "Access LIFELOOP"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="/auth/signup" className="text-[#39D98A] hover:text-[#2dbd7a] font-medium">
            Sign up
          </a>
        </p>
      </div>
      <div className="text-gray-500 relative top-20 text-sm text-center">
              © {currentYear}{" "}
              <span className="text-gray-600">LIFELOOP.</span>{" "}
              Designed for those who lead through clarity.
            </div>
    </div>
  );
}
