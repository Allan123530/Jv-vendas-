'use client'

import { useRequireAuth } from '@/lib/hooks/useAuth'
import { useProfile } from '@/lib/hooks/useProfile'
import { useState, useEffect } from 'react'
import { Navbar } from '@/components/Layout/Navbar'
import { Footer } from '@/components/Layout/Footer'
import { Card } from '@/components/UI/Card'
import { Button } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'
import { Badge } from '@/components/UI/Badge'
import { SkeletonLoader } from '@/components/UI/Loading'
import { supabase } from '@/lib/supabase'
import { Target, Plus, Trash2, CheckCircle } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Goal {
  id: string
  nome: string
  valor_meta: number
  valor_atual: number
  prazo: string | null
  created_at: string
}

export default function MetasPage() {
  const { user, loading: authLoading } = useRequireAuth()
  const { profile, loading: profileLoading } = useProfile()
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    valor_meta: '',
    prazo: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!user) return

    const fetchGoals = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('goals')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error
        setGoals(data || [])
      } catch (error) {
        console.error('Erro ao carregar metas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGoals()
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !formData.nome || !formData.valor_meta) return

    setSubmitting(true)
    try {
      const { data, error } = await supabase
        .from('goals')
        .insert([
          {
            user_id: user.id,
            nome: formData.nome,
            valor_meta: parseFloat(formData.valor_meta),
            valor_atual: 0,
            prazo: formData.prazo || null,
          },
        ])
        .select()

      if (error) throw error

      setGoals([...(data || []), ...goals])
      setFormData({ nome: '', valor_meta: '', prazo: '' })
      setShowForm(false)
    } catch (error) {
      console.error('Erro ao criar meta:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta meta?')) return

    try {
      const { error } = await supabase.from('goals').delete().eq('id', id)
      if (error) throw error
      setGoals(goals.filter(g => g.id !== id))
    } catch (error) {
      console.error('Erro ao deletar meta:', error)
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

  const totalMetaValue = goals.reduce((acc, goal) => acc + goal.valor_meta, 0)
  const totalCurrentValue = goals.reduce((acc, goal) => acc + goal.valor_atual, 0)
  const overallProgress = totalMetaValue > 0 ? (totalCurrentValue / totalMetaValue) * 100 : 0

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-bg">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
                <Target className="text-neon-green" size={32} />
                Minhas Metas
              </h1>
              <p className="text-gray-400">Defina e acompanhe suas metas de vendas</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
              <Plus size={20} />
              Nova Meta
            </Button>
          </div>

          {/* Create Form */}
          {showForm && (
            <Card className="mb-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold text-white">Criar Nova Meta</h2>

                <Input
                  label="Nome da Meta"
                  placeholder="Ex: Comprar meu PC"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />

                <Input
                  label="Valor da Meta (R$)"
                  type="number"
                  step="0.01"
                  placeholder="2000.00"
                  value={formData.valor_meta}
                  onChange={(e) => setFormData({ ...formData, valor_meta: e.target.value })}
                  required
                />

                <Input
                  label="Prazo (Opcional)"
                  type="date"
                  value={formData.prazo}
                  onChange={(e) => setFormData({ ...formData, prazo: e.target.value })}
                />

                <div className="flex gap-4">
                  <Button type="submit" isLoading={submitting}>
                    Criar Meta
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Overall Progress */}
          {goals.length > 0 && (
            <Card className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Progresso Geral</h2>
                <Badge variant="default">{overallProgress.toFixed(0)}%</Badge>
              </div>
              <div className="space-y-2">
                <div className="w-full bg-dark-bg rounded-full h-4">
                  <div
                    className="bg-neon-green h-4 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(overallProgress, 100)}%` }}
                  />
                </div>
                <p className="text-gray-400 text-sm">
                  {formatCurrency(totalCurrentValue)} de {formatCurrency(totalMetaValue)}
                </p>
              </div>
            </Card>
          )}

          {/* Goals Grid */}
          {loading ? (
            <SkeletonLoader />
          ) : goals.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-6xl mb-4">🎯</p>
              <h3 className="text-xl font-bold text-white mb-2">Nenhuma meta criada</h3>
              <p className="text-gray-400 mb-6">Crie sua primeira meta para começar a acompanhar suas metas de vendas</p>
              <Button onClick={() => setShowForm(true)} className="flex items-center gap-2 mx-auto">
                <Plus size={20} />
                Criar Primeira Meta
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal) => {
                const progress = (goal.valor_atual / goal.valor_meta) * 100
                const isCompleted = goal.valor_atual >= goal.valor_meta

                return (
                  <Card key={goal.id} className="flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{goal.nome}</h3>
                        {goal.prazo && (
                          <p className="text-sm text-gray-400 mt-1">Prazo: {formatDate(goal.prazo)}</p>
                        )}
                      </div>
                      {isCompleted && <CheckCircle className="text-green-400" size={24} />}
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Progresso</span>
                        <Badge variant={isCompleted ? 'success' : 'default'}>{progress.toFixed(0)}%</Badge>
                      </div>
                      <div className="w-full bg-dark-bg rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            isCompleted ? 'bg-green-400' : 'bg-neon-green'
                          }`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mb-6 flex-grow">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Atual:</span>
                        <span className="text-neon-green font-bold">{formatCurrency(goal.valor_atual)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Meta:</span>
                        <span className="text-white font-bold">{formatCurrency(goal.valor_meta)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Faltam:</span>
                        <span className={isCompleted ? 'text-green-400' : 'text-yellow-400'}>
                          {formatCurrency(Math.max(0, goal.valor_meta - goal.valor_atual))}
                        </span>
                      </div>
                    </div>

                    {isCompleted && (
                      <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded-lg text-center font-bold mb-4">
                        🎉 Meta Alcançada!
                      </div>
                    )}

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(goal.id)}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      Deletar
                    </Button>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
