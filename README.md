# 🏛️ Gerador de Carrossel — Regularização de Imóveis

Ferramenta para gerar carrosséis de Instagram com IA, voltada para o nicho de regularização de imóveis e redução de INSS em obras.

---

## 🚀 Como colocar no ar (passo a passo)

### 1. Criar conta no GitHub (gratuito)
1. Acesse https://github.com e crie uma conta
2. Clique em **New repository**
3. Nome: `carrossel-imoveis`
4. Deixe **Public** marcado
5. Clique em **Create repository**

### 2. Enviar os arquivos para o GitHub
Na página do repositório criado, clique em **uploading an existing file** e envie todos os arquivos desta pasta.

Ou, se tiver o Git instalado no computador:
```bash
cd carrossel-imoveis
git init
git add .
git commit -m "primeiro deploy"
git remote add origin https://github.com/SEU_USUARIO/carrossel-imoveis.git
git push -u origin main
```

### 3. Criar conta no Vercel (gratuito)
1. Acesse https://vercel.com
2. Clique em **Sign Up** → escolha **Continue with GitHub**
3. Autorize o Vercel a acessar sua conta GitHub

### 4. Fazer o deploy
1. No painel do Vercel, clique em **Add New Project**
2. Selecione o repositório `carrossel-imoveis`
3. Clique em **Deploy**
4. Aguarde ~1 minuto
5. ✅ Pronto! Você receberá um link como `carrossel-imoveis.vercel.app`

---

## 🔑 Chave de API (necessária para usar)

A ferramenta precisa de uma chave da Anthropic para funcionar.

1. Acesse https://console.anthropic.com/settings/keys
2. Crie uma conta gratuita (tem crédito inicial)
3. Clique em **Create Key**
4. Cole a chave no campo da ferramenta

> A chave fica salva no navegador de quem usar — não vai para nenhum servidor.

---

## 💡 Como usar

1. Abra o link do Vercel no celular ou computador
2. Cole sua chave de API (só precisa fazer isso uma vez por dispositivo)
3. Digite o tema do carrossel
4. Escolha o objetivo e a quantidade de slides
5. Clique em **Gerar Carrossel**
6. Copie a legenda e as hashtags para o Instagram
7. Use o roteiro visual para montar os slides no Canva

---

## 📁 Estrutura dos arquivos

```
carrossel-imoveis/
├── index.html          # Página principal
├── package.json        # Dependências
├── vite.config.js      # Configuração do Vite
└── src/
    ├── main.jsx        # Entrada React
    └── App.jsx         # Aplicação completa
```

---

Feito com ❤️ e Claude AI
