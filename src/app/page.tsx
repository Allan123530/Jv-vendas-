'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { Navbar } from '@/components/Layout/Navbar'
import { Footer } from '@/components/Layout/Footer'
import { Button } from '@/components/UI/Button'
import { LoadingSpinner } from '@/components/UI/Loading'
import { ProductCard } from '@/components/Products/ProductCard'
import { ArrowRight, Zap, Users, Package } from 'lucide-react'
import Link from 'next/link'

const featuredProducts = [
  {
    id: '1',
    nome: 'Headset Gamer Professional',
    descricao: 'Headset com som envolvente e microfone premium',
    preco: 189.90,
    precoComDesconto: 169.90,
    imagem: null,
    loja: 'TechStore',
    lojaSlug: 'techstore',
    destaque: true,
    desconto: 20,
  },
  {
    id: '2',
    nome: 'Teclado Mecânico RGB',
    descricao: 'Teclado com switches mecânicos de qualidade',
    preco: 349.90,
    precoComDesconto: 299.90,
    imagem: null,
    loja: 'TechStore',
    lojaSlug: 'techstore',
    destaque: true,
    desconto: 50,
  },
  {
    id: '3',
    nome: 'Mouse Óptico Preciso',
    descricao: 'Mouse com DPI ajustável e design ergonômico',
    preco: 79.90,
    imagem: null,
    loja: 'GamerHub',
    lojaSlug: 'gamerhub',
    destaque: false,
  },
  {
    id: '4',
    nome: 'Monitor 4K HDR',
    descricao: 'Monitor premium para gaming e produção',
    preco: 1499.90,
    precoComDesconto: 1299.90,
    imagem: null,
    loja: 'TechStore',
    lojaSlug: 'techstore',
    destaque: true,
    desconto: 200,
  },
  {
    id: '5',
    nome: 'Cadeira Gamer Confortável',
    descricao: 'Cadeira ergonômica para longas sessões',
    preco: 599.90,
    imagem: null,
    loja: 'ComfortSeats',
    lojaSlug: 'comfortseats',
    destaque: false,
  },
  {
    id: '6',
    nome: 'Mousepad XL Extended',
    descricao: 'Mousepad grande com base antiderrapante',
    preco: 89.90,
    imagem: null,
    loja: 'GamerHub',
    lojaSlug: 'gamerhub',
    destaque: false,
  },
]

const categories = [
  { name: 'Eletrônicos', emoji: '📱' },
  { name: 'Gaming', emoji: '🎮' },
  { name: 'Moda', emoji: '👗' },
  { name: 'Livros', emoji: '📚' },
  { name: 'Serviços', emoji: '🛠️' },
  { name: 'Fotografia', emoji: '📸' },
]

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-dark-bg min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 px-4 sm:px-6 lg:px-8">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-transparent to-transparent blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.1),transparent_70%)]" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                Seu produto merece ser{' '}
                <span className="text-neon-green">visto</span>
                .
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
                Crie seu catálogo, divulgue seus produtos e acompanhe suas vendas em um só lugar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link href={user ? '/dashboard' : '/auth/signup'}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Criar minha loja
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link href="/explorar">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Explorar produtos
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-dark-card/40 backdrop-blur border border-dark-border rounded-2xl p-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-neon-green mb-2">1.2K+</p>
                <p className="text-gray-400 text-sm">Vendedores</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-neon-green mb-2">8.5K+</p>
                <p className="text-gray-400 text-sm">Produtos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-neon-green mb-2">R$ 2.3M</p>
                <p className="text-gray-400 text-sm">Em vendas</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-neon-green mb-2">⭐ 4.9</p>
                <p className="text-gray-400 text-sm">Avaliação</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-card/30 border-y border-dark-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Categorias</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link key={cat.name} href={`/explorar?categoria=${cat.name.toLowerCase()}`}>
                  <div className="bg-dark-bg border border-dark-border rounded-xl p-6 text-center hover:border-neon-green hover:bg-dark-bg/50 transition cursor-pointer">
                    <p className="text-4xl mb-2">{cat.emoji}</p>
                    <p className="text-white font-medium text-sm">{cat.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                  <Zap size={32} className="text-neon-green" />
                  Em Destaque
                </h2>
                <p className="text-gray-400 mt-2">Produtos selecionados com as melhores oportunidades</p>
              </div>
              <Link href="/explorar">
                <Button variant="ghost">Ver todos</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-neon-green/10 via-transparent to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Pronto para começar?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Cadastre-se gratuitamente e comece a vender seus produtos hoje mesmo.
            </p>
            <Link href={user ? '/dashboard' : '/auth/signup'}>
              <Button size="lg">
                Criar minha loja agora
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
