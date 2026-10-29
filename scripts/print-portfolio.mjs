// Tira os prints de um site para o portfólio (e para o mockup do topo).
// Uso: npm run print-portfolio -- <pasta do build ou endereço https://...> <nome>
//   npm run print-portfolio -- ../corte-fino/dist corte-fino
//   npm run print-portfolio -- https://site-do-cliente.com.br padaria-do-ze
// Salva em public/portfolio/:
//   <nome>-computador.webp  1366x860 (topo no computador)
//   <nome>-celular.webp     375x812  (topo no celular)
// Depois é só apontar os campos "print" do portfólio, em src/conteudo.ts, para esses arquivos.
import { mkdirSync } from "node:fs"
import path from "node:path"
import { chromium } from "playwright"
import sharp from "sharp"
import { preview } from "vite"

const [origem, nome] = process.argv.slice(2)
if (!origem || !nome) {
  console.error("Uso: npm run print-portfolio -- <pasta do build ou https://...> <nome>")
  process.exit(1)
}

const TELAS = [
  { sufixo: "computador", largura: 1366, altura: 860, celular: false },
  { sufixo: "celular", largura: 375, altura: 812, celular: true },
]

// Uma pasta de build (dist) é servida localmente; um endereço da internet é aberto direto
let servidor = null
let endereco = origem
if (!origem.startsWith("http")) {
  servidor = await preview({
    root: path.resolve(origem, ".."),
    configFile: false,
    build: { outDir: path.resolve(origem) },
    preview: { port: 4318, open: false },
    logLevel: "warn",
  })
  endereco = servidor.resolvedUrls.local[0]
}

mkdirSync("public/portfolio", { recursive: true })
const navegador = await chromium.launch()
try {
  for (const { sufixo, largura, altura, celular } of TELAS) {
    const pagina = await navegador.newPage({
      viewport: { width: largura, height: altura },
      // Print em dobro: fica nítido dentro do mockup e dos cards
      deviceScaleFactor: 2,
      isMobile: celular,
      hasTouch: celular,
    })
    await pagina.goto(endereco, { waitUntil: "networkidle" })
    await pagina.evaluate(() => document.fonts.ready)
    // Espera a animação de entrada do topo terminar
    await pagina.waitForTimeout(2500)
    const png = await pagina.screenshot()
    const arquivo = `public/portfolio/${nome}-${sufixo}.webp`
    // Computador em 1600px de largura e celular em 750px: nítido sem pesar no carregamento
    await sharp(png).resize(celular ? 750 : 1600).webp({ quality: 82 }).toFile(arquivo)
    console.log("ok", arquivo)
    await pagina.close()
  }
} finally {
  await navegador.close()
  await servidor?.close()
}
