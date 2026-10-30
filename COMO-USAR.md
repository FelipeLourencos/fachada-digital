# Fachada Digital: página de vendas

Página de vendas da Fachada Digital (criação de sites para pequenos negócios). Foi copiada do
projeto `modelo-reparos` e refeita para vender o serviço.

Todo o conteúdo (WhatsApp, textos, passos, preço, portfólio, perguntas e cores) fica em um único
arquivo: **`src/conteudo.ts`**. O resto do projeto não precisa ser mexido.

## Rodar no computador

```bash
npm install
npm run dev
```

Antes de publicar, confirme que o build passa sem erros: `npm run build`.

## Antes de publicar

1. Preencha o `link` dos projetos do portfólio com o endereço dos sites publicados. Com `""`, o
   card aparece sem o link "Ver o site".

## O que fica em `src/conteudo.ts`

| Bloco | O que tem |
| --- | --- |
| `empresa` | nome, slogan, WhatsApp e a mensagem que já vem escrita |
| `seo` | título da aba e descrição para o Google |
| `botoes` | texto dos botões grandes, do botão do cabeçalho e do botão flutuante do celular |
| `menu` | links do cabeçalho |
| `topo` | título, texto, frase abaixo do botão e os prints do notebook e do celular |
| `problema` | os três cards do problema |
| `passos` | como funciona, em ordem |
| `incluso` | o que vem no site, com ícones |
| `portfolio` | sites do portfólio, com prints e link |
| `preco` | etiqueta, preço antigo e novo, condição, bônus e a linha da manutenção |
| `perguntas` | perguntas frequentes |
| `chamadaFinal` | título e frase antes do rodapé |
| `cores` | `escuro` (azul-marinho), `destaque` (verde-limão) e `fundo` (seções claras) |

**Seção vazia some sozinha**: deixe a lista vazia (`[]`) e a seção sai da página e do menu.

**Ícones**: a lista está no tipo `Icone`, no topo do `conteudo.ts`.

**Bônus**: `preco.bonus` mostra um quadro de destaque no card de preço. Hoje está `""` (escondido).

## Adicionar um cliente real ao portfólio

1. Tire os prints do site do cliente (pode ser a pasta do build ou o endereço publicado):

   ```bash
   npm run print-portfolio -- ../padaria-do-ze/dist padaria-do-ze
   npm run print-portfolio -- https://padariadoze.com.br padaria-do-ze
   ```

   Gera `public/portfolio/padaria-do-ze-computador.webp` (topo no computador) e
   `public/portfolio/padaria-do-ze-celular.webp` (topo no celular).
2. No `src/conteudo.ts`, copie um item de `portfolio.itens` e troque `nome`, `ramo`, `prints` e
   `link`. Os sites aparecem na ordem da lista.
3. Para mostrar o site do cliente no notebook e no celular do topo, aponte `topo.mockup` para os
   mesmos prints.

**Primeira vez neste computador?** O Playwright precisa do navegador dele. Se aparecer um erro
dizendo que o Chromium não foi encontrado, rode uma vez: `npx playwright install chromium`.

## Visual

- Fonte: Archivo, larga e pesada nos títulos (como o letreiro de uma loja) e normal no texto.
- Toldo listrado: aparece embaixo do cabeçalho e em cima da chamada final, como a fachada de uma
  loja. No topo ele "desenrola" no carregamento; é a única animação automática, junto com a
  entrada do título e do mockup. Quem pediu menos movimento no sistema vê tudo parado.
- Logo e ícone da aba: a vitrine com toldo em `public/favicon.svg` (o mesmo desenho do componente
  `Marca`, em `src/App.tsx`). Se mudar o desenho, rode `node scripts/favicon.mjs` para gerar o
  `public/apple-touch-icon.png`.
- Botão flutuante de WhatsApp: só no celular e no tablet, aparece depois que a pessoa rola
  além do topo.

## Publicar

```bash
npm run build
npx wrangler deploy
```

A página sai sem `noindex`: o Google pode indexar.
