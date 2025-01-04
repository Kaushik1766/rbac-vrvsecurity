'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl space-y-6"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Role-Based Access Control with Next.js
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          user credentials kaushiksaha004@gmail.com 1234 for admin login
        </p>
        <div className="flex justify-center space-x-4">
          <Button className="px-6 py-3" onClick={() => router.push('/login')}>Get Started</Button>

        </div>
      </motion.div>

    </div>
  )
}