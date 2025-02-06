import { redirect } from 'next/navigation'

import { auth } from '@/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth;

  // if (session?.user?.role !== 'ADMIN') {
  //   redirect('/dashboard')
  // }

  return (
    <div className="flex">
      <aside className="w-64 min-h-screen bg-gray-800">
        {/* Admin Sidebar */}
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}