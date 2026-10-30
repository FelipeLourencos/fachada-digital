/**
 * CONTEÚDO DO SITE
 * ================
 * Todo o texto da página de vendas da Fachada Digital fica neste arquivo: contato,
 * títulos, passos, preço, portfólio, perguntas e cores. Os componentes só leem daqui
 * (veja o COMO-USAR.md).
 *
 * Dicas rápidas
 * - Seção com lista vazia ([]) não aparece no site, e o link dela some do menu.
 * - Imagens ficam em public/, escritas a partir da barra.
 *   Ex.: public/portfolio/corte-fino-computador.webp vira "/portfolio/corte-fino-computador.webp".
 * - Para tirar os prints de um site novo para o portfólio: npm run print-portfolio (veja o COMO-USAR.md).
 * - Se faltar algum campo obrigatório, o editor sublinha em vermelho e o
 *   `npm run build` acusa o erro.
 */

// ---------------------------------------------------------------------------
// Tipos (o "formulário" que o conteúdo precisa preencher). Não é preciso mexer aqui.
// ---------------------------------------------------------------------------

/**
 * Ícones disponíveis para os cards do problema e a lista do que está incluso.
 * vitrine, instagram, busca, concorrente, confianca, site, celular, whatsapp, fotos,
 * mapa, dominio, atualizacao
 */
export type Icone =
  | "vitrine"
  | "instagram"
  | "busca"
  | "concorrente"
  | "confianca"
  | "site"
  | "celular"
  | "whatsapp"
  | "fotos"
  | "mapa"
  | "dominio"
  | "atualizacao"

export type Link = {
  rotulo: string
  /** Endereço completo (https://...) ou id de seção (#portfolio). */
  link: string
}

/** Os dois prints de um site: topo no computador (1366x860) e no celular (375x812). */
export type Prints = {
  computador: string
  celular: string
  /** Descrição dos prints para leitores de tela e para o Google. */
  alt: string
}

/** Um site do portfólio. */
export type Projeto = {
  /** Nome do negócio. Ex.: "Corte Fino". */
  nome: string
  /** Ramo, mostrado ao lado do nome. Ex.: "barbearia". */
  ramo: string
  prints: Prints
  /** Endereço do site publicado. "" esconde o link "Ver o site". */
  link: string
  /** true mostra o selo "Projeto de demonstração". Cliente real: false (mostra o selo "Cliente"). */
  demonstracao: boolean
}

export type Card = {
  icone: Icone
  titulo: string
  texto: string
}

export type ItemIncluso = {
  icone: Icone
  texto: string
}

export type Passo = {
  titulo: string
  texto: string
}

export type PerguntaFrequente = {
  pergunta: string
  resposta: string
}

