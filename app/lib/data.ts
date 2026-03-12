import { Lang } from "./types";

// ── Shared skills (language-agnostic, same for en & es) ──
export const SKILLS: { category: string; items: string[] }[] = [
  {
    category: "Languages",
    items: [
      "Python",
      "TypeScript",
      "Rust",
      "Solidity",
      "C++",
      "Markdown",
      "Shell",
    ],
  },
  {
    category: "AI / ML",
    items: [
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "MLflow",
      "HuggingFace",
    ],
  },
  {
    category: "Data",
    items: ["PostgreSQL", "Kafka", "Spark", "Airflow", "MongoDB"],
  },
  {
    category: "Backend",
    items: ["FastAPI", "Node.js", "Docker", "N8N", "GraphQL"],
  },
  {
    category: "Blockchain",
    items: [
      "Solidity",
      "Ethers.js",
      "Foundry",
      "EVM",
      "OpenZeppelin",
      "ChainLink",
    ],
  },
  {
    category: "Embedded / Systems",
    items: ["C", "Rust", "Raspberry Pi", "Arduino"],
  },
  {
    category: "Cloud",
    items: ["AWS", "IPFS"],
  },
];

// ── Personal data ──
export const data: Record<
  Lang,
  {
    bio: string;
    role: string;
    company: string;
    location: string;
    learning: string;
    interests: string;
    headline?: string;
    aboutBullets?: string[];
    summary?: string;
    certifications?: {
      name: string;
      issuer?: string;
      year?: string;
      url?: string;
    }[];
    cvUrl?: string;
    portfolio?: { name: string; desc: string; url?: string }[];
    status: {
      name: string;
      type: string;
      focus: string;
      location: string;
    };
    stack?: string[];
    skills: { category: string; items: string[] }[];
    projects: {
      name: string;
      desc: string;
      lang: string;
      url: string;
      image?: string;
    }[];
    experience: {
      company: string;
      role: string;
      period: string;
      desc: string;
      bullets?: string[];
    }[];
    education: {
      institution: string;
      degree: string;
      period: string;
      bullets?: string[];
    }[];
    contact: { label: string; value: string; url?: string }[];
    blog: { title: string; desc: string; date: string }[];
  }
