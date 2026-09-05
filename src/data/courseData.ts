import { Module, CategoryFee, Announcement, StudentDoubt } from '../types';

export const COURSE_TITLE = "DESAFIO 10K — Vendas Sem Estoque";
export const INSTRUCTOR_NAME = "Diego Mendes";
export const INSTRUCTOR_TITLE = "Criador do Desafio 10K & Especialista em Vendas Sem Estoque";

export const CATEGORY_FEES: CategoryFee[] = [
  { id: 'eletronicos', name: 'Eletrônicos, Áudio e Vídeo', classicRate: 11.5, premiumRate: 16.5 },
  { id: 'informatica', name: 'Informática e Acessórios', classicRate: 12.0, premiumRate: 17.0 },
  { id: 'casa_decoracao', name: 'Casa, Móveis e Decoração', classicRate: 13.0, premiumRate: 18.0 },
  { id: 'moda', name: 'Roupas, Calçados e Acessórios', classicRate: 14.0, premiumRate: 19.0 },
  { id: 'beleza_cuidado', name: 'Beleza e Cuidado Pessoal', classicRate: 13.0, premiumRate: 18.0 },
  { id: 'ferramentas', name: 'Ferramentas e Construção', classicRate: 12.5, premiumRate: 17.5 },
  { id: 'automotivo', name: 'Acessórios para Veículos', classicRate: 13.5, premiumRate: 18.5 },
  { id: 'brinquedos', name: 'Brinquedos e Hobbies', classicRate: 13.0, premiumRate: 18.0 },
  { id: 'outros', name: 'Outras Categorias Gerais', classicRate: 13.0, premiumRate: 18.0 },
];

