'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios, { AxiosError } from 'axios'

export default function AdminDashboard() {
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const resp = await axios.post('/api/roles/changeRoles', {
                email,
                role
            })
            console.log(resp.data)
            alert(resp.data.message)
        }
        catch (e: any) {
            const message = e.response?.data.error
            console.log((e as AxiosError).response?.data)
            alert(message)
        }
        console.log('Updating role:', { email, role })
        setEmail('')
        setRole('')
    }

    return (
        <DashboardLayout title="Admin Dashboard">
            <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                            Admin Controls
                        </h2>
                        <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                            <p>Here you can manage users, view system logs, and configure application settings.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                            User Role Management
                        </h3>
                        <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                            <p>Update user roles by entering their email and selecting a new role.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                            <div>
                                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    User Email
                                </Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="user@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    New Role
                                </Label>
                                <Select value={role} onValueChange={setRole} required>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                        <SelectItem value="MODERATOR">Moderator</SelectItem>
                                        <SelectItem value="USER">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit">
                                Update Role
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

