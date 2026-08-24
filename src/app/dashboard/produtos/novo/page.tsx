'use client'

import { useRequireAuth } from '@/lib/hooks/useAuth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Layout/Navbar'
import { Footer } from '@/components/Layout/Footer'
import { Card } from '@/components/UI/Card'
import { Button } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'
import { supabase } from '@/lib/supabase'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NovoProdutoPage() {
  const { user, loading: authLoading } = useRequireAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoria: 'Gaming',
    estoque: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !formData.nome || !formData.preco || !formData.estoque) return

    setLoading(true)
    setError('')

    try {
      // Get user's store
      const { data: storeData, error: storeError } = await supabase
        .from('stores')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (storeError) throw storeError

      // Create product
      const { error: productError } = await supabase.from('products').insert([
        {
          store_id: storeData.id,
          nome: formData.nome,
          descricao: formData.descricao,
          preco: parseFloat(formData.preco),
          categoria: formData.categoria,
          estoque: parseInt(formData.estoque),
          ativo: true,
        },
      ])

      if (productError) throw productError

      router.push('/dashboard/produtos')
    } catch (err: any) {
      setError(err.message || 'Erro ao criar produto')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) return null
  if (!user) return null

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-bg">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <Link href="/dashboard/produtos" className="flex items-center gap-2 text-neon-green hover:text-neon-green-dark mb-6">
            <ArrowLeft size={20} />
            Voltar
          </Link>

          <h1 className="text-4xl font-bold text-white mb-2">Novo Produto</h1>
          <p className="text-gray-400 mb-8">Publique um novo produto na sua loja</p>

          {/* Form */}
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <Input
                label="Nome do Produto *"
                placeholder="Headset Gamer Professional"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Descrição *</label>
                <textarea
                  placeholder="Descreva as características do seu produto..."
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition min-h-32"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Preço (R$) *"
                  type="number"
                  step="0.01"
                  placeholder="189.90"
                  value={formData.preco}
                  onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Categoria *</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-neon-green transition"
                  >
                    <option value="Gaming">Gaming</option>
                    <option value="Eletrônicos">Eletrônicos</option>
                    <option value="Acessórios">Acessórios</option>
                    <option value="Áudio">Áudio</option>
                    <option value="Móveis">Móveis</option>
                    <option value="Moda">Moda</option>
                    <option value="Livros">Livros</option>
                    <option value="Serviços">Serviços</option>
                  </select>
                </div>
              </div>

              <Input
                label="Estoque *"
                type="number"
                min="0"
                placeholder="15"
                value={formData.estoque}
                onChange={(e) => setFormData({ ...formData, estoque: e.target.value })}
                required
              />

              <div className="flex gap-4">
                <Button type="submit" size="lg" isLoading={loading} className="flex-grow">
                  Publicar Produto
                </Button>
                <Link href="/dashboard/produtos" className="flex-grow">
                  <Button type="button" variant="ghost" size="lg" className="w-full">
                    Cancelar
                  </Button>
                </Link>
              </div>

              <p className="text-gray-400 text-sm text-center">
                🔴 Upload de imagens em desenvolvimento - Configure a imagem do produto após publicação
              </p>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
