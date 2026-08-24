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
import { TrendingUp, Download, Filter } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Sale {
  id: string
  produto_id: string
  valor: number
  quantidade: number
  desconto: number
  valor_liquido: number
  status: 'pendente' | 'confirmada' | 'cancelada'
  created_at: string
  products?: { nome: string }
}

export default function GanhosPage() {
  const { user, loading: authLoading } = useRequireAuth()
  const { profile, loading: profileLoading } = useProfile()
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<'todos' | 'confirmada' | 'pendente' | 'cancelada'>('todos')

  useEffect(() => {
    if (!user) return

    const fetchSales = async () => {
      try {
        setLoading(true)
        let query = supabase
          .from('sales')
          .select('id, product_id, valor, quantidade, desconto, valor_liquido, status, created_at, products(nome)')
          .eq('seller_id', user.id)
          .order('created_at', { ascending: false })

        if (statusFilter !== 'todos') {
          query = query.eq('status', statusFilter)
        }

        const { data, error } = await query
        if (error) throw error
        setSales(data || [])
      } catch (error) {
        console.error('Erro ao carregar vendas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSales()
  }, [user, statusFilter])

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

  const totalFaturamento = sales
    .filter(s => s.status === 'confirmada')
    .reduce((acc, sale) => acc + sale.valor, 0)

  const totalVendas = sales.filter(s => s.status === 'confirmada').length
  const ticketMedio = totalVendas > 0 ? totalFaturamento / totalVendas : 0
  const totalDescontos = sales
    .filter(s => s.status === 'confirmada')
    .reduce((acc, sale) => acc + sale.desconto, 0)

  const thisMonthSales = sales.filter(sale => {
    const saleDate = new Date(sale.created_at)
    const now = new Date()
    return saleDate.getMonth() === now.getMonth() && saleDate.getFullYear() === now.getFullYear()
  })
  const thisMonthTotal = thisMonthSales
    .filter(s => s.status === 'confirmada')
    .reduce((acc, sale) => acc + sale.valor, 0)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-bg">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
              <TrendingUp className="text-neon-green" size={32} />
              Meus Ganhos
            </h1>
            <p className="text-gray-400">Acompanhe suas vendas e faturamento</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="flex flex-col">
              <p className="text-gray-400 text-sm mb-2">Faturamento Total</p>
              <p className="text-3xl font-bold text-neon-green">{formatCurrency(totalFaturamento)}</p>
              <p className="text-xs text-gray-500 mt-2">Apenas vendas confirmadas</p>
            </Card>

            <Card className="flex flex-col">
              <p className="text-gray-400 text-sm mb-2">Este Mês</p>
              <p className="text-3xl font-bold text-neon-green">{formatCurrency(thisMonthTotal)}</p>
              <p className="text-xs text-gray-500 mt-2">{thisMonthSales.length} vendas</p>
            </Card>

            <Card className="flex flex-col">
              <p className="text-gray-400 text-sm mb-2">Ticket Médio</p>
              <p className="text-3xl font-bold text-neon-green">{formatCurrency(ticketMedio)}</p>
              <p className="text-xs text-gray-500 mt-2">{totalVendas} vendas</p>
            </Card>

            <Card className="flex flex-col">
              <p className="text-gray-400 text-sm mb-2">Total Descontos</p>
              <p className="text-3xl font-bold text-red-400">-{formatCurrency(totalDescontos)}</p>
              <p className="text-xs text-gray-500 mt-2">Valor concedido</p>
            </Card>
          </div>

          {/* Filters */}
          <div className="mb-6 flex gap-2 flex-wrap">
            {(['todos', 'confirmada', 'pendente', 'cancelada'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg transition ${
                  statusFilter === status
                    ? 'bg-neon-green text-dark-bg'
                    : 'bg-dark-card border border-dark-border text-gray-300 hover:border-neon-green'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Sales Table */}
          <Card>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="text-center py-12">Carregando...</div>
              ) : sales.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-6xl mb-4">📊</p>
                  <h3 className="text-xl font-bold text-white mb-2">Nenhuma venda encontrada</h3>
                  <p className="text-gray-400">Você ainda não possui vendas registradas</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-border">
                      <th className="text-left py-4 px-4 text-gray-400 font-medium">Produto</th>
                      <th className="text-left py-4 px-4 text-gray-400 font-medium">Data</th>
                      <th className="text-right py-4 px-4 text-gray-400 font-medium">Valor</th>
                      <th className="text-right py-4 px-4 text-gray-400 font-medium">Desconto</th>
                      <th className="text-right py-4 px-4 text-gray-400 font-medium">Líquido</th>
                      <th className="text-center py-4 px-4 text-gray-400 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale) => (
                      <tr key={sale.id} className="border-b border-dark-border/50 hover:bg-dark-bg/50 transition">
                        <td className="py-4 px-4 text-white">{sale.products?.nome || 'Produto deletado'}</td>
                        <td className="py-4 px-4 text-gray-400">{formatDate(sale.created_at)}</td>
                        <td className="py-4 px-4 text-right text-white">{formatCurrency(sale.valor)}</td>
                        <td className="py-4 px-4 text-right text-red-400">-{formatCurrency(sale.desconto)}</td>
                        <td className="py-4 px-4 text-right text-neon-green font-bold">{formatCurrency(sale.valor_liquido)}</td>
                        <td className="py-4 px-4 text-center">
                          <Badge
                            variant={
                              sale.status === 'confirmada'
                                ? 'success'
                                : sale.status === 'pendente'
                                ? 'warning'
                                : 'danger'
                            }
                          >
                            {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
