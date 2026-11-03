// Monta o mockup de cada projeto da vitrine: notebook e celular desenhados em CSS, com os prints do
// npm run print-portfolio dentro, sobre o mesmo azul-noite dos cards (o mesmo desenho do npm run mockup
// do modelo-reparos).
// Uso: npm run print-portfolio -- <site> <nome>   (primeiro, para gerar os prints)
//      npm run mockup                  → um mockup para cada projeto do portfólio em src/conteudo.ts
//      npm run mockup -- thais         → só public/portfolio/thais-mockup.webp
// Lê public/portfolio/<nome>-computador.webp e <nome>-celular.webp e salva
// public/portfolio/<nome>-mockup.webp (1600x1000). Tudo local, sem API.
import { existsSync, readFileSync } from "node:fs"
import { chromium } from "playwright"
import sharp from "sharp"

import { conteudo } from "../src/conteudo.ts"

// Sem nomes na linha de comando: todos os projetos do portfólio ("/portfolio/thais-mockup.webp" vira "thais")
const nomes = process.argv.slice(2).length
  ? process.argv.slice(2)
  : conteudo.portfolio.itens.map(({ mockup }) => mockup.replace(/^\/portfolio\//, "").replace(/-mockup\.webp$/, ""))

// Mesmo fundo dos cards (cores.grafite em src/conteudo.ts)
const CARTAO = conteudo.cores.grafite

const LARGURA = 1600
const ALTURA = 1000
// Posições em px. telaLargura é a largura do print dentro do aparelho; a altura sai da proporção do print.
const NOTEBOOK = { x: 180, y: 140, telaLargura: 1060 }
const CELULAR = { x: 1210, baseY: 878, telaLargura: 250 }

const dataUri = (arquivo, tipo) => `data:${tipo};base64,${readFileSync(arquivo).toString("base64")}`

/** Cor do topo do print do celular, para a barra de status combinar com o cabeçalho do site. */
async function corDoTopo(arquivo) {
  const { data } = await sharp(arquivo).extract({ left: 0, top: 0, width: 40, height: 12 }).resize(1, 1).raw().toBuffer({ resolveWithObject: true })
  const [r, g, b] = data
  const claro = 0.2126 * r + 0.7152 * g + 0.0722 * b > 150
  return { fundo: `rgb(${r} ${g} ${b})`, texto: claro ? "#111" : "#fff" }
}

function pagina({ printComputador, printCelular, barra }) {
  const nb = { ...NOTEBOOK, telaAltura: Math.round((NOTEBOOK.telaLargura * 860) / 1366) }
  // Moldura da tela do notebook: borda fina nas laterais, um pouco maior em cima (câmera) e embaixo
  const bordaLado = Math.round(nb.telaLargura * 0.016)
  const bordaTopo = Math.round(nb.telaLargura * 0.022)
  const telaExterna = { largura: nb.telaLargura + bordaLado * 2, altura: nb.telaAltura + bordaTopo + bordaLado }
  const baseLargura = Math.round(telaExterna.largura * 1.11)
  const baseAltura = Math.round(nb.telaLargura * 0.022)

  const cel = { ...CELULAR, telaAltura: Math.round((CELULAR.telaLargura * 812) / 375) }
  const borda = Math.round(cel.telaLargura * 0.045)
  const celExterno = { largura: cel.telaLargura + borda * 2, altura: cel.telaAltura + borda * 2 }

  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; }
  body {
    width: ${LARGURA}px; height: ${ALTURA}px; overflow: hidden; position: relative;
    background:
      radial-gradient(ellipse 65% 60% at 45% 40%, rgb(255 255 255 / 0.07), transparent 70%),
      ${CARTAO};
    font-family: system-ui, sans-serif;
  }
  .sombra { filter: drop-shadow(0 34px 44px rgb(0 0 0 / 0.5)) drop-shadow(0 6px 10px rgb(0 0 0 / 0.35)); }

  .notebook { position: absolute; left: ${nb.x}px; top: ${nb.y}px; width: ${telaExterna.largura}px; }
  .notebook .tela {
    position: relative; height: ${telaExterna.altura}px;
    padding: ${bordaTopo}px ${bordaLado}px ${bordaLado}px;
    background: #15171c; border-radius: ${Math.round(bordaTopo * 0.9)}px ${Math.round(bordaTopo * 0.9)}px 4px 4px;
    box-shadow: inset 0 0 0 1.5px #2c2f36;
  }
  .notebook .tela::before {
    content: ""; position: absolute; top: ${Math.round(bordaTopo / 2 - 3)}px; left: 50%;
    width: 6px; height: 6px; margin-left: -3px; border-radius: 50%; background: #2f333b;
  }
  .notebook .tela img { display: block; width: ${nb.telaLargura}px; height: ${nb.telaAltura}px; border-radius: 2px; }
  .notebook .base {
    position: relative; width: ${baseLargura}px; height: ${baseAltura}px;
    margin-left: ${-Math.round((baseLargura - telaExterna.largura) / 2)}px;
    background: linear-gradient(#eceef2 0%, #d5d8de 45%, #a9adb6 100%);
    border-radius: 2px 2px ${baseAltura}px ${baseAltura}px / 2px 2px ${Math.round(baseAltura * 0.8)}px ${Math.round(baseAltura * 0.8)}px;
  }
  .notebook .base::before {
    content: ""; position: absolute; top: 0; left: 50%; width: ${Math.round(baseLargura * 0.13)}px; height: ${Math.round(baseAltura * 0.38)}px;
    transform: translateX(-50%); border-radius: 0 0 8px 8px; background: linear-gradient(#bfc3ca, #d3d6dc);
  }

  .celular {
    position: absolute; left: ${cel.x}px; top: ${cel.baseY - celExterno.altura}px;
    width: ${celExterno.largura}px; height: ${celExterno.altura}px; padding: ${borda}px;
    background: #121418; border-radius: ${Math.round(celExterno.largura * 0.16)}px;
    box-shadow: inset 0 0 0 2px #3a3e46, inset 0 0 0 4px #121418;
  }
  .celular .tela {
    display: flex; flex-direction: column; overflow: hidden;
    width: ${cel.telaLargura}px; height: ${cel.telaAltura}px;
    border-radius: ${Math.round(celExterno.largura * 0.16) - borda}px; background: ${barra.fundo};
  }
  /* Barra de status, para a ilha da câmera não cobrir o cabeçalho do site */
  .celular .status {
    display: flex; flex: none; align-items: center; justify-content: space-between;
    height: ${Math.round(cel.telaLargura * 0.13)}px; padding: 0 ${Math.round(cel.telaLargura * 0.09)}px;
    font-size: ${Math.round(cel.telaLargura * 0.05)}px; font-weight: 650; color: ${barra.texto};
  }
  .celular .bateria {
    width: ${Math.round(cel.telaLargura * 0.075)}px; height: ${Math.round(cel.telaLargura * 0.036)}px;
    border-radius: 3px; background: ${barra.texto};
  }
  .celular img { display: block; flex: 1; min-height: 0; width: 100%; object-fit: cover; object-position: top; }
  .celular::after {
    content: ""; position: absolute; top: ${borda + Math.round(cel.telaLargura * 0.03)}px; left: 50%;
    width: ${Math.round(cel.telaLargura * 0.28)}px; height: ${Math.round(cel.telaLargura * 0.08)}px;
    transform: translateX(-50%); border-radius: 99px; background: #0b0c0f;
  }
</style></head>
<body>
  <div class="notebook sombra">
    <div class="tela"><img src="${printComputador}" alt=""></div>
    <div class="base"></div>
  </div>
  <div class="celular sombra">
    <div class="tela">
      <div class="status"><span>9:41</span><span class="bateria"></span></div>
      <img src="${printCelular}" alt="">
    </div>
  </div>
</body></html>`
}

const navegador = await chromium.launch()
try {
  for (const nome of nomes) {
    const prints = { computador: `public/portfolio/${nome}-computador.webp`, celular: `public/portfolio/${nome}-celular.webp` }
    const faltando = Object.values(prints).filter((arquivo) => !existsSync(arquivo))
    if (faltando.length) {
      console.error(`Não achei ${faltando.join(" e ")}. Rode antes: npm run print-portfolio -- <site> ${nome}`)
      process.exitCode = 1
      continue
    }

    const aba = await navegador.newPage({ viewport: { width: LARGURA, height: ALTURA }, deviceScaleFactor: 1 })
    await aba.setContent(
      pagina({
        printComputador: dataUri(prints.computador, "image/webp"),
        printCelular: dataUri(prints.celular, "image/webp"),
        barra: await corDoTopo(prints.celular),
      }),
      { waitUntil: "load" }
    )
    const png = await aba.screenshot()
    const arquivo = `public/portfolio/${nome}-mockup.webp`
    await sharp(png).webp({ quality: 84 }).toFile(arquivo)
    console.log("ok", arquivo)
    await aba.close()
  }
} finally {
  await navegador.close()
}
