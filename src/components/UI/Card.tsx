import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('bg-dark-card rounded-2xl border border-dark-border p-6', className)}>
      {children}
    </div>
  )
}
