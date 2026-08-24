'use client'

import { useRequireAuth } from '@/lib/hooks/useAuth'
import { useProfile } from '@/lib/hooks/useProfile'
import { useState, useEffect } from 'react'
import { Navbar } from '@/components/Layout/Navbar'
import { Footer } from '@/components/Layout/Footer'
import { Card } from '@/components/UI/Card'
import { Badge } from '@/components/UI/Badge'
import { SkeletonLoader } from '@/components/UI/Loading'
import { supabase } from '@/lib/supabase'
import { Users, Store, Package, TrendingUp } from 'lucide-react'
import { Button } from '@/components/UI/Button'
import Link from 'next/link'

interface User {
  id: string
  nome: string
  email: string
  role: string
  created_at: string
}

export default function AdminPage() {
  const { user, loading: authLoading } = useRequireAuth()
  const { profile, loading: profileLoading } = useProfile()
  const [isAdmin, setIsAdmin] = useState(false)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalProducts: 0,
    totalSales: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !profile) return

    // Check if user is admin
    if (profile.role !== 'admin') {
      setIsAdmin(false)
      setLoading(false)
      return
    }

    setIsAdmin(true)

    const fetchStats = async () => {
      try {
        setLoading(true)

        // Get total users
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })

        // Get total stores
        const { count: storesCount } = await supabase
          .from('stores')
          .select('*', { count: 'exact', head: true })

        // Get total products
        const { count: productsCount } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })

        // Get total sales
        const { count: salesCount } = await supabase
          .from('sales')
          .select('*', { count: 'exact', head: true })

        setStats({
          totalUsers: usersCount || 0,
          totalStores: storesCount || 0,
          totalProducts: productsCount || 0,
          totalSales: salesCount || 0,
        })
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [user, profile])

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

  if (!user || !isAdmin) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-16 px-4 bg-dark-bg flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl mb-4">🔐</p>
            <h1 className="text-3xl font-bold text-white mb-2">Acesso Negado</h1>
            <p className="text-gray-400">Você não tem permissão para acessar esta página</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-bg">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Painel Administrativo</h1>
            <p className="text-gray-400">Gerencie a plataforma PIXBOX</p>
          </div>

          {/* Stats */}
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Users className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Usuários</p>
                    <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                  </div>
                </Card>

                <Card className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Store className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Lojas</p>
                    <p className="text-2xl font-bold text-white">{stats.totalStores}</p>
                  </div>
                </Card>

                <Card className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Package className="text-green-400" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Produtos</p>
                    <p className="text-2xl font-bold text-white">{stats.totalProducts}</p>
                  </div>
                </Card>

                <Card className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-yellow-400" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Vendas</p>
                    <p className="text-2xl font-bold text-white">{stats.totalSales}</p>
                  </div>
                </Card>
              </div>

              {/* Management Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="#">
                  <Card className="p-8 cursor-pointer hover:border-neon-green transition group">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">Gerenciar Usuários</h3>
                      <Users className="text-neon-green group-hover:scale-110 transition" size={24} />
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Visualize e gerencie usuários da plataforma</p>
                    <Button variant="ghost" size="sm">
                      Em desenvolvimento
                    </Button>
                  </Card>
                </Link>

                <Link href="#">
                  <Card className="p-8 cursor-pointer hover:border-neon-green transition group">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">Produtos em Destaque</h3>
                      <Package className="text-neon-green group-hover:scale-110 transition" size={24} />
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Selecione produtos para aparecer em destaque</p>
                    <Button variant="ghost" size="sm">
                      Em desenvolvimento
                    </Button>
                  </Card>
                </Link>

                <Link href="#">
                  <Card className="p-8 cursor-pointer hover:border-neon-green transition group">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">Relatórios</h3>
                      <TrendingUp className="text-neon-green group-hover:scale-110 transition" size={24} />
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Visualize relatórios e analíticas da plataforma</p>
                    <Button variant="ghost" size="sm">
                      Em desenvolvimento
                    </Button>
                  </Card>
                </Link>

                <Link href="#">
                  <Card className="p-8 cursor-pointer hover:border-neon-green transition group">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">Denúncias</h3>
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Gerencie denúncias de produtos</p>
                    <Button variant="ghost" size="sm">
                      Em desenvolvimento
                    </Button>
                  </Card>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
