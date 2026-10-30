import { useEffect, useState } from "react"
import {
  ArrowUpRight,
  Camera,
  Gift,
  Globe,
  Images,
  LayoutTemplate,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  RefreshCw,
  Search,
  ShieldCheck,
  Store,
  UserRoundSearch,
  type LucideIcon,
} from "lucide-react"
import { MotionConfig, motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import { EASE_EDITORIAL } from "@/lib/motion"
import { conteudo, type Icone, type Prints } from "@/conteudo"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Todo o texto, contato e imagem vem de src/conteudo.ts
const { empresa, botoes, menu, topo, problema, passos, incluso, portfolio, preco, perguntas, chamadaFinal } =
  conteudo

/** Seções só existem quando o conteudo.ts traz dados para elas. */
const temProblema = problema.itens.length > 0
const temPassos = passos.itens.length > 0
const temIncluso = incluso.itens.length > 0
const temPortfolio = portfolio.itens.length > 0
const temPerguntas = perguntas.itens.length > 0

const WHATSAPP_URL = `https://wa.me/${empresa.whatsapp}${
  empresa.mensagemWhatsapp ? `?text=${encodeURIComponent(empresa.mensagemWhatsapp)}` : ""
}`

/** 5511999999999 vira (11) 99999-9999. */
const TELEFONE = empresa.whatsapp.replace(/^55(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3")

/** Links do menu que dependem de seções opcionais. */
const secaoVisivel: Record<string, boolean> = {
  "#como-funciona": temPassos,
  "#incluso": temIncluso,
  "#portfolio": temPortfolio,
  "#duvidas": temPerguntas,
}

const ICONES: Record<Icone, LucideIcon> = {
  vitrine: Store,
  instagram: Camera,
  busca: Search,
  concorrente: UserRoundSearch,
  confianca: ShieldCheck,
  site: LayoutTemplate,
  celular: MonitorSmartphone,
  whatsapp: MessageCircle,
  fotos: Images,
  mapa: MapPin,
  dominio: Globe,
  atualizacao: RefreshCw,
}

/** Medidas comuns: mesma largura e mesmo respiro em todas as seções. */
const CONTAINER = "mx-auto w-full max-w-6xl px-4 sm:px-8"
const SECAO = "py-20 sm:py-28"
const TITULO_SECAO = "titulo-secao text-[2rem] sm:text-[2.75rem]"

const externo = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {}

/** Une a última palavra à anterior, para nenhuma linha terminar com uma palavra sozinha. */
const semPalavraSolta = (texto: string) => texto.replace(/ (\S+)$/, " $1")

/** Mantém "R$" e o valor na mesma linha. */
const valor = (texto: string) => texto.replaceAll("R$ ", "R$ ")

/** Botão de WhatsApp. "destaque" (verde-limão) nas partes escuras, "escuro" (azul-marinho) nas claras. */
function BotaoWhatsapp({
  variante = "destaque",
  compacto = false,
  texto = botoes.principal,
  className,
}: {
  variante?: "destaque" | "escuro"
  compacto?: boolean
  texto?: string
  className?: string
}) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-lg font-bold whitespace-nowrap transition-[background-color,translate] duration-200 active:translate-y-px",
        compacto ? "h-11 px-5 text-[0.95rem]" : "h-15 px-8 text-[1.1rem] sm:h-16 sm:text-[1.15rem]",
        variante === "destaque"
          ? "bg-destaque text-escuro hover:bg-destaque-claro"
          : "bg-escuro text-white hover:bg-escuro-claro",
        className
      )}
    >
      <MessageCircle className="size-[1.2em] shrink-0" strokeWidth={2.25} aria-hidden /> {texto}
    </a>
  )
}

