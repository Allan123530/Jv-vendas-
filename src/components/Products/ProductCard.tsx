'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Flame } from 'lucide-react'
import { Button } from '../UI/Button'
import { Badge } from '../UI/Badge'

interface ProductCardProps {
  id: string
  nome: string
  descricao: string
  preco: number
  precoComDesconto?: number
  imagem: string | null
  loja: string
  lojaSlug: string
  destaque?: boolean
  desconto?: number
}

export function ProductCard({
  id,
  nome,
  descricao,
  preco,
  precoComDesconto,
  imagem,
  loja,
  lojaSlug,
  destaque,
  desconto,
}: ProductCardProps) {
  return (
    <div className="bg-dark-card rounded-2xl border border-dark-border overflow-hidden hover:border-neon-green transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/20">
      {/* Image */}
      <div className="relative h-48 bg-dark-bg overflow-hidden group">
        {imagem ? (
          <Image src={imagem} alt={nome} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-bg to-dark-card">
            <span className="text-4xl">📦</span>
          </div>
        )}
        {destaque && (
          <div className="absolute top-3 right-3">
            <Badge variant="warning" className="flex items-center gap-1">
              <Flame size={14} /> Em Destaque
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col">
        {/* Name and Store */}
        <h3 className="font-bold text-white text-lg line-clamp-2 mb-1">{nome}</h3>
        <p className="text-xs text-gray-500 mb-2">{loja}</p>

        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-2 mb-3 flex-grow">{descricao}</p>

        {/* Price */}
        <div className="mb-4">
          {precoComDesconto ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-neon-green">R$ {precoComDesconto.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through">R$ {preco.toFixed(2)}</span>
              {desconto && <Badge variant="danger">-R$ {desconto}</Badge>}
            </div>
          ) : (
            <span className="text-lg font-bold text-neon-green">R$ {preco.toFixed(2)}</span>
          )}
        </div>

        {/* Button */}
        <Link href={`/produto/${id}`} className="w-full">
          <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
            <ShoppingCart size={16} />
            Ver Produto
          </Button>
        </Link>
      </div>
    </div>
  )
}
