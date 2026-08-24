# 📖 Documentação PIXBOX

## 🚀 Início Rápido

### Requisitos
- Node.js 18+
- npm ou yarn
- Conta Supabase

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/Allan123530/Jv-vendas-.git
cd Jv-vendas-
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=PIXBOX
```

4. **Execute o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Abra no navegador**
Acesse [http://localhost:3000](http://localhost:3000)

## 🗄️ Configuração do Banco de Dados

### Criar Tabelas

1. No painel do Supabase, vá para o editor SQL
2. Execute os scripts em `database/schema.sql`
3. (Opcional) Execute `database/seed.sql` para dados de teste

### Estrutura das Tabelas

- **profiles**: Usuários da plataforma
- **stores**: Lojas dos vendedores
- **products**: Produtos das lojas
- **sales**: Histórico de vendas
- **goals**: Metas de vendas
- **coupons**: Cupons e descontos
- **orders**: Pedidos (em desenvolvimento)

## 🏗️ Estrutura de Pastas

```
src/
├── app/              # Rotas e páginas Next.js
├── components/       # Componentes React
│   ├── Layout/       # Navbar, Footer
│   ├── UI/           # Componentes base (Button, Card, Input)
│   └── Products/     # Componentes de produtos
├── lib/              # Utilidades e configurações
│   ├── hooks/        # React Hooks customizados
│   ├── supabase.ts   # Cliente Supabase
│   ├── auth.ts       # Funções de autenticação
│   ├── store.ts      # Zustand stores
│   └── utils.ts      # Funções auxiliares
└── styles/           # Estilos globais
```

## 🔐 Autenticação

A autenticação é gerenciada pelo Supabase com:
- Email/Senha
- Row Level Security (RLS)
- Hooks customizados (`useAuth`, `useProfile`, `useRequireAuth`)

## 🎨 Tema e Estilos

O projeto usa TailwindCSS com cores customizadas:

```javascript
// tailwind.config.ts
colors: {
  'neon-green': '#00ff41',
  'neon-green-dark': '#00cc33',
  'dark-bg': '#0a0e27',
  'dark-card': '#1a1f3a',
  'dark-border': '#2d3748',
}
```

## 📱 Páginas Principais

### Públicas
- `/` - Home
- `/explorar` - Catálogo de produtos
- `/loja/[slug]` - Página da loja
- `/produto/[id]` - Página do produto
- `/como-funciona` - Como usar
- `/auth/login` - Login
- `/auth/signup` - Cadastro

### Privadas (Requerem autenticação)
- `/dashboard` - Painel inicial
- `/dashboard/produtos` - Meus produtos
- `/dashboard/produtos/novo` - Novo produto
- `/dashboard/ganhos` - Minhas vendas
- `/dashboard/metas` - Metas de vendas
- `/dashboard/loja/configurar` - Configuração da loja
- `/admin` - Painel administrativo

## 🔌 APIs e Integrações

### Supabase
- Autenticação
- Banco de dados PostgreSQL
- Row Level Security
- Realtime (futuro)

### WhatsApp (Futuro)
- Integração com WhatsApp Business API
- Notificações de pedidos

### Pagamentos (Futuro)
- Stripe
- PayPal
- PIX

## 🚀 Deploy

### Vercel (Recomendado)

1. Push seu código para GitHub
2. Conecte seu repositório no Vercel
3. Configure as variáveis de ambiente
4. Deploy automático

### Outras plataformas

- Netlify
- Railway
- Render

## 📚 Stack Tecnológico

- **Frontend**: Next.js 14, React 18, TypeScript
- **Estilos**: TailwindCSS, Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **State Management**: Zustand
- **Formulários**: React Hook Form + Zod
- **Icons**: Lucide React
- **Charts**: Recharts

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 📧 Contato

- Email: contato@pixbox.com
- WhatsApp: +55 11 9999-9999
- Instagram: @pixbox

## 🐛 Reportar Bugs

Encontre um bug? Abra uma issue no GitHub com:
- Descrição detalhada do bug
- Passos para reproduzir
- Screenshots (se aplicável)
- Seu ambiente (OS, navegador, etc)

## 🗺️ Roadmap

- [ ] Upload de imagens
- [ ] Integração WhatsApp Business
- [ ] Sistema de pagamento integrado
- [ ] Avaliações de produtos
- [ ] Sistema de chat
- [ ] Notificações em tempo real
- [ ] App mobile (React Native)
- [ ] Integração com redes sociais
- [ ] Analytics avançada
- [ ] Suporte multi-idioma

---

**Feito com ❤️ por Allan123530**
