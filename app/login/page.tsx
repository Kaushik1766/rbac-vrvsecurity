'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import axios, { AxiosError } from 'axios'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function AnimatedLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const resp = await axios.post('/api/auth/login', {
                email,
                password
            })
            console.log(resp.data)
            alert(resp.data.message)
            router.push('/dashboard')
        }
        catch (e: any) {
            const message = e.response?.data.error
            console.log((e as AxiosError).response?.data)
            alert(message)
        }
        console.log('Login attempted with:', { email, password })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
            >
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mx-auto h-12 w-12 rounded-full bg-primary flex items-center justify-center"
                    >
                        <User className="h-6 w-6 text-primary-foreground" />
                    </motion.div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to your account</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                        >
                            <Label htmlFor="email-address" className="sr-only">
                                Email address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                <Input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="pl-10"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                        >
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="pl-10"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                    >
                        <Button type="submit" className="w-full">
                            Sign in
                        </Button>
                    </motion.div>
                </form>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    Dont have an account?{' '}
                    <a href="/signup" className="font-medium text-primary hover:text-primary/80 dark:text-primary-foreground dark:hover:text-primary-foreground/80">
                        Sign up
                    </a>
                </p>
            </motion.div>
        </div>
    )
}