> = {
  en: {
    // Headline & summary for CV-style rendering
    headline: "Smart Systems · Machine Learning · Blockchain Architect",
    summary:
      "Engineer with a background spanning machine learning, blockchain systems, and embedded hardware. Currently focused on AI & data infrastructure at Plexus; previously architected a production-grade blockchain identity platform at CertyChain. I enjoy building where disciplines intersect — from training models to deploying smart contracts.",
    bio: "Smart Systems Engineer specialised in ML, Web3 & systems programming.",
    aboutBullets: [
      "BSc Smart Systems Engineering · UIE, A Coruña (2022-2026)",
      "Engineering Programme · Cambridge University, Girton College (2023)",
      "Research: post-quantum cryptography on EVM",
      "I use Arch BTW.",
    ],
    role: "AI & Data Engineer",
    company: "Plexus",
    location: "Santiago de Compostela, Spain (Remote)",
    learning: "I am focusing on Quantitative Finance and Rust in my free time.",
    interests: "Coding · GYM · Anime · Economics",
    cvUrl: "/pdf/CV_March_2026_EN.pdf",
    certifications: [
      {
        name: "Smart Contracts Security (practical)",
        issuer: "CertOrg",
        year: "2025",
      },
    ],
    status: {
      name: "M. Mateo Delgado",
      type: "Full-time · Part Time",
      focus: "ML Engineering · Quantitative Research · Blockchain",
      location: "Remote · Spain",
    },
    stack: [
      "PyTorch",
      "FastAPI",
      "Next.js",
      "Solidity",
      "Foundry",
      "Docker",
      "HuggingFace",
      "Git",
    ],
    skills: SKILLS,
    projects: [
      {
        name: "PostQuantumEVM",
        desc: "Fork of the Reth Ethereum execution client integrating post-quantum algorithms as EVM precompiles — Dilithium signatures (0x101), Kyber key encapsulation (0x102), BLAKE3 hashing (0x100). Custom P2P network, JSON-RPC API, and Qiskit integration for quantum circuit simulation.",
        lang: "Solidity / Rust / Python",
        url: "https://github.com/0xGeN02/PostQuantumEVM",
        image: "/image/pq_evm.png",
      },
      {
        name: "HyDE",
        desc: "Modular, script-based framework that transforms Hyprland into a fully functional and aesthetic Desktop Environment on Arch Linux — custom bars, app launchers, theme management and wallpaper engine.",
        lang: "Python / Shell",
        url: "https://github.com/HyDE-Project/HyDE",
        image: "/image/hyde.png",
      },
      {
        name: "Pokemon Team Generator",
        desc: "CLI tool that builds competitive Pokémon teams using three sorting algorithms (Timsort, Quicksort, BubbleSort) for candidate ranking. Outputs full team analysis: stats, movesets, type matchups and algorithm benchmark times.",
        lang: "Python",
        url: "https://github.com/0xGeN02/PokemonTeamGenerator",
        image: "/image/pkmn_team_generator.png",
      },
      {
        name: "IoT House",
        desc: "Home automation system on Raspberry Pi monitoring multi-room temperature, water flow and power consumption. Data streams via MQTT, processed with N8N workflows, and visualised in a real-time Grafana dashboard.",
        lang: "Python / N8N / Grafana",
        url: "https://github.com/0xGeN02/iot_house",
        image: "/image/iot_house.png",
      },
      {
        name: "CertyLex",
        desc: "Domain-specific framework codifying legal primitives into audited smart-contract patterns for CertyChain's verifiable credentials and on-chain claims infrastructure.",
        lang: "Python / TypeScript",
        url: "https://github.com/0xGeN02/CertyLex",
        image: "/image/certylex.png",
      },
    ],
    experience: [
      {
        company: "Plexus",
        role: "AI & Data Engineer Intern",
        period: "2026",
        desc: "Designed and built data infrastructure and AI tooling for production ML workflows.",
        bullets: [
          "Designed a Data Lakehouse with Medallion architecture (Bronze/Silver/Gold) for tracking crypto wallet transactions — ETL/ELT pipelines orchestrated with Apache Airflow",
          "Built an AI ticket-resolution agent for Jira using RAG: embeddings in PostgreSQL pgvector, graph queries via Apache AGE",
          "Implemented a local cloud environment with LocalStack + MinIO S3-compatible buckets for scalable document storage inside the AI pipeline",
          "Engineered a real-time legacy modernisation pipeline: IBM Db2 on AS/400 → PostgreSQL via CDC with Debezium and Apache Kafka",
        ],
      },
      {
        company: "CertyChain",
        role: "Full Stack & Blockchain Architect",
        period: "2023 — 2025",
        desc: "Architected and shipped an end-to-end blockchain identity platform from smart contracts to frontend.",
        bullets: [
          "Architected and deployed blockchain platform with Solidity + Foundry: contract development, security auditing and gas optimisation for production environments",
          "Built scalable backend with Next.js API routes, TypeScript and Docker-based microservices; managed server deployment and orchestration",
          "Delivered full-stack solution: React/Next.js + Tailwind CSS frontend, automated CI/CD with GitHub Actions, Bash deployment scripts",
          "Implemented database encryption and end-to-end security protocols — from smart-contract vulnerability mitigation to backend cybersecurity measures",
        ],
      },
      {
        company: "Metlabs",
        role: "Blockchain Developer Intern",
        period: "2025",
        desc: "Developed and optimised smart contracts and backend blockchain infrastructure for production deployment.",
        bullets: [
          "Developed and optimised smart contracts focused on security auditing — identified vulnerabilities and implemented gas-efficient solutions",
          "Built backend infrastructure for blockchain integration: node configuration, API development and transaction processing systems",
          "Conducted performance analysis and optimisation of smart contract execution, improving efficiency and reducing computational costs",
        ],
      },
    ],
    education: [
      {
        institution: "Universidad Intercontinental de la Empresa",
        degree: "Smart Systems Engineering",
        period: "2022 — 2026",
        bullets: [
          "Specialised in AI, ML, quantum computing, blockchain, IoT systems and robotics — focus on practical implementation",
          "Developed expertise in algorithms, neural networks, intelligent automation, distributed ledger systems and embedded devices",
          "Final-year research: post-quantum cryptography precompiles for the EVM (Dilithium · Kyber)",
        ],
      },
      {
        institution: "University of Cambridge",
        degree: "Engineering Programme · Girton College",
        period: "2023",
        bullets: [
          "Intensive programme specialising in quantum computing fundamentals: quantum algorithms, qubits and quantum information processing",
          "Explored nanorobotics and jet engine design at the intersection of quantum mechanics and advanced engineering systems",
          "Grade: A−",
        ],
      },
    ],
    contact: [
      {
        label: "Email",
        value: "manuelmateodgl02@gmail.com",
        url: "mailto:manuelmateodgl02@gmail.com",
      },
      {
        label: "GitHub",
        value: "github.com/0xGeN02",
        url: "https://github.com/0xGeN02",
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/mateodelgadodevel",
        url: "https://www.linkedin.com/in/mateodelgadodevel/",
      },
      {
        label: "Discord",
        value: "discord.gg/xgen0",
        url: "https://discord.gg/xgen0",
      },
    ],
    blog: [],
  },
  es: {
    headline: "Smart Systems · Machine Learning · Arquitecto Blockchain",
    summary:
      "Ingeniero con experiencia en machine learning, sistemas blockchain y hardware embebido. Actualmente construyo infraestructura de IA y datos en Plexus; anteriormente diseñé la plataforma de identidad blockchain de CertyChain a nivel de producción. Me apasiona trabajar donde se cruzan disciplinas: desde entrenar modelos hasta desplegar smart contracts.",
    bio: "Ingeniero de Sistemas Inteligentes especializado en IA/ML, Web3 y programación de sistemas.",
    aboutBullets: [
      "Grado en Smart Systems Engineering · UIE, A Coruña (2022-2026)",
      "Programa de Ingeniería · Cambridge University, Girton College (2023)",
      "Investigación: criptografía post-cuántica en EVM",
      "Uso Arch BTW.",
    ],
    role: "AI & Data Engineer",
    company: "Plexus",
    location: "Santiago de Compostela, España (Remoto)",
    learning:
      "En mi tiempo libre me estoy enfocando en Finanzas Cuantitativas y Rust.",
    interests: "Programar · Gym · Anime · Economía",
    cvUrl: "/pdf/CV_March_2026_EN.pdf",
    certifications: [
      {
        name: "Seguridad en Smart Contracts (práctico)",
        issuer: "CertOrg",
        year: "2025",
      },
    ],
    status: {
      name: "M. Mateo Delgado",
      type: "Jornada completa · Prácticas",
      focus: "ML Engineering · Análisis Cuantitativo · Blockchain",
      location: "Remoto · España",
    },
    stack: [
      "PyTorch",
      "FastAPI",
      "Next.js",
      "Solidity",
      "Foundry",
      "Docker",
      "HuggingFace",
      "Git",
    ],
    skills: SKILLS,
    projects: [
      {
        name: "PostQuantumEVM",
        desc: "Fork del cliente de ejecución Ethereum Reth que integra algoritmos post-cuánticos como precompilados EVM — firmas Dilithium (0x101), encapsulación de claves Kyber (0x102), hashing BLAKE3 (0x100). Red P2P personalizada, API JSON-RPC e integración con Qiskit para simulación cuántica.",
        lang: "Solidity / Rust / Python",
        url: "https://github.com/0xGeN02/PostQuantumEVM",
        image: "/image/pq_evm.png",
      },
      {
        name: "HyDE",
        desc: "Framework modular basado en scripts que transforma Hyprland en un entorno de escritorio completo y estético sobre Arch Linux — barras personalizadas, lanzadores de apps, gestión de temas y motor de fondos de pantalla.",
        lang: "Python / Shell",
        url: "https://github.com/HyDE-Project/HyDE",
        image: "/image/hyde.png",
      },
      {
        name: "Pokemon Team Generator",
        desc: "Herramienta CLI que construye equipos Pokémon competitivos usando tres algoritmos de ordenación (Timsort, Quicksort, BubbleSort) para el ranking de candidatos. Muestra análisis completo: stats, movimientos, matchups de tipos y tiempos de benchmark por algoritmo.",
        lang: "Python",
        url: "https://github.com/0xGeN02/PokemonTeamGenerator",
        image: "/image/pkmn_team_generator.png",
      },
      {
        name: "IoT House",
        desc: "Sistema de automatización del hogar en Raspberry Pi que monitoriza temperatura por habitaciones, flujo de agua y consumo eléctrico. Los datos se transmiten vía MQTT, se procesan con flujos N8N y se visualizan en un dashboard Grafana en tiempo real.",
        lang: "Python / N8N / Grafana",
        url: "https://github.com/0xGeN02/iot_house",
        image: "/image/iot_house.png",
      },
      {
        name: "CertyLex",
        desc: "Framework específico de dominio que codifica primitivas legales en patrones de smart contracts auditados para la infraestructura de credenciales verificables y claims on-chain de CertyChain.",
        lang: "Python / TypeScript",
        url: "https://github.com/0xGeN02/CertyLex",
        image: "/image/certylex.png",
      },
    ],
    experience: [
      {
        company: "Plexus",
        role: "AI & Data Engineer (Prácticas)",
        period: "2026",
        desc: "Diseño y construcción de infraestructura de datos y herramientas de IA para flujos ML en producción.",
        bullets: [
          "Data Lakehouse con arquitectura Medallion (Bronze/Silver/Gold) para seguimiento de transacciones de wallets crypto — pipelines ETL/ELT orquestados con Apache Airflow",
          "Agente de resolución de tickets Jira con RAG: embeddings en PostgreSQL pgvector, consultas de grafo vía Apache AGE",
          "Entorno cloud local con LocalStack + buckets MinIO compatibles con S3 para almacenamiento de documentos dentro del pipeline de IA",
          "Pipeline de modernización legacy en tiempo real: IBM Db2 en AS/400 → PostgreSQL mediante CDC con Debezium y Apache Kafka",
        ],
      },
      {
        company: "CertyChain",
        role: "Full Stack & Arquitecto Blockchain",
        period: "2023 — 2025",
        desc: "Arquitectura y desarrollo completo de una plataforma de identidad blockchain: desde smart contracts hasta el frontend.",
        bullets: [
          "Plataforma blockchain end-to-end con Solidity + Foundry: desarrollo de contratos, auditoría de seguridad y optimización de gas para entornos de producción",
          "Backend escalable con rutas API de Next.js, TypeScript y microservicios en Docker; gestión de despliegue y orquestación de servidores",
          "Solución full-stack completa: frontend React/Next.js + Tailwind CSS, CI/CD automatizado con GitHub Actions y scripts Bash de despliegue",
          "Encriptación de base de datos y protocolos de seguridad end-to-end — desde mitigación de vulnerabilidades en contratos hasta ciberseguridad en el backend",
        ],
      },
      {
        company: "Metlabs",
        role: "Blockchain Developer (Prácticas)",
        period: "2025",
        desc: "Desarrollo y optimización de smart contracts e infraestructura backend blockchain para despliegue en producción.",
        bullets: [
          "Desarrollo y optimización de smart contracts con foco en auditoría de seguridad — detección de vulnerabilidades e implementación de soluciones gas-eficientes",
          "Infraestructura backend para integración blockchain: configuración de nodos, desarrollo de APIs y sistemas de procesamiento de transacciones",
          "Análisis y optimización del rendimiento de ejecución de contratos, mejorando la eficiencia y reduciendo costes computacionales",
        ],
      },
    ],
    education: [
      {
        institution: "Universidad Intercontinental de la Empresa",
        degree: "Ingeniería en Sistemas Inteligentes",
        period: "2022 — 2026",
        bullets: [
          "Especialización en IA, ML, computación cuántica, blockchain, sistemas IoT y robótica — enfoque en implementación práctica",
          "Experiencia en algoritmos, redes neuronales, automatización inteligente, sistemas de ledger distribuido y dispositivos embebidos",
          "TFG: precompilados de criptografía post-cuántica para la EVM (Dilithium · Kyber)",
        ],
      },
      {
        institution: "University of Cambridge",
        degree: "Programa de Ingeniería · Girton College",
        period: "2023",
        bullets: [
          "Programa intensivo en fundamentos de computación cuántica: algoritmos cuánticos, qubits y procesamiento de información cuántica",
          "Exploración de nanorobótica y diseño de motores a reacción en la intersección de la mecánica cuántica y sistemas de ingeniería avanzada",
          "Nota: A−",
        ],
      },
    ],
    contact: [
      {
        label: "Email",
        value: "manuelmateodgl02@gmail.com",
        url: "mailto:manuelmateodgl02@gmail.com",
      },
      {
        label: "GitHub",
        value: "github.com/0xGeN02",
        url: "https://github.com/0xGeN02",
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/mateodelgadodevel",
        url: "https://www.linkedin.com/in/mateodelgadodevel/",
      },
      {
        label: "Discord",
        value: "discord.gg/xgen0",
        url: "https://discord.gg/xgen0",
      },
    ],
    blog: [],
  },
};

export const CATPPUCCIN_SWATCHES = [
  "#f38ba8",
  "#fab387",
  "#f9e2af",
  "#a6e3a1",
  "#89b4fa",
  "#cba6f7",
  "#f5c2e7",
  "#cdd6f4",
];

export const BOOT_LINES: Record<Lang, string[]> = {
  en: [
    ":: Initializing 0xGeN02 terminal...",
    ":: Loading Catppuccin Mocha theme...",
    ":: Mounting /dev/portfolio...",
    ":: Starting Hyprland session...",
    ":: kernel: 6.18-lts-arch1 loaded",
    ":: zsh 5.9 ready",
    "",
    "  Type 'help' to list available commands.",
    "",
  ],
  es: [
    ":: Iniciando terminal 0xGeN02...",
    ":: Cargando tema Catppuccin Mocha...",
    ":: Montando /dev/portfolio...",
    ":: Iniciando sesión Hyprland...",
    ":: kernel: 6.18-lts-arch1 cargado",
    ":: zsh 5.9 listo",
    "",
    "  Escribe 'help' para ver los comandos disponibles.",
    "",
  ],
};
