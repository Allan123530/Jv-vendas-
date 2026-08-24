# 🚀 Guia de Setup - PIXBOX

## Pré-requisitos

✅ Conta GitHub
✅ Node.js 18+ instalado
✅ Conta Supabase (gratuita)
✅ Conhecimento básico de Terminal

## Passo 1: Clonar o Repositório

```bash
git clone https://github.com/Allan123530/Jv-vendas-.git
cd Jv-vendas-
```

## Passo 2: Instalar Dependências

```bash
npm install
```

Ou com yarn:

```bash
yarn install
```

## Passo 3: Configurar Supabase

### 3.1 Criar Projeto Supabase

1. Vá para [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Preencha as informações:
   - Name: `pixbox-dev`
   - Password: Crie uma senha forte
   - Region: Escolha a região mais próxima
5. Clique em "Create new project"

### 3.2 Obter Chaves de API

1. Vá para Settings > API
2. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### 3.3 Criar Tabelas

1. Vá para SQL Editor no Supabase
2. Crie uma nova query
3. Cole o conteúdo de `database/schema.sql`
4. Clique em "Run"
5. (Opcional) Repita com `database/seed.sql` para dados de teste

## Passo 4: Configurar Variáveis de Ambiente

1. Na raiz do projeto, crie um arquivo `.env.local`:

```bash
touch .env.local
```

2. Abra o arquivo e adicione:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=PIXBOX
```

3. Salve o arquivo

## Passo 5: Executar Localmente

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador

## Passo 6: Criar Primeira Conta

1. Clique em "Criar Loja"
2. Preencha:
   - Nome completo
   - Email
   - Senha
3. Clique em "Criar conta"
4. Faça login

## Passo 7: Configurar Loja

1. No dashboard, clique em "Configurar Loja"
2. Preencha as informações:
   - Nome da loja
   - Descrição
   - WhatsApp (com código do país)
   - Instagram (opcional)
3. Clique em "Salvar"

## Passo 8: Adicionar Primeiro Produto

1. No dashboard, clique em "Adicionar Produto"
2. Preencha:
   - Nome do produto
   - Descrição
   - Preço
   - Categoria
   - Estoque
3. Clique em "Publicar Produto"

## 🎉 Pronto!

Sua loja está online! Agora você pode:

✅ Visualizar na seção "Explorar"
✅ Compartilhar link da loja
✅ Receber pedidos via WhatsApp
✅ Acompanhar vendas no dashboard

## 🐛 Troubleshooting

### Erro: "Cannot find module"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Variáveis de ambiente não definidas"

✅ Verifique se `.env.local` existe na raiz
✅ Verifique se copiou corretamente as chaves do Supabase
✅ Reinicie o servidor: `npm run dev`

### Erro: "Connection refused"

✅ Verifique se a URL do Supabase está correta
✅ Verifique a conexão com a internet
✅ Verifique se o projeto Supabase está ativo

### Erro: "Table not found"

✅ Execute os scripts SQL em `database/schema.sql`
✅ Verifique se o serviço_role_key tem permissões corretas

## 📚 Próximos Passos

1. Leia a [documentação completa](./README.md)
2. Explore as páginas do aplicativo
3. Customize cores e fontes em `tailwind.config.ts`
4. Adicione mais funcionalidades conforme necessário

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

Siga as instruções para fazer o deploy

### Alternativas

- Netlify
- Railway.app
- Render.com

## 📞 Suporte

Com dúvidas?

- 📧 Email: contato@pixbox.com
- 💬 WhatsApp: +55 11 9999-9999
- 🐛 GitHub Issues: Abra uma issue

---

**Sucesso! 🎉**
