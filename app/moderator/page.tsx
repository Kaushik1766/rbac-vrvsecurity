import { DashboardLayout } from '@/components/dashboard-layout'

export default function ModeratorDashboard() {
    return (
        <DashboardLayout title="Moderator Dashboard">
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                        Moderator Controls
                    </h2>
                    <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                        <p>Here you can moderate user content and manage community guidelines.</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