/** Vitrine com toldo listrado: a marca da Fachada Digital (o mesmo desenho do public/favicon.svg). */
function Marca({ className }: { className?: string }) {
  return (
    <svg viewBox="4 6 32 28" className={cn("size-9 shrink-0", className)} aria-hidden>
      <path d="M6 8h7v7a3.5 3.5 0 0 1-7 0z" fill="var(--destaque)" />
      <path d="M13 8h7v7a3.5 3.5 0 0 1-7 0z" fill="#f7f9ff" />
      <path d="M20 8h7v7a3.5 3.5 0 0 1-7 0z" fill="var(--destaque)" />
      <path d="M27 8h7v7a3.5 3.5 0 0 1-7 0z" fill="#f7f9ff" />
      <rect x="8.5" y="21.5" width="23" height="11" rx="1" fill="none" stroke="#f7f9ff" strokeWidth="2" />
      <rect x="12" y="25" width="7" height="4.5" rx="0.5" fill="#f7f9ff" />
      <rect x="22.5" y="25" width="5.5" height="7.5" fill="var(--destaque)" />
    </svg>
  )
}

function Logo() {
  return (
    <a href="#topo" className="flex items-center gap-2.5">
      <Marca />
      <span className="titulo-display text-[1.15rem] whitespace-nowrap sm:text-[1.3rem]">{empresa.nome}</span>
    </a>
  )
}

function Header() {
  const links = menu.filter(({ link }) => secaoVisivel[link] ?? true)

  return (
    <header className="secao-escura fixed inset-x-0 top-0 z-50 border-b border-border">
      <div className={cn(CONTAINER, "flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]")}>
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {links.map(({ rotulo, link }) => (
            <a key={link} href={link} className="text-[0.97rem] text-muted-foreground transition-colors hover:text-foreground">
              {rotulo}
            </a>
          ))}
        </nav>

        <BotaoWhatsapp compacto texto={botoes.cabecalho} className="hidden sm:inline-flex" />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={botoes.principal}
          className="flex size-11 items-center justify-center rounded-lg bg-destaque text-escuro sm:hidden"
        >
          <MessageCircle className="size-5" strokeWidth={2.25} aria-hidden />
        </a>
      </div>
    </header>
  )
}

/** Entrada do topo, em sequência. É a única animação automática da página, junto com o toldo. */
const entrada = (ordem: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay: 0.25 + ordem * 0.1, ease: EASE_EDITORIAL },
})

/** Toldo listrado da fachada. No topo, ele "desenrola" de cima para baixo no carregamento. */
function Toldo({ animado = false }: { animado?: boolean }) {
  const menosMovimento = useReducedMotion()
  return (
    <motion.div
      aria-hidden
      className="toldo h-9 origin-top sm:h-12"
      initial={animado && !menosMovimento ? { scaleY: 0 } : false}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
    />
  )
}

/** Notebook e celular desenhados em CSS, com os prints de um site dentro. */
function Mockup({ prints, animado = false, className }: { prints: Prints; animado?: boolean; className?: string }) {
  return (
    <figure className={cn("relative pb-[4%]", className)}>
      <motion.div {...(animado ? entrada(3) : {})} className="w-[88%]">
        <div className="mx-[5%] rounded-t-[0.9rem] bg-[#1b2030] p-[2.2%] pb-[2.6%] shadow-[0_30px_60px_-20px_oklch(0_0_0/0.55)] ring-1 ring-white/10">
          <img
            src={prints.computador}
            alt={prints.alt}
            className="aspect-[1366/860] w-full rounded-[0.2rem] bg-white object-cover object-top"
            fetchPriority={animado ? "high" : undefined}
            loading={animado ? undefined : "lazy"}
          />
        </div>
        {/* Base do notebook, com o recorte para abrir a tampa */}
        <div className="relative h-[0.6rem] rounded-b-[0.7rem] bg-gradient-to-b from-[#c9cfdc] to-[#7d8597] sm:h-3">
          <span className="absolute top-0 left-1/2 h-1/2 w-[16%] -translate-x-1/2 rounded-b-md bg-[#8d95a6]" />
        </div>
      </motion.div>

      <motion.div
        {...(animado ? entrada(4.5) : {})}
        className="absolute right-0 bottom-0 w-[25%] rounded-[16%/7.5%] bg-[#10131c] p-[1.6%] shadow-[0_24px_40px_-14px_oklch(0_0_0/0.6)] ring-1 ring-white/15"
      >
        <img
          src={prints.celular}
          alt=""
          className="aspect-[375/812] w-full rounded-[13%/6%] bg-white object-cover object-top"
          loading={animado ? undefined : "lazy"}
        />
      </motion.div>
    </figure>
  )
}

