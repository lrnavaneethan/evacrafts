'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import { LogOut, Menu, X, LayoutGrid, Package, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminNav() {
  const router = useRouter()
  const { setIsAdmin } = useAdmin()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    setIsAdmin(false)
    router.push('/')
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 hover:bg-muted rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block fixed md:relative w-64 h-screen bg-secondary text-white flex flex-col transition-all z-40`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="text-2xl font-bold">
            Eva Crafts
          </Link>
          <p className="text-sm text-white/70 mt-1">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors group"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs font-semibold text-white/50 uppercase px-4 mb-2">Management</p>
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Package className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-white/10">
          <Button
            onClick={handleLogout}
            className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/20 flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
          <p className="text-xs text-white/50 mt-3 text-center">Logged in as admin</p>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  )
}
