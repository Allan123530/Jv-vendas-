'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/Layout/Navbar'
import { Footer } from '@/components/Layout/Footer'
import { ProductCard } from '@/components/Products/ProductCard'
import { Input } from '@/components/UI/Input'
import { Button } from '@/components/UI/Button'
import { SkeletonLoader } from '@/components/UI/Loading'
import { supabase } from '@/lib/supabase'
import { Search, Filter, ArrowUpDown } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

interface Product {
  id: string
  nome: string
  descricao: string
  preco: number
  imagem: string | null
  categoria: string
  destaque: boolean
  stores: { nome: string; slug: string }
  coupons?: { valor: number }[]
}

type SortOption = 'recent' | 'popular' | 'price-asc' | 'price-desc'

export default function ExplorarPage() {
  const searchParams = useSearchParams()
  const categoria = searchParams.get('categoria')

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(categoria || '')
  const [sortBy, setSortBy] = useState<SortOption>('recent')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        let query = supabase
          .from('products')
          .select('id, nome, descricao, preco, imagem, categoria, destaque, stores(nome, slug), coupons(valor)')
          .eq('ativo', true)

        if (selectedCategory) {
          query = query.eq('categoria', selectedCategory)
        }

        const { data, error } = await query

        if (error) throw error

        let filtered = data || []

        // Filter by search term
        if (searchTerm) {
          filtered = filtered.filter(
            (p: any) =>
              p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
              p.descricao.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }

        // Sort
        switch (sortBy) {
          case 'price-asc':
            filtered.sort((a: any, b: any) => a.preco - b.preco)
            break
          case 'price-desc':
            filtered.sort((a: any, b: any) => b.preco - a.preco)
            break
          case 'popular':
            // Sort by destaque first
            filtered.sort((a: any, b: any) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0))
            break
          default:
            // recent - default order from DB
            break
        }

        setProducts(filtered)
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchTerm, selectedCategory, sortBy])

  const categories = [
    'Gaming',
    'Eletrônicos',
    'Acessórios',
    'Áudio',
    'Móveis',
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-bg">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Explorar Produtos</h1>
            <p className="text-gray-400">Descubra os melhores produtos da PIXBOX</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Categories */}
              <div className="flex-1 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedCategory === ''
                      ? 'bg-neon-green text-dark-bg'
                      : 'bg-dark-card border border-dark-border text-gray-300 hover:border-neon-green'
                  }`}
                >
                  Todos
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg transition ${
                      selectedCategory === cat
                        ? 'bg-neon-green text-dark-bg'
                        : 'bg-dark-card border border-dark-border text-gray-300 hover:border-neon-green'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 bg-dark-card border border-dark-border rounded-lg px-4 py-2">
                <ArrowUpDown size={18} className="text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-dark-card text-white outline-none cursor-pointer"
                >
                  <option value="recent">Mais recentes</option>
                  <option value="popular">Mais populares</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <SkeletonLoader />
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🔍</p>
              <h2 className="text-2xl font-bold text-white mb-2">Nenhum produto encontrado</h2>
              <p className="text-gray-400">
                Tente ajustar seus filtros ou busque por outro termo
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-400 mb-6">{products.length} produtos encontrados</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                  const discount = product.coupons?.[0]?.valor || 0
                  const priceWithDiscount = product.preco - discount

                  return (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      nome={product.nome}
                      descricao={product.descricao}
                      preco={product.preco}
                      precoComDesconto={discount > 0 ? priceWithDiscount : undefined}
                      imagem={product.imagem}
                      loja={product.stores.nome}
                      lojaSlug={product.stores.slug}
                      destaque={product.destaque}
                      desconto={discount > 0 ? discount : undefined}
                    />
                  )
                })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