export const COURSE_MODULES: Module[] = [
  {
    id: 'mod-1',
    number: 1,
    title: 'COMECE AQUI!',
    shortTitle: 'COMECE AQUI!',
    description: 'Instruções essenciais de acesso, configuração da sua esteira de vendas e primeiros passos no Desafio 10K.',
    badge: 'Módulo 01',
    iconType: 'rocket',
    lessons: [
      {
        id: 'les-1-1',
        moduleId: 'mod-1',
        title: 'Boas-vindas ao Desafio 10K & Mapa do Sucesso',
        duration: '14:20',
        durationMinutes: 14,
        description: 'Conheça o acompanhamento passo a passo do Desafio 10K, como funcionam os plantões de dúvidas, o grupo VIP de alunos e como traçar sua meta rumo aos primeiros R$ 10.000 em vendas no Mercado Livre.',
        videoThumb: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
        takeaways: [
          'Visão panorâmica do mercado de vendas sem estoque no Brasil',
          'Cronograma de estudos e execução prática passo a passo',
          'Como acessar as ferramentas exclusivas e suporte aos alunos',
        ],
        resources: [
          {
            id: 'res-1-1-1',
            title: 'Mapa Mental: A Jornada dos 10k no Mercado Livre.pdf',
            type: 'pdf',
            size: '2.4 MB',
            description: 'Guia visual com os marcos para escalar suas vendas sem precisar de capital de giro pesado.',
          },
          {
            id: 'res-1-1-2',
            title: 'Planner de Execução Rápida 10K.pdf',
            type: 'pdf',
            size: '1.1 MB',
            description: 'Cronograma diário do desafio para colocar a loja para rodar e atingir R$ 10k.',
          },
        ],
        checklist: [
          { id: 'chk-1-1-1', text: 'Entrar na comunidade VIP de alunos no Telegram', done: false },
          { id: 'chk-1-1-2', text: 'Baixar o Planner de Estudos e definir suas metas', done: false },
          { id: 'chk-1-1-3', text: 'Preencher o formulário de nivelamento inicial', done: false },
        ],
        instructor: {
          name: INSTRUCTOR_NAME,
          role: INSTRUCTOR_TITLE,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      },
      {
        id: 'les-1-2',
        moduleId: 'mod-1',
        title: 'Como Navegar na Plataforma e Usar as Ferramentas',
        duration: '11:45',
        durationMinutes: 11,
        description: 'Tour guiado pela área do aluno: como marcar aulas concluídas, tomar notas com timestamp sincronizado, usar o simulador de taxas e o gerador de títulos com SEO.',
        videoThumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        takeaways: [
          'Atalhos de produtividade na área de membros',
          'Como solicitar ajuda no campo de dúvidas e respostas',
          'Critérios para desbloquear o Certificado Oficial de Conclusão',
        ],
        resources: [
          {
            id: 'res-1-2-1',
            title: 'Guia de Acesso Rápido às Ferramentas.pdf',
            type: 'pdf',
            size: '1.2 MB',
            description: 'Manual de bolso com links diretos e tutoriais.',
          },
        ],
        checklist: [
          { id: 'chk-1-2-1', text: 'Fazer o primeiro teste no Simulador de Margem', done: false },
          { id: 'chk-1-2-2', text: 'Adicionar uma anotação de teste na aula', done: false },
        ],
        instructor: {
          name: INSTRUCTOR_NAME,
          role: INSTRUCTOR_TITLE,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      },
    ],
  },
  {
    id: 'mod-2',
    number: 2,
    title: 'SEJA BEM-VINDO',
    shortTitle: 'SEJA BEM-VINDO',
    description: 'Mentalidade de vendedor profissional, estrutura jurídica e preparação do seu negócio.',
    badge: 'Módulo 02',
    iconType: 'door',
    lessons: [
      {
        id: 'les-2-1',
        moduleId: 'mod-2',
        title: 'Mindset de E-commerce & Como Pensam os Top Sellers',
        duration: '18:30',
        durationMinutes: 18,
        description: 'A psicologia dos vendedores que faturam múltiplos 6 dígitos: foco em processo, resiliência na esteira de envios e atendimento impecável aos compradores.',
        videoThumb: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
        takeaways: [
          'Diferença entre amador e empresário no mercado digital',
          'Gestão de tempo: como operar o negócio dedicando 2 horas por dia',
          'Como reinvestir os lucros iniciais para acelerar o crescimento',
        ],
        resources: [
          {
            id: 'res-2-1-1',
            title: 'Planilha de Gestão de Tempo e Produtividade.sheet',
            type: 'sheet',
            size: '950 KB',
            description: 'Organize suas tarefas de mineração, atendimento e despacho.',
          },
        ],
        checklist: [
          { id: 'chk-2-1-1', text: 'Definir o bloco de horários diários para seu negócio', done: false },
        ],
        instructor: {
          name: INSTRUCTOR_NAME,
          role: INSTRUCTOR_TITLE,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      },
      {
        id: 'les-2-2',
        moduleId: 'mod-2',
        title: 'Estruturação Fiscal: CPF vs CNPJ MEI e Emissão de Notas',
        duration: '22:15',
        durationMinutes: 22,
        description: 'Tudo o que você precisa saber sobre tributação, limites de faturamento no CPF, quando abrir MEI e os benefícios fiscais para operar sem surpresas.',
        videoThumb: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
        takeaways: [
          'Limites seguros para início de vendas',
          'CNAEs corretos para comércio eletrônico sem estoque',
          'Como vincular contas bancárias empresariais',
        ],
        resources: [
          {
            id: 'res-2-2-1',
            title: 'Guia Completo de CNAEs e MEI.pdf',
            type: 'pdf',
            size: '1.8 MB',
            description: 'Lista com as melhores opções tributárias para quem está iniciando.',
          },
        ],
        checklist: [
          { id: 'chk-2-2-1', text: 'Verificar status do seu CPF/CNPJ', done: false },
          { id: 'chk-2-2-2', text: 'Separar conta bancária exclusiva para a operação', done: false },
        ],
        instructor: {
          name: INSTRUCTOR_NAME,
          role: INSTRUCTOR_TITLE,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      },
    ],
  },
  {
    id: 'mod-3',
    number: 3,
    title: 'VENDAS SEM ESTOQUE',
    shortTitle: 'VENDAS SEM ESTOQUE',
    description: 'Entenda a mecânica precisa do modelo sem estoque: esteira de pedidos, fluxo de caixa e despacho ágil.',
    badge: 'Módulo 03',
    iconType: 'cart',
    lessons: [
      {
        id: 'les-3-1',
        moduleId: 'mod-3',
        title: 'Como Funciona o Modelo de Vendas Sem Estoque na Prática',
        duration: '26:40',
        durationMinutes: 26,
        description: 'Do momento em que o cliente clica em comprar até a entrega no endereço dele: fluxo de pedido, confirmação com o fornecedor parceiro e rastreio.',
        videoThumb: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        takeaways: [
          'Esteira operacional sem necessidade de espaço físico de estocagem',
          'Como garantir que o produto seja postado no prazo do marketplace',
          'Proteção contra rupturas de estoque do fornecedor',
        ],
        resources: [
          {
            id: 'res-3-1-1',
            title: 'Fluxograma Operacional em Alta Resolução.pdf',
            type: 'pdf',
            size: '3.1 MB',
            description: 'Passo a passo visual de cada etapa de uma venda.',
          },
        ],
        checklist: [
          { id: 'chk-3-1-1', text: 'Configurar a planilha de controle de pedidos ativos', done: false },
          { id: 'chk-3-1-2', text: 'Alinhar canal de comunicação direta com seu fornecedor', done: false },
        ],
        instructor: {
          name: INSTRUCTOR_NAME,
          role: INSTRUCTOR_TITLE,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      },
      {
        id: 'les-3-2',
        moduleId: 'mod-3',
        title: 'Cálculo de Margem Real & Precificação Estratégica',
        duration: '21:10',
        durationMinutes: 21,
        description: 'Aprenda a calcular cada centavo de lucro antes de cadastrar o anúncio: comissão do canal, taxa de embalagem do fornecedor, frete e imposto.',
        videoThumb: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
        takeaways: [
          'Como precificar com margem líquida saudável acima de 20%',
          'Taxa fixa vs comissão percentual dos marketplaces',
          'Como montar combos e kits para aumentar o tíquete médio',
        ],
        resources: [
          {
            id: 'res-3-2-1',
            title: 'Planilha Automatizada de Precificação.sheet',
            type: 'sheet',
            size: '1.4 MB',
            description: 'Calcula automaticamente seu lucro líquido em reais e porcentagem.',
          },
        ],
        checklist: [
          { id: 'chk-3-2-1', text: 'Simular o preço de 5 produtos do catálogo', done: false },
        ],
        instructor: {
          name: INSTRUCTOR_NAME,
          role: INSTRUCTOR_TITLE,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      },
    ],
  },
  {
    id: 'mod-4',
    number: 4,
    title: 'MARKETPLACES',
    shortTitle: 'MARKETPLACES',
    description: 'Domine a publicação, otimização e regras nos gigantes do comércio: Mercado Livre, Amazon e Shopee.',
    badge: 'Módulo 04',
    iconType: 'marketplaces',
    lessons: [
      {
        id: 'les-4-1',
        moduleId: 'mod-4',
        title: 'Mercado Livre: Criação de Conta, Reputação e Ativação',
        duration: '28:40',
        durationMinutes: 28,
        description: 'O método definitivo para destravar o termômetro verde no Mercado Livre com as 10 primeiras vendas e ganhar visibilidade imediata nos algoritmos de busca.',
        videoThumb: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80',
        takeaways: [
          'Estratégia de produtos âncora para ativar a reputação rapidamente',
          'Configurações essenciais do painel do Mercado Livre',
          'Como evitar penalidades por atraso no despacho',
        ],
        resources: [
          {
            id: 'res-4-1-1',
            title: 'Checklist: 10 Passos para o Termômetro Verde.pdf',
            type: 'pdf',
            size: '850 KB',
            description: 'Guia de ativação rápida de novas contas no Mercado Livre.',
          },
        ],
        checklist: [
          { id: 'chk-4-1-1', text: 'Configurar endereço de remessa e dados cadastrais', done: false },
          { id: 'chk-4-1-2', text: 'Publicar os primeiros anúncios de ativação', done: false },
        ],
        instructor: {
          name: INSTRUCTOR_NAME,
          role: INSTRUCTOR_TITLE,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      },
      {
        id: 'les-4-2',
        moduleId: 'mod-4',
        title: 'Amazon & Shopee: Multi-Canal sem Duplicar Trabalho',
        duration: '24:15',
        durationMinutes: 24,
        description: 'Aprenda a cadastrar os mesmos produtos em múltiplos marketplaces sincronizando prazos e aumentando suas chances de conversão diária.',
        videoThumb: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80',
        takeaways: [
          'Particularidades do Buy Box da Amazon e cupons da Shopee',
          'Como gerenciar pedidos de canais distintos sem confusão',
          'Estratégia de precificação diferenciada por marketplace',
        ],
        resources: [
          {
            id: 'res-4-2-1',
            title: 'Tabela Comparativa de Taxas e Prazos dos Marketplaces.pdf',
            type: 'pdf',
            size: '1.2 MB',
            description: 'Resumo com as comissões de cada plataforma.',
          },
        ],
        checklist: [
          { id: 'chk-4-2-1', text: 'Criar ou vincular conta de vendedor na Shopee e Amazon', done: false },
        ],
        instructor: {
          name: INSTRUCTOR_NAME,
          role: INSTRUCTOR_TITLE,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      },
      {
        id: 'les-4-3',
        moduleId: 'mod-4',
        title: 'SEO de Anúncios & Títulos Campeões de Conversão',
        duration: '22:30',
        durationMinutes: 22,
        description: 'A fórmula de 60 caracteres: [Produto] + [Marca] + [Modelo] + [Especificação] para aparecer no topo das buscas orgânicas sem gastar com anúncios pagos.',
        videoThumb: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        takeaways: [
          'Palavras-chave proibidas que derrubam o posicionamento do anúncio',
          'Preenchimento de 100% da ficha técnica para filtros de busca',
          'Fotos de capa com fundo branco puro e infográficos com medidas',
        ],
        resources: [
          {
            id: 'res-4-3-1',
            title: 'Gerador de Títulos SEO (Aba interna da plataforma).link',
            type: 'link',
            size: 'Web App',
            description: 'Use a ferramenta integrada na barra de navegação para montar títulos perfeitos.',
          },
        ],
        checklist: [
          { id: 'chk-4-3-1', text: 'Gerar 3 títulos usando a ferramenta interna de SEO', done: false },
        ],
        instructor: {
          name: INSTRUCTOR_NAME,
          role: INSTRUCTOR_TITLE,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      },
    ],
  },
  {
    id: 'mod-5',
    number: 5,
    title: 'FERRAMENTA DROP',
    shortTitle: 'FERRAMENTA DROP',
    description: 'Aplicações e integrações de software para automação de estoque, envio de etiquetas e sincronia em tempo real.',
    badge: 'Módulo 05',
    iconType: 'tool',
    lessons: [
      {
        id: 'les-5-1',
        moduleId: 'mod-5',
        title: 'Configuração da Ferramenta de Automação',
        duration: '25:50',
        durationMinutes: 25,
        description: 'Conectando as APIs dos marketplaces com o hub de fornecedores para atualizar quantidades de estoque automaticamente e evitar cancelamentos por falta de item.',
        videoThumb: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
        takeaways: [
          'Instalação e credenciamento de chaves de API com total segurança',
          'Configuração de estoque de segurança (trava de segurança)',
          'Sincronização de catálogo em massa com 1 clique',
        ],
        resources: [
          {
            id: 'res-5-1-1',
            title: 'Manual de Integração da Ferramenta Drop.pdf',
            type: 'pdf',
            size: '2.8 MB',
            description: 'Guia visual passo a passo para conectar suas contas.',
          },
        ],
        checklist: [
          { id: 'chk-5-1-1', text: 'Vincular suas credenciais de marketplace ao painel', done: false },
          { id: 'chk-5-1-2', text: 'Definir margem mínima padrão para precificação dinâmica', done: false },
        ],
        instructor: {
          name: INSTRUCTOR_NAME,
          role: INSTRUCTOR_TITLE,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      },
      {
        id: 'les-5-2',
        moduleId: 'mod-5',
        title: 'Envio de Etiquetas e Notificação Automática de Rastreio',
        duration: '19:40',
        durationMinutes: 19,
        description: 'Como repassar as etiquetas de envio geradas pelos marketplaces (Mercado Envios, Correios, Shopee Xpress) para o galpão do fornecedor sem esforço manual.',
        videoThumb: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80',
        takeaways: [
          'Formatos compatíveis de etiquetas (PDF e ZPL térmico)',
          'Horários de corte para postagem no mesmo dia',
          'Sincronização automática do código de rastreamento com o cliente',
        ],
        resources: [
          {
            id: 'res-5-2-1',
            title: 'Guia de Rotinas Operacionais Diárias.pdf',
            type: 'pdf',
            size: '1.1 MB',
            description: 'Checklist diário de 15 minutos para despachar seus pedidos.',
          },
        ],
        checklist: [
          { id: 'chk-5-2-1', text: 'Realizar um envio simulado de etiqueta para teste', done: false },
        ],
        instructor: {
          name: INSTRUCTOR_NAME,
          role: INSTRUCTOR_TITLE,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      },
    ],
  },
  {
    id: 'mod-6',
    number: 6,
    title: 'FORNECEDOR ALGORITMO',
    shortTitle: 'FORNECEDOR ALGORITMO',
    description: 'Mineração algorítmica de fornecedores nacionais confiáveis com despacho em 24h e tabelas de atacado.',
    badge: 'Módulo 06',
    iconType: 'algorithm',
    lessons: [
      {
        id: 'les-6-1',
        moduleId: 'mod-6',
        title: 'O Algoritmo de Validação de Fornecedores Confiáveis',
        duration: '27:10',
        durationMinutes: 27,
        description: 'Critérios matemáticos para avaliar um fornecedor antes de anunciar seus produtos: tempo médio de despacho, índice de avaria, estoque médio e contrato de parceria.',
        videoThumb: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        takeaways: [
          'Os 5 pilares do fornecedor blindado contra atrasos',
          'Como negociar prazos e formas de pagamento com os galpões',
          'Acesso à lista verificada de parceiros oficiais',
        ],
        resources: [
          {
            id: 'res-6-1-1',
            title: 'Planilha Secreta: Fornecedores Nacionais Verificados 2025.sheet',
            type: 'sheet',
            size: '3.4 MB',
            description: 'Mais de 150 fornecedores de utilidades, tecnologia, moda, casa e ferramentas.',
          },
          {
            id: 'res-6-1-2',
            title: 'Scripts de Negociação com Fornecedores no WhatsApp.pdf',
            type: 'pdf',
            size: '920 KB',
            description: 'Modelos de mensagens prontas para obter as melhores tabelas de preço.',
          },
        ],
        checklist: [
          { id: 'chk-6-1-1', text: 'Baixar a lista de fornecedores verificados', done: false },
          { id: 'chk-6-1-2', text: 'Entrar em contato com 3 fornecedores do seu nicho de interesse', done: false },
        ],
        instructor: {
          name: INSTRUCTOR_NAME,
          role: INSTRUCTOR_TITLE,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      },
      {
        id: 'les-6-2',
        moduleId: 'mod-6',
        title: 'Mineração de Produtos Campeões por Tendência de Busca',
        duration: '23:45',
        durationMinutes: 23,
        description: 'Como usar a ferramenta de mineração para encontrar produtos que estão em pico de demanda e baixa concorrência nos marketplaces brasileiros.',
        videoThumb: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
        takeaways: [
          'Identificação de produtos sazonais e de demanda contínua',
          'Análise de anúncios concorrentes: preço, fotos e volume de vendas',
          'Estratégia de diferenciação de oferta para dominar a primeira página',
        ],
        resources: [
          {
            id: 'res-6-2-1',
            title: 'Checklist de Mineração e Validação de Nichos Lucrativos.pdf',
            type: 'pdf',
            size: '1.5 MB',
            description: 'Filtro em 7 etapas para aprovar ou reprovar um produto antes de listar.',
          },
        ],
        checklist: [
          { id: 'chk-6-2-1', text: 'Validar 5 produtos campeões para cadastrar na sua loja', done: false },
        ],
        instructor: {
          name: INSTRUCTOR_NAME,
          role: INSTRUCTOR_TITLE,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      },
    ],
  },
  {
    id: 'mod-7',
    number: 7,
    title: 'ESTRATÉGIAS',
    shortTitle: 'ESTRATÉGIAS',
    description: 'Tráfego pago com Ads, retenção de clientes, blindagem de reputação e escala para múltiplos 6 dígitos.',
    badge: 'Módulo 07',
    iconType: 'bulb',
    lessons: [
      {
        id: 'les-7-1',
        moduleId: 'mod-7',
        title: 'Mercado Ads & Tráfego Pago com Retorno Garantido (ACOS Alvo)',
        duration: '28:15',
        durationMinutes: 28,
        description: 'Como investir em campanhas patrocinadas no Mercado Livre e Shopee sem desperdiçar dinheiro: cálculo de ACOS de equilíbrio, campanhas de catálogo e aceleração de lançamentos.',
        videoThumb: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
        takeaways: [
          'Fórmula do ACOS máximo permitido pela sua margem de lucro',
          'Separação de campanhas de rentabilidade vs visibilidade',
          'Como otimizar lances e pausar termos negativos que não convertem',
        ],
        resources: [
          {
            id: 'res-7-1-1',
            title: 'Calculadora de ACOS e Orçamento de Tráfego Pago.sheet',
            type: 'sheet',
            size: '800 KB',
            description: 'Planilha prática para controlar seu investimento diário em Ads.',
          },
        ],
        checklist: [
          { id: 'chk-7-1-1', text: 'Definir o teto de ACOS para seus produtos mais vendidos', done: false },
          { id: 'chk-7-1-2', text: 'Criar a primeira campanha de teste com R$ 20/dia', done: false },
        ],
        instructor: {
          name: INSTRUCTOR_NAME,
          role: INSTRUCTOR_TITLE,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      },
      {
        id: 'les-7-2',
        moduleId: 'mod-7',
        title: 'Reputação Blindada, Atendimento & Como Escalar para R$ 100.000/Mês',
        duration: '25:30',
        durationMinutes: 25,
        description: 'Como responder perguntas e mensagens de compradores em minutos, evitar mediações/reclamações e estruturar uma equipe para rodar o negócio 100% no piloto automático.',
        videoThumb: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        takeaways: [
          'Scripts de atendimento humanizado que revertem problemas em notas 5 estrelas',
          'Contratação e treinamento de assistentes para suporte e pedidos',
          'Conclusão do curso e emissão do Certificado Oficial',
        ],
        resources: [
          {
            id: 'res-7-2-1',
            title: 'Manual de Scripts de Atendimento e Respostas Rápidas.pdf',
            type: 'pdf',
            size: '1.6 MB',
            description: 'Mais de 30 respostas prontas para dúvidas de frete, devolução e garantia.',
          },
        ],
        checklist: [
          { id: 'chk-7-2-1', text: 'Concluir todas as aulas do curso', done: false },
          { id: 'chk-7-2-2', text: 'Gerar seu Certificado Oficial de Conclusão do Desafio 10K', done: false },
        ],
        instructor: {
          name: INSTRUCTOR_NAME,
          role: INSTRUCTOR_TITLE,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      },
    ],
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Mentoria Ao Vivo: Análise de Anúncios e Estratégias no Mercado Livre',
    category: 'Live',
    date: 'Toda Terça-feira às 20:00 (Brasília)',
    content: 'Participe da mentoria semanal exclusiva para alunos do Desafio 10K no Zoom. Vamos analisar 5 lojas de alunos ao vivo e ajustar precificação e SEO para multiplicar vendas.',
    actionText: 'Acessar Link da Mentoria no Zoom',
    highlight: true,
  },
  {
    id: 'ann-2',
    title: 'Nova Tabela de Fornecedores com Despacho no Mesmo Dia',
    category: 'Material',
    date: 'Publicado recentemente',
    content: 'Atualizamos a lista do Módulo 06 com 20 novos fornecedores nacionais dos nichos de casa, eletrônicos e ferramentas automotivas com estoque pronto.',
    actionText: 'Baixar Planilha no Módulo 06',
  },
  {
    id: 'ann-3',
    title: 'Atualização nas Regras de Frete dos Marketplaces 2025',
    category: 'Atualização',
    date: 'Publicado esta semana',
    content: 'As novas taxas de comissão e subsídios de frete já foram integradas ao Simulador de Lucro e às aulas práticas da plataforma.',
    actionText: 'Abrir Simulador de Lucro',
  },
];

export const INITIAL_DOUBTS: StudentDoubt[] = [
  {
    id: 'dbt-1',
    lessonId: 'les-3-1',
    userName: 'Carlos Eduardo Silva',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    isInstructor: false,
    question: 'Professor, quando o cliente faz uma compra, quanto tempo tenho para enviar a etiqueta para o fornecedor despachar?',
    createdAt: 'Há 1 dia',
    likes: 8,
    replies: [
      {
        id: 'rep-1-1',
        userName: INSTRUCTOR_NAME,
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        isInstructor: true,
        text: 'Olá Carlos! O ideal é enviar a etiqueta até o horário de corte do fornecedor (geralmente entre 12h e 14h) para que o pedido seja coletado pelos Correios/transportadora no mesmo dia útil. Usando a Ferramenta Drop ensinada no Módulo 05, isso acontece automaticamente!',
        createdAt: 'Há 16 horas',
      },
    ],
  },
  {
    id: 'dbt-2',
    lessonId: 'les-4-3',
    userName: 'Mariana Costa',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    isInstructor: false,
    question: 'Na fórmula de título de 60 caracteres, posso colocar a cor do produto se o fornecedor tiver variação?',
    createdAt: 'Há 2 dias',
    likes: 14,
    replies: [
      {
        id: 'rep-2-1',
        userName: INSTRUCTOR_NAME,
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        isInstructor: true,
        text: 'Excelente pergunta Mariana! Se você tem mais de uma cor disponível com o fornecedor, o recomendado é criar variações dentro do mesmo anúncio e deixar o título focado nas palavras-chave mais buscadas do produto. Assim todas as vendas concentram relevância em um único anúncio!',
        createdAt: 'Há 1 dia',
      },
    ],
  },
];
