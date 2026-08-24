'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'
import { supabase } from '@/lib/supabase'
import { Navbar } from '@/components/Layout/Navbar'
import Link from 'next/link'
import { ArrowRight, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-dark-bg pt-16 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Bem-vindo de volta</h1>
            <p className="text-gray-400">Faça login na sua conta PIXBOX</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6 bg-dark-card rounded-2xl border border-dark-border p-8">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={<Mail size={18} />}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={<Lock size={18} />}
            />

            <div className="text-right">
              <Link href="/auth/forgot-password" className="text-neon-green hover:text-neon-green-dark text-sm">
                Esqueceu a senha?
              </Link>
            </div>

            <Button type="submit" isLoading={loading} size="lg" className="w-full">
              Entrar
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </form>

          {/* Signup Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Não tem conta?{' '}
              <Link href="/auth/signup" className="text-neon-green hover:text-neon-green-dark font-medium">
                Criar uma
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
