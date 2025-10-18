"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/AppContext"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useApp()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock authentication - replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo, any email/password works
      dispatch({
        type: 'LOGIN',
        payload: {
          id: '1',
          email: email,
          name: email.split('@')[0]
        }
      })
      
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen mint-gradient-bg flex items-center justify-center p-4">
      <div className="glass rounded-2xl p-8 w-full max-w-md shadow-xl border border-mint-accent/50 animate-scale-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-mint-dark to-mint-darker bg-clip-text text-transparent">
            LIFELOOP
          </h1>
          <p className="text-deep-grey/60 mt-2">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-soft-black mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-mint-accent/40 bg-white/50 focus:border-mint-dark focus:ring-2 focus:ring-mint-dark/20 transition-smooth outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-soft-black mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-mint-accent/40 bg-white/50 focus:border-mint-dark focus:ring-2 focus:ring-mint-dark/20 transition-smooth outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-mint-dark to-mint-darker text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-smooth hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Sign up link */}
        <div className="mt-6 text-center">
          <p className="text-deep-grey/60">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-mint-dark font-semibold hover:text-mint-darker transition-smooth">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}