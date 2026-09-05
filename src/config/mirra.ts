export const mirra = {
  brand: {
    name: "MIRRA",
    signature: "Peças & projetos em resina",
    concept: "Ideias ganham forma.",
    shortDescription: "Desenvolvemos peças e projetos personalizados em resina, do conceito ao acabamento.",
    location: "Montes Claros • MG"
  },
  verticals: [
    { num: "01", title: "Memórias", desc: "Flores, objetos, imagens e histórias preservadas em uma nova forma." },
    { num: "02", title: "Casa & Design", desc: "Peças para ambientes, superfícies, objetos e composições com presença." },
    { num: "03", title: "Mobiliário", desc: "Projetos que unem resina, madeira, pigmento, escala e uso." },
    { num: "04", title: "Marcas & Empresas", desc: "Objetos institucionais, troféus e peças personalizadas com identidade." },
    { num: "05", title: "Projetos Especiais", desc: "Ideias que ainda não existem — e precisam ser desenvolvidas." }
  ],
  navigation: [
    { label: "Projetos", href: "/projetos" },
    { label: "Processo", href: "/processo" },
    { label: "Matéria", href: "/materia" },
    { label: "A MIRRA", href: "/a-mirra" },
    { label: "Contato", href: "/contato" }
  ],
  hero: {
    headline: ["Ideias", "ganham", "forma."],
    eyebrow: "MIRRA — Peças & projetos em resina.",
    description: "Desenvolvemos peças e projetos personalizados em resina, do conceito ao acabamento. Algumas ideias começam com uma lembrança. Outras com um desenho, uma referência, um espaço ou uma necessidade.",
    cta: "Conte sua ideia ↗"
  },
  projects: [
    {
      slug: "bouquet-noiva",
      published: false,
      category: "memorias",
      verticalLabel: "Memórias",
      title: "Buquê de Noiva",
      conceptText: "O dia que não podia se perder.",
      description: "Uma peça criada para preservar presença, cor e significado em uma nova forma.",
      image: "/assets/projects/bouquet-noiva/cover.jpg",
      gallery: [
        "/assets/projects/bouquet-noiva/01.jpg",
        "/assets/projects/bouquet-noiva/02.jpg",
        "/assets/projects/bouquet-noiva/03.jpg"
      ],
      technical: {
        finalidade: "Preservação afetiva",
        matéria: "Resina transparente com inclusão floral",
        acabamento: "Polimento manual",
        observação: "Cada flor reage de forma única ao processo."
      }
    },
    {
      slug: "objeto-afetivo",
      published: true,
      category: "memorias",
      verticalLabel: "Memórias",
      title: "Objeto Afetivo",
      conceptText: "Uma pessoa, uma peça, uma história.",
      description: "Um objeto de valor afetivo transformado em presença material.",
      image: "/assets/projects/objeto-afetivo/cover.jpg",
      gallery: [
        "/assets/projects/objeto-afetivo/01.jpg",
        "/assets/projects/objeto-afetivo/02.jpg",
        "/assets/projects/objeto-afetivo/03.jpg",
        "/assets/projects/objeto-afetivo/04.jpg"
      ],
      technical: {
        finalidade: "Memória pessoal",
        matéria: "Resina com inclusão de objeto",
        acabamento: "Transparência e bordas polidas",
        observação: "O projeto depende de avaliação prévia do material incorporado."
      }
    },
    {
      slug: "foto-em-suspensao",
      published: false,
      category: "memorias",
      verticalLabel: "Memórias",
      title: "Foto em Suspensão",
      conceptText: "Um instante, guardado em matéria.",
      description: "Uma composição pensada para proteger e destacar uma imagem com significado.",
      image: "/assets/projects/foto-em-suspensao/cover.jpg",
      gallery: [
        "/assets/projects/foto-em-suspensao/01.jpg"
      ],
      technical: {
        finalidade: "Preservação visual",
        matéria: "Resina transparente",
        acabamento: "Camadas e polimento",
        observação: "A viabilidade depende do tipo e estado da imagem original."
      }
    },
    {
      slug: "tampo-rio",
      published: true,
      category: "mobiliario",
      verticalLabel: "Mobiliário",
      title: "Tampo Rio",
      conceptText: "Madeira e resina em uma só superfície.",
      description: "Uma peça que une matéria natural, profundidade e uso cotidiano.",
      image: "/assets/projects/tampo-rio/cover.jpg",
      gallery: [],
      technical: {
        finalidade: "Mobiliário personalizado",
        matéria: "Madeira e resina pigmentada",
        acabamento: "Nivelamento, lixamento e polimento",
        observação: "Dimensões, madeira e pigmento são definidos por projeto."
      }
    },
    {
      slug: "trofeu-sob-medida",
      published: false,
      category: "empresas",
      verticalLabel: "Marcas & Empresas",
      title: "Troféu sob Medida",
      conceptText: "A identidade de uma marca, em estado sólido.",
      description: "Um objeto institucional desenvolvido para carregar forma, memória e reconhecimento.",
      image: "/assets/projects/trofeu-sob-medida/cover.jpg",
      gallery: [
        "/assets/projects/trofeu-sob-medida/01.jpg",
        "/assets/projects/trofeu-sob-medida/02.jpg"
      ],
      technical: {
        finalidade: "Projeto corporativo",
        matéria: "Resina com pigmentação e acabamento personalizado",
        acabamento: "Polimento e apresentação final",
        observação: "Pode envolver estudo de forma, cor, escala e embalagem."
      }
    },
    {
      slug: "peca-que-nao-existia",
      published: true,
      category: "projetos-especiais",
      verticalLabel: "Projetos Especiais",
      title: "Peça que Não Existia",
      conceptText: "O ponto de partida foi uma conversa.",
      description: "Um projeto autoral desenvolvido a partir de necessidade, referência e experimentação.",
      image: "/assets/projects/peca-que-nao-existia/cover.jpg",
      gallery: [
        "/assets/projects/peca-que-nao-existia/01.jpg",
        "/assets/projects/peca-que-nao-existia/02.jpg",
        "/assets/projects/peca-que-nao-existia/03.jpg"
      ],
      technical: {
        finalidade: "Desenvolvimento sob medida",
        matéria: "Resina e materiais combinados",
        acabamento: "Definido conforme o projeto",
        observação: "Ideias novas podem exigir estudo, teste ou protótipo."
      }
    },
    {
      slug: "bouquet-noiva-geometrico",
      published: false,
      category: "memorias",
      verticalLabel: "Memórias",
      title: "Buquê Geométrico",
      conceptText: "A mesma memória, outra geometria.",
      description: "O buquê preservado em composição geométrica, explorando forma, transparência e repetição.",
      image: "/assets/projects/bouquet-noiva-geometrico/cover.jpg",
      gallery: [
        "/assets/projects/bouquet-noiva-geometrico/01.jpg",
        "/assets/projects/bouquet-noiva-geometrico/02.jpg"
      ],
      technical: {
        finalidade: "Preservação afetiva",
        matéria: "Resina transparente com inclusão floral",
        acabamento: "Faces lapidadas e polidas",
        observação: "A composição geométrica exige estudo prévio de distribuição das flores."
      }
    },
    {
      slug: "colar-elo",
      published: false,
      category: "projetos-especiais",
      verticalLabel: "Projetos Especiais",
      title: "Colar Elo",
      conceptText: "Resina em escala de corpo.",
      description: "Uma peça autoral wearable: forma, peso e acabamento da resina em escala mínima.",
      image: "/assets/projects/colar-elo/cover.jpg",
      gallery: [
        "/assets/projects/colar-elo/01.jpg",
        "/assets/projects/colar-elo/02.jpg"
      ],
      technical: {
        finalidade: "Peça autoral wearable",
        matéria: "Resina com pigmento e polimento espelhado",
        acabamento: "Polimento e ferragens",
        observação: "Escala mínima exige controle rigoroso de bolhas e cura."
      }
    },
    {
      slug: "tampo-mar",
      published: false,
      category: "mobiliario",
      verticalLabel: "Mobiliário",
      title: "Tampo Mar",
      conceptText: "A superfície como horizonte.",
      description: "Madeira e resina em degradê de profundidade: uma superfície de uso cotidiano com presença de mar.",
      image: "/assets/projects/tampo-mar/cover.jpg",
      gallery: [
        "/assets/projects/tampo-mar/01.jpg",
        "/assets/projects/tampo-mar/02.jpg"
      ],
      technical: {
        finalidade: "Mobiliário personalizado",
        matéria: "Madeira e resina pigmentada em degradê",
        acabamento: "Nivelamento, lixamento e polimento",
        observação: "Camadas de pigmento exigem planejamento de cura entre vazamentos."
      }
    },
    {
      slug: "tampo-lago",
      published: false,
      category: "mobiliario",
      verticalLabel: "Mobiliário",
      title: "Tampo Lago",
      conceptText: "Água parada, madeira viva.",
      description: "A resina desenha um lago entre margens de madeira — proporção, profundidade e uso em equilíbrio.",
      image: "/assets/projects/tampo-lago/cover.jpg",
      gallery: [
        "/assets/projects/tampo-lago/01.jpg",
        "/assets/projects/tampo-lago/02.jpg"
      ],
      technical: {
        finalidade: "Mobiliário personalizado",
        matéria: "Madeira e resina transparente pigmentada",
        acabamento: "Nivelamento, lixamento e polimento",
        observação: "Proporção entre madeira e resina definida por projeto."
      }
    },
    {
      slug: "porta-copos",
      published: true,
      category: "casa",
      verticalLabel: "Casa & Design",
      title: "Jogo de Porta-Copos",
      conceptText: "O detalhe que sustenta a mesa.",
      description: "Um conjunto de porta-copos que leva a pesquisa de cor e textura da MIRRA ao detalhe da mesa.",
      image: "/assets/projects/porta-copos/cover.jpg",
      gallery: [
        "/assets/projects/porta-copos/01.jpg",
        "/assets/projects/porta-copos/02.jpg",
        "/assets/projects/porta-copos/03.jpg"
      ],
      technical: {
        finalidade: "Objeto de casa",
        matéria: "Resina com pigmentação e textura",
        acabamento: "Bordas arredondadas e polimento",
        observação: "Pequena série mantém variação natural entre as peças."
      }
    }
  ],
  process: [
    {
      title: "Escuta",
      description: "Antes da forma, existe uma intenção. Entendemos o que será criado, para quem, onde será usado e o que precisa carregar.",
      poster: "/assets/posters/hero-resina.jpg"
    },
    {
      title: "Estudo",
      description: "Avaliamos viabilidade, materiais, proporção, escala, combinação de cores e limites técnicos da resina.",
      poster: "/assets/posters/transparencia.jpg"
    },
    {
      title: "Desenvolvimento",
      description: "Cada projeto encontra seu caminho entre testes, composição, cura, camadas e decisões de acabamento.",
      poster: "/assets/posters/profundidade.jpg"
    },
    {
      title: "Acabamento",
      description: "A peça só termina quando a superfície, as bordas, a transparência e a apresentação sustentam a ideia inicial.",
      poster: "/assets/posters/acabamento.jpg"
    },
    {
      title: "Entrega",
      description: "A entrega faz parte da experiência. A forma final precisa carregar cuidado, clareza e presença.",
      poster: "/assets/posters/inclusao.jpg"
    }
  ],
  matter: [
    {
      title: "Transparência",
      description: "A luz atravessa a resina e revela o que existe dentro dela.",
      note: "A preparação, proporção e cura influenciam diretamente a nitidez e o acabamento.",
      media: "/assets/videos/transparencia.mp4",
      poster: "/assets/posters/transparencia.jpg"
    },
    {
      title: "Profundidade",
      description: "Camadas, pigmentos e inclusões criam volume, sombra e presença.",
      note: "Pigmentos e camadas precisam ser planejados para criar presença sem perder controle.",
      media: "/assets/videos/profundidade.mp4",
      poster: "/assets/posters/profundidade.jpg"
    },
    {
      title: "Inclusão",
      description: "Flores, imagens, madeira, metal e objetos podem ser incorporados quando existe viabilidade técnica e sentido.",
      note: "Nem todo material pode ser incorporado. Avaliamos reação, conservação, espessura e viabilidade.",
      media: "/assets/videos/inclusao.mp4",
      poster: "/assets/posters/inclusao.jpg"
    }
  ],
  about: {
    story: [
      "A MIRRA nasceu preservando histórias.",
      "Com o tempo, descobrimos que a resina podia fazer muito mais.",
      "Guardar uma memória. Transformar um ambiente. Dar forma a uma ideia. Criar um objeto que ainda não existia.",
      "Hoje, exploramos as possibilidades da resina para desenvolver peças e projetos personalizados, conectando técnica, criação e significado.",
      "Algumas ideias começam com uma lembrança. Outras com um desenho, uma referência, um espaço ou uma necessidade.",
      "Para nós, todas começam da mesma forma: com algo que merece ganhar forma."
    ],
    categories: [
      "Memórias",
      "Peças para casa",
      "Mobiliário",
      "Objetos institucionais",
      "Projetos especiais"
    ],
    principles: [
      "Curiosidade",
      "Precisão",
      "Autoria",
      "Cuidado",
      "Experimentação",
      "Qualidade",
      "Personalização",
      "Clareza"
    ]
  },
  contact: {
    location: "Montes Claros • MG",
    instagram: "mirrastudiomoc",
    whatsapp: (typeof import.meta !== "undefined" && import.meta.env?.VITE_WHATSAPP_NUMBER) || "553800000000", // TROCAR PELO NÚMERO REAL (só dígitos: 55 + DDD + número) ou configurar VITE_WHATSAPP_NUMBER
    cta: "Conte sua ideia ↗"
  }
};
