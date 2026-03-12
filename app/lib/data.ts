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
    achievements?: string[];
    certifications?: {
      name: string;
      issuer?: string;
      year?: string;
      url?: string;
    }[];
    cvUrl?: string;
    portfolio?: { name: string; desc: string; url?: string }[];
    status: {
      availability: string;
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
    }[];
    education: { institution: string; degree: string; period: string }[];
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
    achievements: [
      "Prototyped PostQuantumEVM: research on quantum-resistant cryptography for EVM chains",
      "AI & Data Engineering internship at Plexus — built production ML data pipelines and model-serving infra",
      "Led the architecture and implementation of CertyChain's identity smart-contract suite (production-ready)",
      "Completed an Engineering Programme at Cambridge (Girton College, 2023)",
    ],
    certifications: [
      {
        name: "Smart Contracts Security (practical)",
        issuer: "CertOrg",
        year: "2025",
      },
    ],
    status: {
      availability: "Open to opportunities",
      type: "Full-time · Part Time",
      focus: "ML Engineering · Backend · Blockchain",
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
        role: "AI & Data Engineer",
        period: "2026",
        desc: "Designing and implementing scalable data pipelines and model-serving infrastructure to support production ML workflows and analytics at Plexus.",
      },
      {
        company: "CertyChain",
        role: "Blockchain Architect",
        period: "2023 — 2025",
        desc: "Led the design and delivery of CertyChain's on-chain identity primitives, smart-contract libraries, and developer tooling — including audits and CI/CD for secure deployments.",
      },
      {
        company: "Metlabs",
        role: "Web3 Backend Developer",
        period: "2025",
        desc: "Implemented backend services and integrations for DeFi dashboards, wallet interactions, and on-chain data indexing using Node.js and Solidity tooling.",
      },
    ],
    education: [
      {
        institution: "Universidad Intercontinental de la Empresa",
        degree: "Smart Systems Engineering",
        period: "2022 — 2026",
      },
      {
        institution: "University of Cambridge",
        degree: "Engineering Programme",
        period: "2023",
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
    achievements: [
      "Prácticas de AI & Data Engineering en Plexus — pipelines ML en producción e infraestructura de model-serving",
      "Lideré la arquitectura e implementación de la suite de smart contracts de identidad de CertyChain (producción)",
      "Programa de Ingeniería en Cambridge (Girton College, 2023)",
      "Prototipé PostQuantumEVM: investigación en criptografía resistente a la computación cuántica para EVM",
    ],
    certifications: [
      {
        name: "Seguridad en Smart Contracts (práctico)",
        issuer: "CertOrg",
        year: "2025",
      },
    ],
    status: {
      availability: "Abierto a oportunidades",
      type: "Jornada completa · Prácticas",
      focus: "ML Engineering · Backend · Blockchain",
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
        role: "AI & Data Engineer",
        period: "2026",
        desc: "Diseño e implementación de pipelines de datos escalables e infraestructura de model-serving para flujos ML en producción y analítica.",
      },
      {
        company: "CertyChain",
        role: "Arquitecto Blockchain",
        period: "2023 — 2025",
        desc: "Lideré diseño y entrega de primitivas de identidad on-chain, librerías de smart contracts y tooling para desarrolladores — incluyendo auditorías y CI/CD para despliegues seguros.",
      },
      {
        company: "Metlabs",
        role: "Backend Web3",
        period: "2025",
        desc: "Implementé servicios backend e integraciones para dashboards DeFi, interacciones con wallets e indexación on-chain usando Node.js y herramientas Solidity.",
      },
    ],
    education: [
      {
        institution: "Universidad Intercontinental de la Empresa",
        degree: "Ingeniería en Sistemas Inteligentes",
        period: "2022 — 2026",
      },
      {
        institution: "University of Cambridge",
        degree: "Programa de Ingeniería",
        period: "2023",
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
