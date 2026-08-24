'use client'

import { useRequireAuth } from '@/lib/hooks/useAuth'
import { useProfile } from '@/lib/hooks/useProfile'
import { Navbar } from '@/components/Layout/Navbar'
import { Footer } from '@/components/Layout/Footer'
import { Card } from '@/components/UI/Card'
import { Button } from '@/components/UI/Button'
import { LoadingSpinner, SkeletonLoader } from '@/components/UI/Loading'
import { BarChart3, Package, ShoppingCart, TrendingUp, Plus, Settings } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, loading: authLoading } = useRequireAuth()
  const { profile, loading: profileLoading } = useProfile()

  if (authLoading || profileLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-16 px-4 bg-dark-bg">
          <div className="max-w-7xl mx-auto py-12">
            <SkeletonLoader />
          </div>
        </div>
      </>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-bg">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Olá, {profile?.nome}! 👋</h1>
            <p className="text-gray-400">Bem-vindo ao seu painel de vendas</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-green-400" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Faturamento</p>
                <p className="text-2xl font-bold text-white">R$ 0,00</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <ShoppingCart className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Vendas</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Package className="text-purple-400" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Produtos</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-yellow-400" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Meta</p>
                <p className="text-2xl font-bold text-white">R$ 0,00</p>
              </div>
            </Card>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link href="/dashboard/loja/configurar">
              <Card className="p-8 text-center cursor-pointer hover:border-neon-green transition group">
                <Settings className="mx-auto mb-4 text-neon-green group-hover:scale-110 transition" size={32} />
                <h3 className="text-white font-bold mb-2">Configurar Loja</h3>
                <p className="text-gray-400 text-sm">Defina o nome, descrição e informações da sua loja</p>
              </Card>
            </Link>

            <Link href="/dashboard/produtos/novo">
              <Card className="p-8 text-center cursor-pointer hover:border-neon-green transition group">
                <Plus className="mx-auto mb-4 text-neon-green group-hover:scale-110 transition" size={32} />
                <h3 className="text-white font-bold mb-2">Adicionar Produto</h3>
                <p className="text-gray-400 text-sm">Publique seu primeiro produto e comece a vender</p>
              </Card>
            </Link>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/dashboard/ganhos">
              <Card className="p-6 cursor-pointer hover:border-neon-green transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold">Meus Ganhos</h3>
                  <span className="text-2xl">💰</span>
                </div>
                <p className="text-gray-400 text-sm">Acompanhe suas vendas e faturamento</p>
              </Card>
            </Link>

            <Link href="/dashboard/metas">
              <Card className="p-6 cursor-pointer hover:border-neon-green transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold">Minhas Metas</h3>
                  <span className="text-2xl">🎯</span>
                </div>
                <p className="text-gray-400 text-sm">Crie e acompanhe suas metas de vendas</p>
              </Card>
            </Link>

            <Link href="/dashboard/produtos">
              <Card className="p-6 cursor-pointer hover:border-neon-green transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold">Meus Produtos</h3>
                  <span className="text-2xl">📦</span>
                </div>
                <p className="text-gray-400 text-sm">Gerencie todos os seus produtos</p>
              </Card>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
