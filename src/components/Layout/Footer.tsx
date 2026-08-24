'use client'

import Link from 'next/link'
import { Mail, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-dark-card border-t border-dark-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-neon-green mb-4">PIXBOX</h3>
            <p className="text-gray-400 text-sm">Seu catálogo. Seus produtos. Seu espaço.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Produto</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/explorar" className="hover:text-neon-green transition">
                  Explorar
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="hover:text-neon-green transition">
                  Como Funciona
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/privacidade" className="hover:text-neon-green transition">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-neon-green transition">
                  Termos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-4">Contato</h4>
            <div className="flex gap-4">
              <a href="mailto:support@pixbox.com" className="text-gray-400 hover:text-neon-green transition">
                <Mail size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-green transition">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-border pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 PIXBOX. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
