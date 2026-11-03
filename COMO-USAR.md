# Fachada Digital: página de vendas

Página de vendas da Fachada Digital (sites sob medida para profissionais e pequenos negócios).

Todo o conteúdo (WhatsApp, textos, projetos, vantagens, passos, investimento e cores) fica em um
único arquivo: **`src/conteudo.ts`**. O resto do projeto não precisa ser mexido.

## Rodar no computador

```bash
npm install
npm run dev
```

Antes de publicar, confirme que o build passa sem erros: `npm run build`.

## O que fica em `src/conteudo.ts`

| Bloco | O que tem |
| --- | --- |
| `empresa` | nome, WhatsApp e a mensagem que já vem escrita |
| `seo` | título da aba e descrição para o Google |
| `botao` | texto de todos os botões de WhatsApp |
| `menu` | links do cabeçalho |
| `topo` | frase principal e subtítulo |
| `portfolio` | rótulo, título, projetos da vitrine e a frase abaixo deles |
| `vantagens` | cards de "Por que ter um site personalizado", com ícones |
| `passos` | como funciona, em ordem |
| `investimento` | preço, forma de pagamento e os itens ao lado (domínio, ajustes, manutenção) |
| `cores` | `noite` (fundo), `grafite` (seções alternadas e cards) e `destaque` (âmbar, só em botões e detalhes) |

**Seção vazia some sozinha**: deixe a lista vazia (`[]`) e a seção sai da página e do menu.

**Ícones**: a lista está no tipo `Icone`, no topo do `conteudo.ts`.

**Cards do mesmo tamanho**: use 3 destaques em todos os projetos.

## Adicionar um site à vitrine

1. Tire os prints do site (pode ser a pasta do build ou o endereço publicado):

   ```bash
   npm run print-portfolio -- ../padaria-do-ze/dist padaria-do-ze
   npm run print-portfolio -- https://padariadoze.com.br padaria-do-ze
   ```

   Gera `public/portfolio/padaria-do-ze-computador.webp` e `padaria-do-ze-celular.webp`.
2. Monte o mockup (notebook + celular, no mesmo desenho do `npm run mockup` do modelo-reparos):

   ```bash
   npm run mockup -- padaria-do-ze
   ```

   Gera `public/portfolio/padaria-do-ze-mockup.webp`. Sem nome, o comando refaz o mockup de todos
   os projetos do `conteudo.ts`.
3. No `src/conteudo.ts`, copie um item de `portfolio.itens` e troque `nome`, `nicho`, `mockup`,
   `alt` e `destaques`. Os projetos aparecem na ordem da lista. Os cards não têm link.

**Primeira vez neste computador?** O Playwright precisa do navegador dele. Se aparecer um erro
dizendo que o Chromium não foi encontrado, rode uma vez: `npx playwright install chromium`.

## Visual

- Fundo azul-noite e grafite, texto claro e um único tom de destaque (âmbar) nos botões e detalhes.
- Fontes: Fraunces nos títulos e Inter no texto.
- Animações: o topo entra em sequência no carregamento e as seções surgem ao rolar. Quem pediu
  menos movimento no sistema vê tudo parado.
- Logo e ícone da aba: a vitrine com toldo em `public/favicon.svg` (o mesmo desenho do componente
  `Marca`, em `src/App.tsx`). Se mudar o desenho, rode `node scripts/favicon.mjs` para gerar o
  `public/apple-touch-icon.png`.

## Publicar

```bash
npm run build
npx wrangler deploy
```

A página sai sem `noindex`: o Google pode indexar.
