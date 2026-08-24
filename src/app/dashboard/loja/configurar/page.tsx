'use client'

import { useRequireAuth } from '@/lib/hooks/useAuth'
import { useProfile } from '@/lib/hooks/useProfile'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Layout/Navbar'
import { Footer } from '@/components/Layout/Footer'
import { Card } from '@/components/UI/Card'
import { Button } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'
import { SkeletonLoader } from '@/components/UI/Loading'
import { supabase } from '@/lib/supabase'
import { Settings, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { generateSlug } from '@/lib/utils'

interface Store {
  id: string
  nome: string
  slug: string
  descricao: string
  whatsapp: string | null
  instagram: string | null
}

export default function ConfigurarLojaPage() {
  const { user, loading: authLoading } = useRequireAuth()
  const { profile, loading: profileLoading } = useProfile()
  const router = useRouter()
  const [store, setStore] = useState<Store | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    whatsapp: '',
    instagram: '',
  })

  useEffect(() => {
    if (!user) return

    const fetchStore = async () => {
      try {
        setLoading(true)
        const { data, error: fetchError } = await supabase
          .from('stores')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError

        if (data) {
          setStore(data)
          setFormData({
            nome: data.nome,
            descricao: data.descricao || '',
            whatsapp: data.whatsapp || '',
            instagram: data.instagram || '',
          })
        } else {
          // Create new store
          const defaultSlug = generateSlug(profile?.nome || 'loja')
          const { data: newStore, error: createError } = await supabase
            .from('stores')
            .insert([
              {
                user_id: user.id,
                nome: profile?.nome || 'Minha Loja',
                slug: defaultSlug,
                descricao: '',
              },
            ])
            .select()
            .single()

          if (createError) throw createError
          setStore(newStore)
          setFormData({
            nome: newStore.nome,
            descricao: '',
            whatsapp: '',
            instagram: '',
          })
        }
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar loja')
      } finally {
        setLoading(false)
      }
    }

    fetchStore()
  }, [user, profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!store) return

    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const { error: updateError } = await supabase
        .from('stores')
        .update({
          nome: formData.nome,
          descricao: formData.descricao,
          whatsapp: formData.whatsapp || null,
          instagram: formData.instagram || null,
        })
        .eq('id', store.id)

      if (updateError) throw updateError

      setSuccess('Loja atualizada com sucesso!')
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar loja')
    } finally {
      setSubmitting(false)
    }
  }

  if (authLoading || profileLoading) return null
  if (!user) return null

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-bg">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <Link href="/dashboard" className="flex items-center gap-2 text-neon-green hover:text-neon-green-dark mb-6">
            <ArrowLeft size={20} />
            Voltar
          </Link>

          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
            <Settings className="text-neon-green" size={32} />
            Configurar Loja
          </h1>
          <p className="text-gray-400 mb-8">Defina as informações da sua loja</p>

          {/* Form */}
          {loading ? (
            <SkeletonLoader />
          ) : (
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg">
                    {success}
                  </div>
                )}

                {store && (
                  <div className="bg-dark-bg border border-dark-border rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-2">URL da sua loja:</p>
                    <p className="text-neon-green font-bold break-all">
                      {process.env.NEXT_PUBLIC_APP_URL}/loja/{store.slug}
                    </p>
                  </div>
                )}

                <Input
                  label="Nome da Loja *"
                  placeholder="Minha Loja"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
                  <textarea
                    placeholder="Descreva sua loja..."
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition min-h-32"
                  />
                </div>

                <Input
                  label="WhatsApp (com código do país)"
                  placeholder="5511999999999"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                />

                <Input
                  label="Instagram"
                  placeholder="@minhaloja"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                />

                <div className="flex gap-4">
                  <Button type="submit" size="lg" isLoading={submitting} className="flex-grow">
                    Salvar Configurações
                  </Button>
                  <Link href="/dashboard" className="flex-grow">
                    <Button type="button" variant="ghost" size="lg" className="w-full">
                      Cancelar
                    </Button>
                  </Link>
                </div>

                <p className="text-gray-400 text-sm text-center">
                  🔴 Upload de logo e banner em desenvolvimento
                </p>
              </form>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
