'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/Layout/Navbar'
import { Footer } from '@/components/Layout/Footer'
import { ProductCard } from '@/components/Products/ProductCard'
import { Button } from '@/components/UI/Button'
import { SkeletonLoader, LoadingSpinner } from '@/components/UI/Loading'
import { supabase } from '@/lib/supabase'
import { MessageCircle, MapPin } from 'lucide-react'

interface Store {
  id: string
  nome: string
  slug: string
  descricao: string
  logo: string | null
  banner: string | null
  whatsapp: string | null
  instagram: string | null
}

interface Product {
  id: string
  nome: string
  descricao: string
  preco: number
  imagem: string | null
  categoria: string
  destaque: boolean
  coupons?: { valor: number }[]
}

export default function StorePage() {
  const params = useParams()
  const slug = params.slug as string

  const [store, setStore] = useState<Store | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch store
        const { data: storeData, error: storeError } = await supabase
          .from('stores')
          .select('*')
          .eq('slug', slug)
          .single()

        if (storeError) throw storeError
        setStore(storeData)

        // Fetch store products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('id, nome, descricao, preco, imagem, categoria, destaque, coupons(valor)')
          .eq('store_id', storeData.id)
          .eq('ativo', true)

        if (productsError) throw productsError
        setProducts(productsData || [])
      } catch (err: any) {
        setError(err.message || 'Loja não encontrada')
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchStore()
  }, [slug])

  if (loading) {
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

  if (error || !store) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-16 px-4 bg-dark-bg flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl mb-4">🏪</p>
            <h1 className="text-3xl font-bold text-white mb-2">Loja não encontrada</h1>
            <p className="text-gray-400">{error || 'A loja que você está procurando não existe'}</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-0 pb-12 bg-dark-bg">
        {/* Store Banner */}
        {store.banner ? (
          <div className="h-48 md:h-64 bg-gradient-to-r from-neon-green/10 to-transparent" />
        ) : (
          <div className="h-48 md:h-64 bg-gradient-to-r from-dark-card to-dark-bg" />
        )}

        {/* Store Info */}
        <div className="relative px-4 sm:px-6 lg:px-8 -mt-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-dark-card rounded-2xl border border-dark-border p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                {/* Logo */}
                {store.logo ? (
                  <div className="w-20 h-20 rounded-lg bg-dark-bg flex-shrink-0" />
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-neon-green/20 to-dark-bg flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🏪</span>
                  </div>
                )}

                {/* Info */}
                <div className="flex-grow">
                  <h1 className="text-3xl font-bold text-white mb-2">{store.nome}</h1>
                  <p className="text-gray-400 mb-4">{store.descricao}</p>

                  {/* Contact */}
                  <div className="flex flex-wrap gap-4">
                    {store.whatsapp && (
                      <a
                        href={`https://wa.me/${store.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-neon-green hover:text-neon-green-dark transition"
                      >
                        <MessageCircle size={20} />
                        WhatsApp
                      </a>
                    )}
                    {store.instagram && (
                      <a
                        href={`https://instagram.com/${store.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-neon-green hover:text-neon-green-dark transition"
                      >
                        <span>📱</span>
                        {store.instagram}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Produtos</h2>
              {products.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-6xl mb-4">📦</p>
                  <h3 className="text-xl font-bold text-white mb-2">Nenhum produto disponível</h3>
                  <p className="text-gray-400">Esta loja ainda não possui produtos publicados</p>
                </div>
              ) : (
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
                        loja={store.nome}
                        lojaSlug={store.slug}
                        destaque={product.destaque}
                        desconto={discount > 0 ? discount : undefined}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
