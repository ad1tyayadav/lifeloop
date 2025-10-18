"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/AppContext"
import Link from "next/link"

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useApp()
    const router = useRouter()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match")
            return
        }

        setIsLoading(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            dispatch({
                type: 'LOGIN',
                payload: {
                    id: '1',
                    email: formData.email,
                    name: formData.name
                }
            })

            router.push('/dashboard')
        } catch (error) {
            console.error('Signup failed:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="min-h-screen mint-gradient-bg flex items-center justify-center p-4">
            <div className="glass rounded-2xl p-8 w-full max-w-md shadow-xl border border-mint-accent/50 animate-scale-in">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-mint-dark to-mint-darker bg-clip-text text-transparent">
                        LIFELOOP
                    </h1>
                    <p className="text-deep-grey/60 mt-2">Create your account</p>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-soft-black mb-2">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-mint-accent/40 bg-white/50 focus:border-mint-dark focus:ring-2 focus:ring-mint-dark/20 transition-smooth outline-none"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-soft-black mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
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
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-mint-accent/40 bg-white/50 focus:border-mint-dark focus:ring-2 focus:ring-mint-dark/20 transition-smooth outline-none"
                            placeholder="Create a password"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-soft-black mb-2">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-mint-accent/40 bg-white/50 focus:border-mint-dark focus:ring-2 focus:ring-mint-dark/20 transition-smooth outline-none"
                            placeholder="Confirm your password"
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
                                Creating account...
                            </div>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                {/* Login link */}
                <div className="mt-6 text-center">
                    <p className="text-deep-grey/60">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-mint-dark font-semibold hover:text-mint-darker transition-smooth">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}