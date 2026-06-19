'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, ShoppingCart, LogOut, UserCircle, ChevronDown, Heart, PackageSearch } from 'lucide-react'
import type { SessionUser } from '@/lib/auth'
import Image from 'next/image'

export function NavigationClient({ user }: { user: SessionUser | null }) {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  async function handleLogout() {
    await fetch('/api/auth/user-logout', { method: 'POST' })
    setDropdownOpen(false)
    router.refresh()
  }

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#categories', label: 'Categories' },
    { href: '/product', label: 'Products' },
    { href: '#custom', label: 'Custom Orders' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Image
              src="/2.png"
              alt="Eva Crafts Logo"
              width={32}
              height={32}
              />
            </div>
            <span className="text-lg font-semibold text-secondary hidden sm:inline">Eva Crafts</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} className="text-foreground hover:text-primary transition-colors text-sm">
                {label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link href="/inquiry" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5 text-secondary" />
            </Link>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Avatar button */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 pl-1 pr-2 py-1 hover:bg-muted rounded-lg transition-colors"
                >
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/30"
                    />
                  ) : (
                    <UserCircle className="w-8 h-8 text-primary" />
                  )}
                  <span className="hidden md:block text-sm font-medium text-secondary max-w-[96px] truncate">
                    {user.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-border shadow-xl overflow-hidden z-50">
                    {/* User info */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-muted/30 border-b border-border">
                      {user.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.image}
                          alt={user.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 flex-shrink-0"
                        />
                      ) : (
                        <UserCircle className="w-10 h-10 text-primary flex-shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-secondary truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <UserCircle className="w-4 h-4 text-muted-foreground" />
                        My Profile
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <PackageSearch className="w-4 h-4 text-muted-foreground" />
                        Orders
                      </Link>
                      <Link
                        href="/wishlist"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <Heart className="w-4 h-4 text-muted-foreground" />
                        Wishlist
                      </Link>
                    </div>

                    <div className="border-t border-border py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/api/auth/google/login"
                className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm text-secondary hover:bg-muted transition-colors"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in
              </a>
            )}

            {/* Mobile menu button */}
            <button className="md:hidden p-2 hover:bg-muted rounded-lg" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6 text-secondary" /> : <Menu className="w-6 h-6 text-secondary" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-1">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors text-sm">
                {label}
              </a>
            ))}

            <div className="border-t border-border pt-3 mt-3 space-y-1">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2">
                    {user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.image} alt={user.name} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <UserCircle className="w-8 h-8 text-primary" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-secondary">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors">
                    <UserCircle className="w-4 h-4 text-muted-foreground" /> My Profile
                  </Link>
                  <Link href="/orders" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors">
                    <PackageSearch className="w-4 h-4 text-muted-foreground" /> Orders
                  </Link>
                  <Link href="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors">
                    <Heart className="w-4 h-4 text-muted-foreground" /> Wishlist
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/5 rounded-lg transition-colors">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <a href="/api/auth/google/login" className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors">
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign in with Google
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
