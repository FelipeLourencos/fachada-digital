/**
 * CONTEÚDO DO SITE
 * ================
 * Todo o texto da página de vendas da Fachada Digital fica neste arquivo: contato,
 * títulos, projetos, vantagens, passos, investimento e cores. Os componentes só leem daqui
 * (veja o COMO-USAR.md).
 *
 * Dicas rápidas
 * - Seção com lista vazia ([]) não aparece no site, e o link dela some do menu.
 * - Imagens ficam em public/, escritas a partir da barra.
 *   Ex.: public/portfolio/thais-mockup.webp vira "/portfolio/thais-mockup.webp".
 * - Para pôr um site novo na vitrine: npm run print-portfolio e depois npm run mockup
 *   (veja o COMO-USAR.md).
 * - Se faltar algum campo obrigatório, o editor sublinha em vermelho e o
 *   `npm run build` acusa o erro.
 */

// ---------------------------------------------------------------------------
// Tipos (o "formulário" que o conteúdo precisa preencher). Não é preciso mexer aqui.
// ---------------------------------------------------------------------------

/**
 * Ícones disponíveis para os cards de vantagens.
 * busca, whatsapp, marca, celular, dominio, confianca
 */
export type Icone = "busca" | "whatsapp" | "marca" | "celular" | "dominio" | "confianca"

export type Link = {
  rotulo: string
  /** Id da seção. Ex.: "#projetos". */
  link: string
}

/** Um site da vitrine. O card não leva para o site: é só um exemplo. */
export type Projeto = {
  /** Nome do negócio. Ex.: "Corte Fino". */
  nome: string
  /** Ramo, mostrado acima do nome. Ex.: "Barbearia". */
  nicho: string
  /** Notebook + celular gerado pelo npm run mockup. Ex.: "/portfolio/corte-fino-mockup.webp". */
  mockup: string
  /** Descrição do mockup para leitores de tela e para o Google. */
  alt: string
  /** O que o site tem. Use 3 itens em todos os projetos, para os cards ficarem do mesmo tamanho. */
  destaques: string[]
}

export type Card = {
  icone: Icone
  titulo: string
  texto: string
}

export type Passo = {
  titulo: string
  texto: string
}

export type ItemInvestimento = {
  titulo: string
  /** Valor ou condição, ao lado do título. Ex.: "R$ 40/mês". */
  valor: string
  texto: string
}

/** Rótulo pequeno acima do título + título da seção. */
type Cabecalho = {
  rotulo: string
  titulo: string
}

export type Conteudo = {
  /** Dados da empresa */
  empresa: {
    nome: string
    /** WhatsApp só com números: 55 + DDD + número. */
    whatsapp: string
    /** Mensagem que já vem escrita quando o cliente abre o WhatsApp. */
    mensagemWhatsapp: string
  }

  /** Título da aba e descrição para o Google. */
  seo: {
    titulo: string
    descricao: string
  }

  /** Texto de todos os botões de WhatsApp. */
  botao: string

  /** Links do menu ("#id" da seção). Links de seções vazias somem sozinhos. */
  menu: Link[]

  /** Topo (primeira tela) */
  topo: {
    titulo: string
    subtitulo: string
  }

  /** Vitrine de projetos. Para um site novo, acrescente um item. [] esconde. */
  portfolio: Cabecalho & {
    itens: Projeto[]
    /** Frase abaixo dos projetos. "" esconde. */
    rodape: string
  }

  /** Por que ter um site: cards com ícone. [] esconde. */
  vantagens: Cabecalho & {
    itens: Card[]
  }

  /** Como funciona: os passos, em ordem. [] esconde. */
  passos: Cabecalho & {
    itens: Passo[]
  }

  /** Investimento (seção final, em destaque) */
  investimento: Cabecalho & {
    preco: string
    /** Logo abaixo do preço. */
    legenda: string
    /** Como paga. */
    pagamento: string
    itens: ItemInvestimento[]
  }

  /** Cores do tema, em hex. */
  cores: {
    /** Fundo da página. */
    noite: string
    /** Fundo das seções alternadas e dos cards (e do fundo dos mockups). */
    grafite: string
    /** Botões e detalhes. Use só em pontos pequenos. */
    destaque: string
  }
}

// ---------------------------------------------------------------------------
// Conteúdo da Fachada Digital. Edite daqui para baixo.
// ---------------------------------------------------------------------------

