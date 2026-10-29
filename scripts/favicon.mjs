// Gera o ícone para iPhone (public/apple-touch-icon.png, 180x180) a partir do public/favicon.svg,
// a mesma vitrine com toldo do logo. Rode de novo se mudar o favicon.svg ou as cores.
// Uso: node scripts/favicon.mjs
import { readFileSync } from "node:fs"
import sharp from "sharp"

// No iPhone o sistema já arredonda os cantos: o quadrado vai sem cantos arredondados
const svg = readFileSync("public/favicon.svg", "utf8").replace('rx="9"', 'rx="0"')

await sharp(Buffer.from(svg), { density: 600 }).resize(180, 180).png().toFile("public/apple-touch-icon.png")
console.log("ok public/apple-touch-icon.png")
