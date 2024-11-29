'use client'

import { ReactNode, useState } from 'react'
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu, X, Home, Shield, UserCog } from 'lucide-react'

interface DashboardLayoutProps {
    children: ReactNode
    title: string
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleLogout = () => {
        document.cookie = 'user-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        router.push('/login')
    }
    const pathname = usePathname()

    const navItems = [
        { href: '/dashboard', label: 'Dashboard', icon: Home },
        { href: '/moderator', label: 'Moderator', icon: Shield },
        { href: '/admin', label: 'Admin', icon: UserCog },
    ]

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
            {/* Sidebar for larger screens */}
            <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
                </div>
                <nav className="flex-1 overflow-y-auto">
                    <ul className="py-4">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    style={{
                                        backgroundColor: pathname === item.href ? 'rgba(0, 0, 0, 0.05)' : 'transparent'
                                    }}
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <Button onClick={handleLogout} variant="outline" className="w-full">
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Mobile sidebar */}
            <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? "" : "hidden"}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
                <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white dark:bg-gray-800">
                    <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
                        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                    <nav className="flex-1 overflow-y-auto">
                        <ul className="py-4">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        style={{
                                            backgroundColor: pathname === item.href ? 'rgba(0, 0, 0, 0.05)' : 'transparent'
                                        }}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <item.icon className="mr-3 h-5 w-5" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <Button onClick={handleLogout} variant="outline" className="w-full">
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                <header className="h-16 flex items-center justify-between px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setSidebarOpen(true)}>
                            <Menu className="h-6 w-6" />
                        </Button>
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h1>
                    </div>
                    <Button onClick={handleLogout} variant="outline" className="md:hidden">
                        Logout
                    </Button>
                </header>
                <main className="flex-1 overflow-y-auto p-4">
                    {children}
                </main>
            </div>
        </div>
    )
}

