import {
  Check,
  Globe,
  MessageCircle,
  Palette,
  Search,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from "lucide-react"
import { MotionConfig, motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { EASE_EDITORIAL } from "@/lib/motion"
import { FadeUp } from "@/components/motion"
import { conteudo, type Icone } from "@/conteudo"

// Todo o texto, contato e imagem vem de src/conteudo.ts
const { empresa, botao, menu, topo, portfolio, vantagens, passos, investimento } = conteudo

/** Seções só existem quando o conteudo.ts traz dados para elas. */
const temPortfolio = portfolio.itens.length > 0
const temVantagens = vantagens.itens.length > 0
const temPassos = passos.itens.length > 0

const WHATSAPP_URL = `https://wa.me/${empresa.whatsapp}${
  empresa.mensagemWhatsapp ? `?text=${encodeURIComponent(empresa.mensagemWhatsapp)}` : ""
}`

/** 5511999999999 vira (11) 99999-9999. */
const TELEFONE = empresa.whatsapp.replace(/^55(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3")

const ANO = new Date().getFullYear()

/** Links do menu que dependem de seções opcionais. */
const secaoVisivel: Record<string, boolean> = {
  "#projetos": temPortfolio,
  "#vantagens": temVantagens,
  "#como-funciona": temPassos,
}

const ICONES: Record<Icone, LucideIcon> = {
  busca: Search,
  whatsapp: MessageCircle,
  marca: Palette,
  celular: Smartphone,
  dominio: Globe,
  confianca: ShieldCheck,
}

/** Medidas comuns: mesma largura e mesmo respiro em todas as seções. */
const CONTAINER = "mx-auto w-full max-w-6xl px-5 sm:px-8"
const SECAO = "py-24 sm:py-32"

/** Mantém "R$" e o valor na mesma linha. */
const valor = (texto: string) => texto.replaceAll("R$ ", "R$ ")

/** Botão de WhatsApp, sempre no tom de destaque. */
function BotaoWhatsapp({ tamanho = "normal", className }: { tamanho?: "compacto" | "normal" | "grande"; className?: string }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-full bg-destaque font-semibold whitespace-nowrap text-noite shadow-[0_8px_30px_-12px] shadow-destaque/50 transition-[background-color,translate] duration-200 hover:bg-destaque-claro active:translate-y-px",
        tamanho === "compacto" && "h-10 px-5 text-[0.92rem]",
        tamanho === "normal" && "h-14 px-8 text-[1.05rem]",
        tamanho === "grande" && "h-16 px-10 text-[1.1rem]",
        className
      )}
    >
      <MessageCircle className="size-[1.15em] shrink-0" strokeWidth={2.25} aria-hidden /> {botao}
    </a>
  )
}

/** Vitrine com toldo listrado: a marca da Fachada Digital (o mesmo desenho do public/favicon.svg). */
function Marca({ className }: { className?: string }) {
  return (
    <svg viewBox="4 6 32 28" className={cn("size-8 shrink-0", className)} aria-hidden>
      <path d="M6 8h7v7a3.5 3.5 0 0 1-7 0z" fill="var(--destaque)" />
      <path d="M13 8h7v7a3.5 3.5 0 0 1-7 0z" fill="var(--texto)" />
      <path d="M20 8h7v7a3.5 3.5 0 0 1-7 0z" fill="var(--destaque)" />
      <path d="M27 8h7v7a3.5 3.5 0 0 1-7 0z" fill="var(--texto)" />
      <rect x="8.5" y="21.5" width="23" height="11" rx="1" fill="none" stroke="var(--texto)" strokeWidth="2" />
      <rect x="12" y="25" width="7" height="4.5" rx="0.5" fill="var(--texto)" />
      <rect x="22.5" y="25" width="5.5" height="7.5" fill="var(--destaque)" />
    </svg>
  )
}

function Logo() {
  return (
    <a href="#topo" className="flex items-center gap-3">
      <Marca />
      <span className="font-serif text-[1.2rem] font-medium tracking-[-0.01em] whitespace-nowrap sm:text-[1.3rem]">
        {empresa.nome}
      </span>
    </a>
  )
}

function Header() {
  const links = menu.filter(({ link }) => secaoVisivel[link] ?? true)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-linha bg-noite/85 backdrop-blur-md">
      <div className={cn(CONTAINER, "flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]")}>
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {links.map(({ rotulo, link }) => (
            <a key={link} href={link} className="text-[0.95rem] text-texto-suave transition-colors hover:text-texto">
              {rotulo}
            </a>
          ))}
        </nav>

        <BotaoWhatsapp tamanho="compacto" className="hidden shadow-none sm:inline-flex" />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${botao} (WhatsApp)`}
          className="flex size-11 items-center justify-center rounded-full bg-destaque text-noite sm:hidden"
        >
          <MessageCircle className="size-5" strokeWidth={2.25} aria-hidden />
        </a>
      </div>
    </header>
  )
}

/** Entrada do topo, em sequência. É a única animação automática da página. */
const entrada = (ordem: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: 0.15 + ordem * 0.12, ease: EASE_EDITORIAL },
})

/** O último trecho do título ("na internet") sai em itálico. */
function TituloTopo() {
  const [inicio, fim] = topo.titulo.split(/ (?=na internet$)/)
  return (
    <>
      {inicio}
      {fim && (
        <>
          {" "}
          <em className="italic">{fim}</em>
        </>
      )}
    </>
  )
}

function Topo() {
  return (
    <section id="topo" className="relative overflow-hidden">
      {/* Luz suave vinda do alto, sem usar o tom de destaque */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, #1a2846, transparent 75%)" }}
      />
      <div className={cn(CONTAINER, "relative flex flex-col items-center pt-40 pb-28 text-center sm:pt-52 sm:pb-40")}>
        <motion.h1
          {...entrada(0)}
          className="titulo-display max-w-4xl text-[2.9rem] sm:text-[4.5rem] lg:text-[5.4rem]"
        >
          <TituloTopo />
        </motion.h1>
        <motion.p {...entrada(1)} className="mt-7 max-w-xl text-[1.15rem] text-pretty text-texto-suave sm:mt-8 sm:text-[1.3rem]">
          {topo.subtitulo}
        </motion.p>
        <motion.div {...entrada(2)} className="mt-11 sm:mt-12">
          <BotaoWhatsapp />
        </motion.div>
      </div>
    </section>
  )
}

/** Rótulo e título, iguais em todas as seções. */
function CabecalhoSecao({ rotulo, titulo, id }: { rotulo: string; titulo: string; id: string }) {
  return (
    <FadeUp className="max-w-2xl">
      <p className="rotulo">{rotulo}</p>
      <h2 id={id} className="titulo-secao mt-5 text-[2.2rem] sm:text-[3rem]">
        {titulo}
      </h2>
    </FadeUp>
  )
}

function Projetos() {
  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className={cn(SECAO, "border-t border-linha")}>
      <div className={CONTAINER}>
        <CabecalhoSecao id="projetos-titulo" rotulo={portfolio.rotulo} titulo={portfolio.titulo} />

        <ul className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-2 lg:gap-8">
          {portfolio.itens.map((projeto, i) => (
            <li key={projeto.nome}>
              <FadeUp delay={i * 0.1} className="flex h-full flex-col overflow-hidden rounded-2xl border border-linha bg-grafite">
                <img
                  src={projeto.mockup}
                  alt={projeto.alt}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="flex flex-1 flex-col border-t border-linha p-7 sm:p-9">
                  <p className="rotulo">{projeto.nicho}</p>
                  <h3 className="titulo-item mt-3 text-[1.6rem] sm:text-[1.8rem]">{projeto.nome}</h3>
                  <ul className="mt-6 space-y-3.5">
                    {projeto.destaques.map((destaque) => (
                      <li key={destaque} className="flex gap-3 text-[1rem] text-texto-suave">
                        <Check className="mt-[0.3em] size-4 shrink-0 text-destaque" strokeWidth={2.5} aria-hidden />
                        {destaque}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </li>
          ))}
        </ul>

        {portfolio.rodape && (
          <FadeUp>
            <p className="mx-auto mt-14 max-w-2xl text-center text-[1.05rem] text-pretty text-texto-suave sm:mt-16">
              {portfolio.rodape}
            </p>
          </FadeUp>
        )}
      </div>
    </section>
  )
}

function Vantagens() {
  return (
    <section id="vantagens" aria-labelledby="vantagens-titulo" className={cn(SECAO, "bg-grafite")}>
      <div className={CONTAINER}>
        <CabecalhoSecao id="vantagens-titulo" rotulo={vantagens.rotulo} titulo={vantagens.titulo} />

        <ul className="mt-14 grid gap-5 sm:mt-16 sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
          {vantagens.itens.map(({ icone, titulo, texto }, i) => {
            const Icon = ICONES[icone]
            return (
              <li key={titulo}>
                <FadeUp delay={(i % 3) * 0.08} className="flex h-full flex-col rounded-xl border border-linha bg-noite/55 p-7 sm:p-8">
                  <span className="flex size-11 items-center justify-center rounded-lg border border-destaque/25 bg-destaque/10 text-destaque">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="titulo-item mt-6 text-[1.3rem]">{titulo}</h3>
                  <p className="mt-3 text-[0.98rem] text-pretty text-texto-suave">{texto}</p>
                </FadeUp>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function ComoFunciona() {
  return (
    <section id="como-funciona" aria-labelledby="passos-titulo" className={SECAO}>
      <div className={CONTAINER}>
        <CabecalhoSecao id="passos-titulo" rotulo={passos.rotulo} titulo={passos.titulo} />

        <ol className="mt-14 grid gap-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {passos.itens.map(({ titulo, texto }, i) => (
            <li key={titulo}>
              <FadeUp delay={i * 0.08} className="h-full border-t border-linha pt-7">
                <span className="font-serif text-[1.1rem] text-destaque">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="titulo-item mt-3 text-[1.4rem]">{titulo}</h3>
                <p className="mt-3 text-[0.98rem] text-pretty text-texto-suave">{texto}</p>
              </FadeUp>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Investimento() {
  return (
    <section id="investimento" aria-labelledby="investimento-titulo" className={cn(SECAO, "bg-grafite")}>
      <div className={CONTAINER}>
        <CabecalhoSecao id="investimento-titulo" rotulo={investimento.rotulo} titulo={investimento.titulo} />

        <FadeUp className="mt-14 sm:mt-16">
          <div className="grid overflow-hidden rounded-3xl border border-destaque/30 bg-noite shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)] lg:grid-cols-[1fr_1.15fr]">
            <div className="flex flex-col p-8 sm:p-12">
              <p className="font-serif text-[4.25rem] leading-none font-light tracking-[-0.03em] sm:text-[5.5rem]">
                {valor(investimento.preco)}
              </p>
              <p className="mt-4 text-[1.15rem] text-texto">{investimento.legenda}</p>
              <p className="mt-5 max-w-sm text-[1rem] text-pretty text-texto-suave">{valor(investimento.pagamento)}</p>
              <BotaoWhatsapp tamanho="grande" className="mt-10 w-full sm:w-auto sm:self-start lg:mt-auto" />
            </div>

            <ul className="divide-y divide-linha border-t border-linha p-8 sm:p-12 lg:border-t-0 lg:border-l">
              {investimento.itens.map(({ titulo, valor: condicao, texto }) => (
                <li key={titulo} className="py-6 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="titulo-item text-[1.25rem]">{titulo}</h3>
                    <p className="text-[0.95rem] font-medium text-destaque sm:text-right">{valor(condicao)}</p>
                  </div>
                  <p className="mt-2 text-[0.98rem] text-pretty text-texto-suave">{valor(texto)}</p>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Rodape() {
  return (
    <footer className="border-t border-linha">
      <div
        className={cn(
          CONTAINER,
          "flex flex-col items-center gap-5 py-10 text-center text-[0.95rem] text-texto-suave sm:flex-row sm:justify-between sm:text-left"
        )}
      >
        <Logo />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-texto"
        >
          <MessageCircle className="size-4 text-destaque" strokeWidth={2} aria-hidden />
          WhatsApp {TELEFONE}
        </a>
        <p>
          © {ANO} {empresa.nome}
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Topo />
        {temPortfolio && <Projetos />}
        {temVantagens && <Vantagens />}
        {temPassos && <ComoFunciona />}
        <Investimento />
      </main>
      <Rodape />
    </MotionConfig>
  )
}
