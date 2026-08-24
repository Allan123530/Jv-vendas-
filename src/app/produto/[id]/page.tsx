'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/Layout/Navbar'
import { Footer } from '@/components/Layout/Footer'
import { Button } from '@/components/UI/Button'
import { Badge } from '@/components/UI/Badge'
import { SkeletonLoader } from '@/components/UI/Loading'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/hooks/useAuth'
import { MessageCircle, ShoppingCart, Star, Flame } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: string
  nome: string
  descricao: string
  preco: number
  imagem: string | null
  categoria: string
  estoque: number
  destaque: boolean
  stores: { id: string; nome: string; slug: string; whatsapp: string | null }
  coupons?: { valor: number }[]
}

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const { user } = useAuth()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabase
          .from('products')
          .select('id, nome, descricao, preco, imagem, categoria, estoque, destaque, stores(id, nome, slug, whatsapp), coupons(valor)')
          .eq('id', productId)
          .eq('ativo', true)
          .single()

        if (fetchError) throw fetchError
        setProduct(data)
      } catch (err: any) {
        setError(err.message || 'Produto não encontrado')
      } finally {
        setLoading(false)
      }
    }

    if (productId) fetchProduct()
  }, [productId])

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

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-16 px-4 bg-dark-bg flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl mb-4">❌</p>
            <h1 className="text-3xl font-bold text-white mb-2">Produto não encontrado</h1>
            <p className="text-gray-400 mb-6">{error || 'O produto que você está procurando não existe'}</p>
            <Link href="/explorar">
              <Button>Voltar para explorar</Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  const discount = product.coupons?.[0]?.valor || 0
  const priceWithDiscount = product.preco - discount
  const whatsappMessage = `Olá! Tenho interesse no produto: ${product.nome} - R$ ${priceWithDiscount.toFixed(2)}`
  const whatsappLink = product.stores.whatsapp
    ? `https://wa.me/${product.stores.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`
    : null

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-bg">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-dark-card rounded-2xl border border-dark-border min-h-96">
              {product.imagem ? (
                <img src={product.imagem} alt={product.nome} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <span className="text-6xl mb-4">📦</span>
                  <p>Sem imagem disponível</p>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="default">{product.categoria}</Badge>
                {product.destaque && (
                  <Badge variant="warning" className="flex items-center gap-1">
                    <Flame size={14} /> Em Destaque
                  </Badge>
                )}
                {product.estoque > 0 && (
                  <Badge variant="success">✓ Em estoque ({product.estoque})</Badge>
                )}
                {product.estoque === 0 && <Badge variant="danger">Fora de estoque</Badge>}
              </div>

              {/* Name and Store */}
              <h1 className="text-4xl font-bold text-white mb-2">{product.nome}</h1>
              <Link href={`/loja/${product.stores.slug}`} className="text-neon-green hover:text-neon-green-dark transition mb-6">
                Loja: {product.stores.nome}
              </Link>

              {/* Price */}
              <div className="mb-8">
                {discount > 0 ? (
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold text-neon-green">R$ {priceWithDiscount.toFixed(2)}</span>
                    <div>
                      <span className="text-xl text-gray-500 line-through">R$ {product.preco.toFixed(2)}</span>
                      <p className="text-red-400 font-bold mt-1">Economize R$ {discount.toFixed(2)}</p>
                    </div>
                  </div>
                ) : (
                  <span className="text-5xl font-bold text-neon-green">R$ {product.preco.toFixed(2)}</span>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-white mb-2">Descrição</h2>
                <p className="text-gray-400 leading-relaxed">{product.descricao}</p>
              </div>

              {/* Quantity and Action */}
              {product.estoque > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-white font-medium">Quantidade:</label>
                    <div className="flex items-center gap-3 bg-dark-card border border-dark-border rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-neon-green hover:text-neon-green-dark transition"
                      >
                        −
                      </button>
                      <span className="text-white font-medium w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.estoque, quantity + 1))}
                        className="px-4 py-2 text-neon-green hover:text-neon-green-dark transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {whatsappLink ? (
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                      <Button size="lg" className="w-full flex items-center justify-center gap-2">
                        <MessageCircle size={20} />
                        Comprar via WhatsApp
                      </Button>
                    </a>
                  ) : (
                    <Button size="lg" disabled className="w-full flex items-center justify-center gap-2">
                      <ShoppingCart size={20} />
                      Vendedor sem WhatsApp
                    </Button>
                  )}

                  <p className="text-gray-400 text-sm text-center">
                    🔴 Sistema de pagamento em desenvolvimento - A transação será feita via WhatsApp
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button size="lg" disabled className="w-full">
                    Fora de estoque
                  </Button>
                  <p className="text-gray-400 text-center">Este produto não está disponível no momento</p>
                </div>
              )}
            </div>
          </div>

          {/* Rating Section (Placeholder) */}
          <div className="bg-dark-card rounded-2xl border border-dark-border p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Star size={24} className="text-yellow-400" />
              Avaliações
            </h2>
            <p className="text-gray-400">Sistema de avaliações em desenvolvimento</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