export type Conteudo = {
  /** Dados da empresa */
  empresa: {
    nome: string
    slogan: string
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

  /** Textos dos botões de WhatsApp */
  botoes: {
    /** Todos os botões grandes da página. */
    principal: string
    /** Botão do cabeçalho (mais curto, para caber no celular). */
    cabecalho: string
    /** Texto lido por leitores de tela no botão flutuante (só no celular). */
    flutuante: string
  }

  /** Links do menu ("#id" da seção). Links de seções vazias somem sozinhos. */
  menu: Link[]

  /** Topo (primeira tela) */
  topo: {
    titulo: string
    texto: string
    /** Frase curta abaixo do botão. "" esconde. */
    nota: string
    /** Prints mostrados no notebook e no celular desenhados ao lado do título. */
    mockup: Prints
  }

  /** O problema: três cards. [] esconde. */
  problema: {
    titulo: string
    itens: Card[]
  }

  /** Como funciona: os passos, em ordem. [] esconde. */
  passos: {
    titulo: string
    itens: Passo[]
  }

  /** O que está incluso. [] esconde. */
  incluso: {
    titulo: string
    texto: string
    itens: ItemIncluso[]
  }

  /** Portfólio. Para um cliente real, acrescente um item com demonstracao: false. [] esconde. */
  portfolio: {
    titulo: string
    texto: string
    /** Texto do selo dos projetos de demonstração. */
    seloDemonstracao: string
    /** Texto do selo dos clientes reais. */
    seloCliente: string
    itens: Projeto[]
  }

  /** Card de preço */
  preco: {
    titulo: string
    /** Etiqueta no topo do card. "" esconde. */
    etiqueta: string
    /** Preço antigo, riscado. "" esconde. */
    de: string
    por: string
    /** Como paga, logo abaixo do preço. */
    condicao: string
    /** Bônus em destaque. "" esconde. */
    bonus: string
    /** Linha menor, depois do bônus. "" esconde. */
    observacao: string
  }

  /** Perguntas frequentes. [] esconde. */
  perguntas: {
    titulo: string
    itens: PerguntaFrequente[]
  }

  /** Chamada final, antes do rodapé */
  chamadaFinal: {
    titulo: string
    /** Frase abaixo do título. "" esconde. */
    texto: string
  }

  /** Cores do tema, em hex. */
  cores: {
    /** Fundo do topo, do preço e do rodapé. Azul-marinho quase preto. */
    escuro: string
    /** Botões, toldo e detalhes. Uma cor clara e viva, nunca usada como texto sobre fundo claro. */
    destaque: string
    /** Fundo das seções claras. */
    fundo: string
  }
}

// ---------------------------------------------------------------------------
// Conteúdo da Fachada Digital. Edite daqui para baixo.
// ---------------------------------------------------------------------------

// ===== Dados da empresa =====
const empresa: Conteudo["empresa"] = {
  nome: "Fachada Digital",
  slogan: "A fachada do seu negócio na internet",
  whatsapp: "5511967869308",
  mensagemWhatsapp: "Oi! Vi a página da Fachada Digital e quero uma prévia grátis do meu site.",
}

export const conteudo: Conteudo = {
  empresa,

  // ===== Google =====
  seo: {
    titulo: "Fachada Digital | Sites para pequenos negócios",
    descricao:
      "Site para pequenos negócios e profissionais autônomos: bonito, rápido no celular e com botão direto para o seu WhatsApp. Veja uma prévia grátis antes de pagar.",
  },

  // ===== Botões =====
  botoes: {
    principal: "Quero minha prévia grátis",
    cabecalho: "Prévia grátis",
    flutuante: "Pedir minha prévia grátis pelo WhatsApp",
  },

  // ===== Menu =====
  menu: [
    { rotulo: "Como funciona", link: "#como-funciona" },
    { rotulo: "O que vem", link: "#incluso" },
    { rotulo: "Portfólio", link: "#portfolio" },
    { rotulo: "Preço", link: "#preco" },
    { rotulo: "Dúvidas", link: "#duvidas" },
  ],

  // ===== Topo =====
  topo: {
    titulo: "Seu cliente pesquisa no Google. Ele encontra você?",
    texto:
      "A Fachada Digital cria o site do seu negócio: bonito, rápido no celular e com um botão que leva o cliente direto pro seu WhatsApp. Você vê uma prévia grátis antes de pagar qualquer coisa.",
    nota: "Prévia em até 24h, sem compromisso.",
    mockup: {
      computador: "/portfolio/thais-computador.webp",
      celular: "/portfolio/thais-celular.webp",
      alt: "Site da psicopedagoga Thais Oliveira aberto num notebook e num celular",
    },
  },

  // ===== O problema =====
  problema: {
    titulo: "Indicação é ótimo. Mas quem não te conhece precisa te achar.",
    itens: [
      {
        icone: "instagram",
        titulo: "Depende só da OLX e do Instagram",
        texto: "O anúncio some no meio dos outros, e o perfil só aparece para quem já te segue.",
      },
      {
        icone: "concorrente",
        titulo: "O cliente pesquisa no Google e acha o concorrente",
        texto: "Quem precisa do serviço agora chama quem encontrou primeiro. Sem site, você nem entra na disputa.",
      },
      {
        icone: "confianca",
        titulo: "Sem site, fica difícil passar confiança para quem não te conhece",
        texto: "Antes de chamar, a pessoa quer ver seu trabalho, onde você atende e como falar com você.",
      },
    ],
  },

  // ===== Como funciona =====
  passos: {
    titulo: "Como funciona",
    itens: [
      {
        titulo: "Você me chama no WhatsApp",
        texto: "Me conta do seu negócio: o que você faz, onde atende e como o cliente fala com você.",
      },
      {
        titulo: "Em até 24h, a prévia",
        texto: "Eu te mando uma prévia de como ficaria o seu site, de graça.",
      },
      {
        titulo: "Gostou? Metade para começar",
        texto: "Você paga metade e eu deixo tudo pronto.",
      },
      {
        titulo: "Site no ar, a outra metade",
        texto: "O site vai ao ar no seu endereço .com.br e você paga a outra metade.",
      },
    ],
  },

  // ===== O que está incluso =====
  incluso: {
    titulo: "O que vem no seu site",
    texto: "Tudo o que o cliente precisa para te conhecer e te chamar, numa página só.",
    itens: [
      { icone: "site", texto: "Site profissional de uma página" },
      { icone: "celular", texto: "Versão para celular e computador" },
      { icone: "whatsapp", texto: "Botão direto para o seu WhatsApp" },
      { icone: "fotos", texto: "Seus serviços, fotos e a região que você atende" },
      { icone: "mapa", texto: "Mapa e horários de atendimento" },
      { icone: "dominio", texto: "Endereço .com.br no seu nome" },
      { icone: "atualizacao", texto: "2 meses de atualizações inclusos" },
    ],
  },

  // ===== Portfólio =====
  // Para um cliente real: rode npm run print-portfolio, copie um item abaixo, troque nome, ramo,
  // prints e link, e use demonstracao: false. Clientes reais podem vir antes das demonstrações.
  portfolio: {
    titulo: "Sites que eu fiz",
    texto: "Veja como fica um site pronto, no computador e no celular.",
    seloDemonstracao: "Projeto de demonstração",
    seloCliente: "Cliente",
    itens: [
      {
        nome: "Thais Oliveira",
        ramo: "psicopedagoga",
        prints: {
          computador: "/portfolio/thais-computador.webp",
          celular: "/portfolio/thais-celular.webp",
          alt: "Topo do site da psicopedagoga Thais Oliveira, no computador e no celular",
        },
        link: "",
        demonstracao: false,
      },
      {
        nome: "Corte Fino",
        ramo: "barbearia",
        prints: {
          computador: "/portfolio/corte-fino-computador.webp",
          celular: "/portfolio/corte-fino-celular.webp",
          alt: "Topo do site da barbearia Corte Fino, no computador e no celular",
        },
        // TROCAR pelo endereço do site publicado ("" esconde o link)
        link: "",
        demonstracao: true,
      },
      {
        nome: "Marcos Eletricista",
        ramo: "eletricista",
        prints: {
          computador: "/portfolio/marcos-eletricista-computador.webp",
          celular: "/portfolio/marcos-eletricista-celular.webp",
          alt: "Topo do site do Marcos Eletricista, no computador e no celular",
        },
        // TROCAR pelo endereço do site publicado ("" esconde o link)
        link: "",
        demonstracao: true,
      },
    ],
  },

  // ===== Preço =====
  preco: {
    titulo: "Quanto custa",
    etiqueta: "Oferta de lançamento",
    de: "R$ 800",
    por: "R$ 500",
    condicao: "metade para começar, metade quando o site estiver no ar",
    bonus: "",
    observacao:
      "Manutenção opcional a partir do 3º mês: R$ 40/mês para atualizações e suporte. O site é seu de qualquer jeito.",
  },

  // ===== Perguntas frequentes =====
  perguntas: {
    titulo: "Perguntas frequentes",
    itens: [
      {
        pergunta: "Preciso entender de tecnologia?",
        resposta: "Não. Você me conta do seu negócio e me manda as fotos. Eu faço todo o resto.",
      },
      {
        pergunta: "Quanto tempo demora?",
        resposta:
          "A prévia chega em até 24h. Depois que você me passa as informações e paga a primeira metade, o site vai ao ar em poucos dias.",
      },
      {
        pergunta: "E se eu não gostar da prévia?",
        resposta: "Você não paga nada. A prévia é grátis e sem compromisso.",
      },
      {
        pergunta: "O site fica meu?",
        resposta: "Sim. O endereço .com.br fica registrado no seu nome.",
      },
      {
        pergunta: "E se eu não quiser a manutenção?",
        resposta:
          "O site continua no ar do mesmo jeito. Só as atualizações e o suporte deixam de estar inclusos.",
      },
      {
        pergunta: "Como pago?",
        resposta: "Por Pix: metade no início e metade na entrega, quando o site estiver no ar.",
      },
    ],
  },

  // ===== Chamada final =====
  chamadaFinal: {
    titulo: "Veja como ficaria o site do seu negócio antes de decidir.",
    texto: "Me chame no WhatsApp e receba a prévia em até 24h.",
  },

  // ===== Cores =====
  cores: {
    escuro: "#0a1330",
    destaque: "#d4f23f",
    fundo: "#f2f4f9",
  },
}
