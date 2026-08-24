'use client'

import { ReactNode } from 'react'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <title>PIXBOX - Sua loja digital</title>
        <meta name="description" content="Crie seu catálogo digital e venda seus produtos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-dark-bg text-white">{children}</body>
    </html>
  )
}