function Topo() {
  const [frase1, frase2] = topo.titulo.split(/(?<=[.?!]) /)

  return (
    <section id="topo" className="secao-escura relative overflow-hidden pt-16 lg:pt-[4.5rem]">
      {/* Luz suave atrás do mockup, como a vitrine acesa à noite */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-[-10%] size-[42rem] rounded-full bg-[radial-gradient(closest-side,oklch(from_var(--destaque)_l_c_h/0.16),transparent)] max-lg:top-auto max-lg:bottom-[-12rem] max-lg:size-[30rem]"
      />
      <Toldo animado />

      <div className={cn(CONTAINER, "relative grid items-center gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-[1.25fr_1fr] lg:gap-12 lg:pt-12 lg:pb-20")}>
        <div className="min-w-0">
          <motion.h1 {...entrada(0)} className="titulo-display text-[2.55rem] sm:text-[3.7rem] lg:text-[3.3rem] lg:[text-wrap:wrap] xl:text-[3.35rem] xl:[font-stretch:115%]">
            <span className="block">{frase1}</span>
            {/* Sem semPalavraSolta: "encontra você?" junto não cabe na largura do celular */}
            {frase2 && <span className="mt-[0.12em] block text-destaque">{frase2}</span>}
          </motion.h1>
          <motion.p
            {...entrada(1)}
            className="mt-6 max-w-[50ch] text-[1.1rem] leading-relaxed text-pretty text-muted-foreground sm:text-[1.22rem]"
          >
            {topo.texto}
          </motion.p>
          <motion.div {...entrada(2)} className="mt-8 flex flex-col gap-3.5 sm:mt-10 sm:items-start">
            <BotaoWhatsapp className="w-full sm:w-auto" />
            {topo.nota && <p className="text-[0.97rem] text-muted-foreground max-sm:text-center">{topo.nota}</p>}
          </motion.div>
        </div>

        <Mockup prints={topo.mockup} animado className="mx-auto w-full max-w-[38rem] lg:max-w-none" />
      </div>
    </section>
  )
}

function Problema() {
  if (!temProblema) return null

  return (
    <section className={cn("bg-fundo", SECAO)}>
      <div className={CONTAINER}>
        <h2 className={cn(TITULO_SECAO, "max-w-[22ch]")}>{problema.titulo}</h2>

        <ul className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-3 md:gap-5">
          {problema.itens.map(({ icone, titulo, texto }) => {
            const Icon = ICONES[icone]
            return (
              <li key={titulo} className="rounded-2xl border border-border bg-white p-6 sm:p-8">
                <span className="flex size-12 items-center justify-center rounded-xl bg-escuro">
                  <Icon className="size-6 text-destaque" strokeWidth={2} aria-hidden />
                </span>
                <h3 className="titulo-item mt-5 text-[1.25rem]">{titulo}</h3>
                <p className="mt-2.5 leading-relaxed text-tinta-suave">{texto}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function ComoFunciona() {
  if (!temPassos) return null

  return (
    <section id="como-funciona" className={SECAO}>
      <div className={CONTAINER}>
        <h2 className={TITULO_SECAO}>{passos.titulo}</h2>

        <ol className="mt-10 grid gap-9 sm:mt-14 lg:grid-cols-4 lg:gap-8">
          {passos.itens.map(({ titulo, texto }, i) => (
            <li key={titulo} className="relative flex gap-5 lg:block">
              {/* Linha ligando um passo ao próximo: vertical no celular, horizontal no computador */}
              {i < passos.itens.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-14 bottom-[-2.25rem] left-7 w-0.5 bg-border lg:top-7 lg:right-[-2rem] lg:bottom-auto lg:left-14 lg:h-0.5 lg:w-auto"
                />
              )}
              <span className="titulo-display relative flex size-14 shrink-0 items-center justify-center rounded-full bg-escuro text-[1.5rem] text-destaque">
                {i + 1}
              </span>
              <div className="pt-1.5 lg:pt-0">
                <h3 className="titulo-item text-[1.25rem] lg:mt-6">{titulo}</h3>
                <p className="mt-2 max-w-[40ch] leading-relaxed text-tinta-suave">{texto}</p>
              </div>
            </li>
          ))}
        </ol>

        <BotaoWhatsapp variante="escuro" className="mt-12 w-full sm:mt-14 sm:w-auto" />
      </div>
    </section>
  )
}

function Incluso() {
  if (!temIncluso) return null

  return (
    <section id="incluso" className={cn("bg-fundo", SECAO)}>
      <div className={cn(CONTAINER, "grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16")}>
        <div>
          <h2 className={TITULO_SECAO}>{incluso.titulo}</h2>
          {incluso.texto && <p className="mt-4 max-w-[38ch] text-lg text-tinta-suave">{incluso.texto}</p>}
        </div>

        <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
          {incluso.itens.map(({ icone, texto }) => {
            const Icon = ICONES[icone]
            return (
              <li key={texto} className="flex items-center gap-4 border-b border-border py-4 text-[1.08rem] font-semibold">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-destaque">
                  <Icon className="size-5 text-escuro" strokeWidth={2.25} aria-hidden />
                </span>
                {texto}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function Portfolio() {
  if (!temPortfolio) return null

  return (
    <section id="portfolio" className={SECAO}>
      <div className={CONTAINER}>
        <h2 className={TITULO_SECAO}>{portfolio.titulo}</h2>
        {portfolio.texto && <p className="mt-4 max-w-[52ch] text-lg text-tinta-suave">{portfolio.texto}</p>}

        <ul className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-2 lg:gap-8">
          {portfolio.itens.map((projeto) => (
            <li key={projeto.nome} className="flex flex-col overflow-hidden rounded-2xl border border-border">
              <div className="secao-escura relative px-[7%] pt-15">
                <span
                  className={cn(
                    "absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-[0.82rem] font-bold",
                    projeto.demonstracao ? "bg-white/12 text-white" : "bg-destaque text-escuro",
                  )}
                >
                  {projeto.demonstracao ? portfolio.seloDemonstracao : portfolio.seloCliente}
                </span>
                <Mockup prints={projeto.prints} />
              </div>
              <div className="flex flex-1 flex-wrap items-center justify-between gap-x-6 gap-y-3 p-5 sm:p-6">
                <p className="leading-snug">
                  <span className="titulo-item block text-[1.2rem]">{projeto.nome}</span>
                  <span className="text-tinta-suave">{projeto.ramo}</span>
                </p>
                {projeto.link && (
                  <a
                    href={projeto.link}
                    {...externo(projeto.link)}
                    className="inline-flex items-center gap-1.5 font-semibold underline decoration-current/35 underline-offset-4 transition-colors hover:decoration-current"
                  >
                    Ver o site <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Preco() {
  return (
    <section id="preco" className={cn("bg-fundo", SECAO)}>
      <div className={CONTAINER}>
        <h2 className={cn(TITULO_SECAO, "text-center")}>{preco.titulo}</h2>

        <div className="secao-escura relative mx-auto mt-14 max-w-[34rem] rounded-3xl px-6 pt-12 pb-8 shadow-[0_30px_60px_-30px_oklch(from_var(--escuro)_l_c_h/0.7)] sm:px-10 sm:pb-10">
          {preco.etiqueta && (
            <p className="absolute -top-4 left-6 rounded-full bg-destaque px-4 py-1.5 text-[0.95rem] font-bold text-escuro sm:left-10">
              {preco.etiqueta}
            </p>
          )}

          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {preco.de && (
              <span className="text-[1.2rem] text-muted-foreground">
                De <s className="decoration-2">{valor(preco.de)}</s>
              </span>
            )}
            <span className="text-[1.2rem]">por</span>
            <span className="titulo-display text-[3.6rem] text-destaque sm:text-[4.4rem]">{valor(preco.por)}</span>
          </p>
          <p className="mt-3 text-[1.08rem] text-muted-foreground">{preco.condicao}</p>

          {preco.bonus && (
            <p className="mt-7 flex gap-3.5 rounded-xl border border-destaque/50 bg-destaque/10 p-4 text-[1.05rem] leading-snug font-semibold sm:p-5">
              <Gift className="mt-0.5 size-6 shrink-0 text-destaque" aria-hidden />
              {preco.bonus}
            </p>
          )}

          <BotaoWhatsapp className="mt-8 w-full" />

          {preco.observacao && (
            <p className="mt-6 text-[0.92rem] leading-relaxed text-pretty text-muted-foreground">{valor(preco.observacao)}</p>
          )}
        </div>
      </div>
    </section>
  )
}

function Duvidas() {
  if (!temPerguntas) return null

  return (
    <section id="duvidas" className={SECAO}>
      <div className={cn(CONTAINER, "grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16")}>
        <h2 className={TITULO_SECAO}>{perguntas.titulo}</h2>
        <Accordion defaultValue={["faq-0"]} className="border-t border-tinta/15">
          {perguntas.itens.map((item, i) => (
            <AccordionItem key={item.pergunta} value={`faq-${i}`} className="border-b border-tinta/15">
              <AccordionTrigger className="rounded-none py-5 text-left text-[1.1rem] font-semibold hover:no-underline sm:text-[1.15rem]">
                {item.pergunta}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-[1.05rem] leading-relaxed text-tinta-suave">
                <p className="max-w-[60ch]">{item.resposta}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

/** Botão flutuante do WhatsApp, só no celular e no tablet. */
function WhatsappFlutuante() {
  // Aparece depois do topo, onde o botão de WhatsApp já está à vista
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={botoes.flutuante}
      className={cn(
        "fixed right-4 bottom-4 z-50 flex size-15 items-center justify-center rounded-full border-2 border-escuro bg-destaque text-escuro shadow-[0_10px_28px_-8px_oklch(from_var(--escuro)_l_c_h/0.6)] transition-[opacity,scale] duration-300 sm:right-6 sm:bottom-6 lg:hidden",
        !visivel && "pointer-events-none scale-90 opacity-0"
      )}
      tabIndex={visivel ? undefined : -1}
    >
      <MessageCircle className="size-7" strokeWidth={2.25} aria-hidden />
    </a>
  )
}

function Rodape() {
  return (
    <footer className="secao-escura">
      <Toldo />
      <div className={cn(CONTAINER, "pt-16 pb-20 sm:pt-20 sm:pb-24")}>
        <h2 className="titulo-display max-w-[20ch] text-[2.2rem] sm:text-[3.3rem]">
          {semPalavraSolta(chamadaFinal.titulo)}
        </h2>
        {chamadaFinal.texto && <p className="mt-5 max-w-[46ch] text-lg text-muted-foreground">{chamadaFinal.texto}</p>}
        <BotaoWhatsapp className="mt-9 w-full sm:w-auto" />
      </div>

      <div className={CONTAINER}>
        <div className="flex flex-col gap-4 border-t border-border py-8 pr-20 text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:pr-0">
          <p className="flex items-center gap-2.5">
            <Marca className="size-7" />
            <span>
              <span className="font-semibold text-foreground">{empresa.nome}</span> · {empresa.slogan}
            </span>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-semibold tabular-nums transition-colors hover:text-foreground"
          >
            <MessageCircle className="size-4" aria-hidden /> WhatsApp {TELEFONE}
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    // reducedMotion="user": quem pediu menos movimento no sistema não vê a entrada animada
    <MotionConfig reducedMotion="user">
      <div className="min-h-svh overflow-x-clip">
        <Header />
        <main>
          <Topo />
          <Problema />
          <ComoFunciona />
          <Incluso />
          <Portfolio />
          <Preco />
          <Duvidas />
        </main>
        <Rodape />
        <WhatsappFlutuante />
      </div>
    </MotionConfig>
  )
}
