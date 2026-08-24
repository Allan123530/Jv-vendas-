'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const { user } = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/95 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neon-green rounded-lg flex items-center justify-center">
              <span className="text-dark-bg font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg text-white hidden sm:inline">PIXBOX</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/explorar" className="text-gray-300 hover:text-neon-green transition">
              Explorar
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-neon-green transition">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition"
                >
                  <LogOut size={18} />
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-300 hover:text-neon-green transition">
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-neon-green text-dark-bg rounded-lg font-medium hover:bg-neon-green-dark transition"
                >
                  Criar Loja
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-dark-card rounded-lg transition"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-dark-border">
            <Link href="/explorar" className="block py-2 text-gray-300 hover:text-neon-green">
              Explorar
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="block py-2 text-gray-300 hover:text-neon-green">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-gray-300 hover:text-red-400"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="block py-2 text-gray-300 hover:text-neon-green">
                  Login
                </Link>
                <Link href="/auth/signup" className="block py-2 text-neon-green font-medium">
                  Criar Loja
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
