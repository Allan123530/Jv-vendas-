'use client'

import { Navbar } from '@/components/Layout/Navbar'
import { Footer } from '@/components/Layout/Footer'
import { Button } from '@/components/UI/Button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 px-4 bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-9xl font-black text-neon-green mb-4">404</p>
          <h1 className="text-4xl font-bold text-white mb-4">Página não encontrada</h1>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            Desculpe, a página que você está procurando não existe ou foi removida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg">Ir para Home</Button>
            </Link>
            <Link href="/explorar">
              <Button size="lg" variant="outline">
                Explorar Produtos
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