export const conteudo: Conteudo = {
  // ===== Dados da empresa =====
  empresa: {
    nome: "Fachada Digital",
    whatsapp: "5511967869308",
    mensagemWhatsapp: "Oi! Vi a página da Fachada Digital e quero fazer o site do meu negócio.",
  },

  // ===== Google =====
  seo: {
    titulo: "Fachada Digital | Sites sob medida para pequenos negócios",
    descricao:
      "Sites sob medida para profissionais e pequenos negócios: feitos com a sua marca, rápidos no celular, com botão direto para o seu WhatsApp e domínio no seu nome.",
  },

  // ===== Botões =====
  botao: "Quero meu site",

  // ===== Menu =====
  menu: [
    { rotulo: "Projetos", link: "#projetos" },
    { rotulo: "Vantagens", link: "#vantagens" },
    { rotulo: "Como funciona", link: "#como-funciona" },
    { rotulo: "Investimento", link: "#investimento" },
  ],

  // ===== Topo =====
  topo: {
    titulo: "A fachada do seu negócio na internet",
    subtitulo: "Sites sob medida para profissionais e pequenos negócios.",
  },

  // ===== Projetos =====
  // Para um site novo: rode npm run print-portfolio e npm run mockup, copie um item abaixo e troque
  // nome, nicho, mockup, alt e destaques. Os itens aparecem na ordem da lista.
  portfolio: {
    rotulo: "Alguns projetos",
    titulo: "Veja como pode ficar o seu",
    itens: [
      {
        nome: "Thais Oliveira",
        nicho: "Psicopedagoga",
        mockup: "/portfolio/thais-mockup.webp",
        alt: "Site da psicopedagoga Thais Oliveira aberto num notebook e num celular",
        destaques: [
          "Apresentação da profissional e de como funciona o atendimento",
          "Mapa, horários e avaliações do Google",
          "Botão para agendar uma conversa pelo WhatsApp",
        ],
      },
      {
        nome: "Corte Fino",
        nicho: "Barbearia",
        mockup: "/portfolio/corte-fino-mockup.webp",
        alt: "Site da barbearia Corte Fino aberto num notebook e num celular",
        destaques: [
          "Serviços com o preço e a duração de cada um",
          "Vídeo no topo e visual com a cara da barbearia",
          "Horários, endereço e agendamento pelo WhatsApp",
        ],
      },
    ],
    rodape:
      "Cada site é feito do zero com a identidade do seu negócio: psicopedagogas, barbearias, clínicas, prestadores de serviço e mais.",
  },

  // ===== Por que ter um site personalizado =====
  vantagens: {
    rotulo: "Vantagens",
    titulo: "Por que ter um site personalizado",
    itens: [
      {
        icone: "busca",
        titulo: "Aparece quando o cliente pesquisa no Google",
        texto: "O site é preparado para o Google, com o seu nome, os seus serviços e a região onde você atende.",
      },
      {
        icone: "whatsapp",
        titulo: "Botão direto para o seu WhatsApp",
        texto: "Com um toque, o cliente abre a conversa com você, com a mensagem já escrita.",
      },
      {
        icone: "marca",
        titulo: "Feito com a sua marca",
        texto: "Cores, fotos e textos pensados para o seu negócio, e não um modelo genérico.",
      },
      {
        icone: "celular",
        titulo: "Rápido e bonito no celular",
        texto: "Pensado primeiro para a tela do celular, onde o seu cliente vai abrir o site.",
      },
      {
        icone: "dominio",
        titulo: "Domínio no seu nome",
        texto: "O endereço .com.br fica registrado no seu nome. O site é seu.",
      },
      {
        icone: "confianca",
        titulo: "Mais confiança que só um perfil no Instagram",
        texto: "Reúne num lugar só o que o cliente quer saber antes de chamar: serviços, endereço e contato.",
      },
    ],
  },

  // ===== Como funciona =====
  passos: {
    rotulo: "Passo a passo",
    titulo: "Como funciona",
    itens: [
      {
        titulo: "Conversa",
        texto: "Você me chama no WhatsApp e conta sobre o seu negócio: o que faz, para quem e onde atende.",
      },
      {
        titulo: "Prévia com o seu conteúdo",
        texto: "Eu monto uma prévia do site com os seus textos, fotos e cores, para você ver como vai ficar.",
      },
      {
        titulo: "Ajustes",
        texto: "Você aponta o que quer mudar e eu faço os ajustes antes de publicar.",
      },
      {
        titulo: "Site no ar",
        texto: "O site é publicado no seu domínio, pronto para você mandar aos seus clientes.",
      },
    ],
  },

  // ===== Investimento =====
  investimento: {
    rotulo: "Investimento",
    titulo: "Quanto custa ter o seu site",
    preco: "R$ 500",
    legenda: "pela criação do site",
    pagamento: "R$ 250 para começar e R$ 250 quando o site estiver no ar. Pix ou cartão.",
    itens: [
      {
        titulo: "Domínio próprio",
        valor: "cerca de R$ 40 por ano",
        texto: "O endereço .com.br fica no seu nome, pago direto no Registro.br.",
      },
      {
        titulo: "Ajustes",
        valor: "2 meses inclusos",
        texto: "Nos dois primeiros meses, os ajustes já estão incluídos no valor.",
      },
      {
        titulo: "Manutenção opcional",
        valor: "R$ 40/mês a partir do 3º mês",
        texto: "Hospedagem, suporte e pequenas alterações. É opcional: o site continua sendo seu.",
      },
    ],
  },

  // ===== Cores =====
  cores: {
    noite: "#0B1220",
    grafite: "#111A2E",
    destaque: "#E0A84F",
  },
}
