'use client'

import { Navbar } from '@/components/Layout/Navbar'
import { Footer } from '@/components/Layout/Footer'
import { Button } from '@/components/UI/Button'
import { Card } from '@/components/UI/Card'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

const steps = [
  {
    number: 1,
    title: 'Crie sua conta',
    description: 'Registre-se gratuitamente na plataforma PIXBOX em poucos minutos',
    emoji: '📝',
  },
  {
    number: 2,
    title: 'Configure sua loja',
    description: 'Personalize o nome, descrição e informações de contato da sua loja',
    emoji: '🏪',
  },
  {
    number: 3,
    title: 'Adicione seus produtos',
    description: 'Publique seus produtos com descrições, preços e categorias',
    emoji: '📦',
  },
  {
    number: 4,
    title: 'Comece a vender',
    description: 'Seus produtos aparecem no catálogo e clientes podem entrar em contato',
    emoji: '💰',
  },
]

const features = [
  {
    title: 'Catálogo Digital',
    description: 'Crie um catálogo profissional sem complicações técnicas',
    icon: '🎨',
  },
  {
    title: 'Integração WhatsApp',
    description: 'Receba pedidos direto no WhatsApp de forma simples e segura',
    icon: '💬',
  },
  {
    title: 'Controle de Vendas',
    description: 'Acompanhe todas as suas vendas em um único painel',
    icon: '📊',
  },
  {
    title: 'Sistema de Metas',
    description: 'Defina e acompanhe suas metas de vendas mensais',
    icon: '🎯',
  },
  {
    title: 'Descontos e Promoções',
    description: 'Crie cupons e aplique descontos aos seus produtos',
    icon: '🏷️',
  },
  {
    title: 'Estatísticas',
    description: 'Visualize relatórios e análises de seus ganhos',
    icon: '📈',
  },
]

const pricingPlans = [
  {
    name: 'Gratuito',
    price: 'R$ 0',
    description: 'Perfeito para começar',
    features: [
      'Até 10 produtos',
      'Catálogo básico',
      'Integração WhatsApp',
      'Suporte comunitário',
    ],
  },
  {
    name: 'Professional',
    price: 'R$ 29',
    period: '/mês',
    description: 'Para vendedores sérios',
    features: [
      'Produtos ilimitados',
      'Descontos e cupons',
      'Sistema de metas',
      'Estatísticas avançadas',
      'Suporte prioritário',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Personalizado',
    description: 'Para grandes vendedores',
    features: [
      'Tudo do Professional',
      'API integrada',
      'Suporte 24/7',
      'Relatórios customizados',
      'Gestor dedicado',
    ],
  },
]

export default function ComoFuncionaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-dark-bg">
        {/* Hero */}
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-transparent to-transparent blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.1),transparent_70%)]" />

          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Como <span className="text-neon-green">Funciona</span> o PIXBOX
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Venda seus produtos online de forma simples, segura e profissional em 4 passos
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-16">Comece em 4 Passos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {steps.map((step, index) => (
                <div key={step.number}>
                  <Card className="h-full flex flex-col text-center hover:border-neon-green transition">
                    <div className="text-5xl mb-4">{step.emoji}</div>
                    <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-neon-green font-bold">{step.number}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm flex-grow">{step.description}</p>
                  </Card>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/auth/signup">
                <Button size="lg" className="flex items-center gap-2 mx-auto">
                  Começar Agora
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-card/30 border-y border-dark-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-16">Recursos Incríveis</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {features.map((feature) => (
                <Card key={feature.title} className="hover:border-neon-green transition">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-16">Planos e Preços</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`flex flex-col ${
                    plan.highlighted
                      ? 'border-neon-green md:scale-105 shadow-lg shadow-neon-green/20'
                      : ''
                  }`}
                >
                  {plan.highlighted && (
                    <div className="bg-neon-green text-dark-bg px-4 py-2 rounded-lg text-center font-bold mb-4">
                      ⭐ Mais Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-neon-green">{plan.price}</span>
                    {plan.period && <span className="text-gray-400 text-sm">{plan.period}</span>}
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-300">
                        <Check size={20} className="text-neon-green flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.highlighted ? 'default' : 'outline'}
                    size="lg"
                    className="w-full"
                  >
                    Começar
                  </Button>
                </Card>
              ))}
            </div>

            <div className="bg-dark-card rounded-2xl border border-dark-border p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Precisa de algo customizado?</h3>
              <p className="text-gray-400 mb-6">Entre em contato conosco para planos Enterprise</p>
              <Link href="mailto:contato@pixbox.com">
                <Button variant="ghost">Enviar Email</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-card/30 border-t border-dark-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Perguntas Frequentes</h2>

            <div className="space-y-4">
              {[
                {
                  q: 'É realmente gratuito?',
                  a: 'Sim! O plano Gratuito é completamente gratuito e sem limite de tempo. Você pode usar com até 10 produtos.',
                },
                {
                  q: 'Qual é a taxa de comissão?',
                  a: 'Não cobramos comissão sobre vendas. Você recebe 100% do valor. Apenas os planos pagos têm mensalidade.',
                },
                {
                  q: 'Posso mudar de plano depois?',
                  a: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento, sem penalidades.',
                },
                {
                  q: 'Como funciona o pagamento?',
                  a: 'Os clientes fazem contato via WhatsApp e combinam a forma de pagamento (PIX, transferência, cartão).',
                },
              ].map((item, i) => (
                <Card key={i}>
                  <h3 className="text-lg font-bold text-white mb-2">{item.q}</h3>
                  <p className="text-gray-400 text-sm">{item.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
