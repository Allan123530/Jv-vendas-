'use client'

import { useRequireAuth } from '@/lib/hooks/useAuth'
import { useProfile } from '@/lib/hooks/useProfile'
import { useState, useEffect } from 'react'
import { Navbar } from '@/components/Layout/Navbar'
import { Footer } from '@/components/Layout/Footer'
import { Card } from '@/components/UI/Card'
import { Button } from '@/components/UI/Button'
import { Badge } from '@/components/UI/Badge'
import { SkeletonLoader } from '@/components/UI/Loading'
import { supabase } from '@/lib/supabase'
import { Package, Plus, Edit, Trash2, Eye, EyeOff, Flame } from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

interface Product {
  id: string
  nome: string
  descricao: string
  preco: number
  estoque: number
  ativo: boolean
  destaque: boolean
  categoria: string
}

export default function ProdutosPage() {
  const { user, loading: authLoading } = useRequireAuth()
  const { profile, loading: profileLoading } = useProfile()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'todos' | 'ativos' | 'inativos'>('todos')

  useEffect(() => {
    if (!user) return

    const fetchProducts = async () => {
      try {
        setLoading(true)
        
        // First, get user's store
        const { data: storeData, error: storeError } = await supabase
          .from('stores')
          .select('id')
          .eq('user_id', user.id)
          .single()

        if (storeError) throw storeError

        // Then get products
        let query = supabase
          .from('products')
          .select('*')
          .eq('store_id', storeData.id)
          .order('created_at', { ascending: false })

        if (filter === 'ativos') {
          query = query.eq('ativo', true)
        } else if (filter === 'inativos') {
          query = query.eq('ativo', false)
        }

        const { data, error } = await query
        if (error) throw error
        setProducts(data || [])
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [user, filter])

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ ativo: !currentStatus })
        .eq('id', id)

      if (error) throw error

      setProducts(products.map(p => p.id === id ? { ...p, ativo: !currentStatus } : p))
    } catch (error) {
      console.error('Erro ao atualizar produto:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return

    try {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) throw error
      setProducts(products.filter(p => p.id !== id))
    } catch (error) {
      console.error('Erro ao deletar produto:', error)
    }
  }

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

  if (!user) return null

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-bg">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
                <Package className="text-neon-green" size={32} />
                Meus Produtos
              </h1>
              <p className="text-gray-400">Gerencie todos os seus produtos</p>
            </div>
            <Link href="/dashboard/produtos/novo">
              <Button className="flex items-center gap-2">
                <Plus size={20} />
                Novo Produto
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="mb-6 flex gap-2">
            {(['todos', 'ativos', 'inativos'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === f
                    ? 'bg-neon-green text-dark-bg'
                    : 'bg-dark-card border border-dark-border text-gray-300 hover:border-neon-green'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Products */}
          {loading ? (
            <SkeletonLoader />
          ) : products.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-6xl mb-4">📦</p>
              <h3 className="text-xl font-bold text-white mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-400 mb-6">Você ainda não possui produtos publicados</p>
              <Link href="/dashboard/produtos/novo">
                <Button className="flex items-center gap-2 mx-auto">
                  <Plus size={20} />
                  Criar Primeiro Produto
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <Card key={product.id} className="flex items-center justify-between p-6 hover:border-neon-green transition">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{product.nome}</h3>
                      {product.destaque && (
                        <Badge variant="warning" className="flex items-center gap-1">
                          <Flame size={12} /> Destaque
                        </Badge>
                      )}
                      <Badge variant={product.ativo ? 'success' : 'danger'}>
                        {product.ativo ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-1">{product.descricao}</p>
                    <div className="flex gap-4 mt-3">
                      <span className="text-neon-green font-bold">{formatCurrency(product.preco)}</span>
                      <span className="text-gray-400 text-sm">📦 {product.estoque} em estoque</span>
                      <span className="text-gray-400 text-sm">{product.categoria}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleToggleActive(product.id, product.ativo)}
                      className="p-2 bg-dark-bg rounded-lg hover:border-neon-green border border-transparent transition"
                      title={product.ativo ? 'Desativar' : 'Ativar'}
                    >
                      {product.ativo ? (
                        <Eye className="text-gray-400 hover:text-neon-green" size={20} />
                      ) : (
                        <EyeOff className="text-gray-400 hover:text-neon-green" size={20} />
                      )}
                    </button>
                    <Link href={`/dashboard/produtos/editar/${product.id}`}>
                      <button className="p-2 bg-dark-bg rounded-lg hover:border-neon-green border border-transparent transition">
                        <Edit className="text-gray-400 hover:text-neon-green" size={20} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 bg-dark-bg rounded-lg hover:border-red-400 border border-transparent transition"
                    >
                      <Trash2 className="text-gray-400 hover:text-red-400" size={20} />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
