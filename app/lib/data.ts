import { Lang } from "./types";

/* ── ASCII art (from /ascii/arch_penguin.txt) ──
   $1 = mauve  #cba6f7
   $2 = text   #cdd6f4
   $3 = blue   #89b4fa
   $4 = lavender #b4befe
*/
export const ASCII_ARCH = [
  "        $1.       ",
  "       $1/ $1\\      ",
  "      $1/^  $1\\     ",
  "     $1/  _  $1\\    ",
  "    $1/  | | ~$1\\   ",
  "   $1/.-'   '-.$1\\  ",
];

export const ASCII_PENGUIN = [
  "       $2.--.  ",
  "      |$3o$4_$3o $2| ",
  "      |$4:_/ $2| ",
  "     /$3/   \\ $2\\ ",
  "    ($3|     | $2)",
  "   $4/'\\_ _ _/`\\",
  "   $2\\___)$4=$2(___/",
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
    system: {
      os: string;
      kernel: string;
      wm: string;
      shell: string;
      terminal: string;
      display: string;
      theme: string;
    };
    hardware: {
      cpu: string;
      gpu: string[];
      ram: string;
    };
    skills: { category: string; items: string[] }[];
    projects: { name: string; desc: string; lang: string; url: string }[];
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
    bio: "Web3 developer specialized in Next.js, Solidity & Python. I use Arch BTW.",
    role: "Web3 Developer",
    company: "CertyChain",
    location: "Santiago de Compostela, Spain (Remote)",
    learning: "GoLang & Rust",
    interests: "Coding · GYM · Anime",
    system: {
      os: "Arch Linux",
      kernel: "6.18-lts",
      wm: "Hyprland",
      shell: "zsh 5.9",
      terminal: "kitty",
      display: "1920x1080 @ 165Hz",
      theme: "Catppuccin Mocha",
    },
    hardware: {
      cpu: "AMD Ryzen 5 7600X @ 5.46 GHz",
      gpu: ["NVIDIA GeForce RTX 4060", "AMD Raphael"],
      ram: "18.75 GiB / 30.51 GiB (61%)",
    },
    skills: [
      {
        category: "Languages",
        items: [
          "TypeScript",
          "JavaScript",
          "Python",
          "Rust",
          "C",
          "C++",
          "Go (learning)",
        ],
      },
      {
        category: "Web3",
        items: ["Solidity", "Ethers.js", "Hardhat", "Foundry", "EVM"],
      },
      { category: "Frontend", items: ["Next.js", "React", "Tailwind CSS"] },
      { category: "Backend", items: ["Node.js", "FastAPI", "PostgreSQL"] },
      {
        category: "DevOps",
        items: ["Docker", "Git", "Linux", "Arch", "Hyprland"],
      },
    ],
    projects: [
      {
        name: "PostQuantumEVM",
        desc: "Post-quantum cryptography experiments on EVM",
        lang: "Solidity/TS",
        url: "https://github.com/0xGeN02/PostQuantumEVM",
      },
      {
        name: "DeFiMetrics",
        desc: "DeFi analytics & calculations toolkit",
        lang: "Rust",
        url: "https://github.com/0xGeN02/DeFiMetrics",
      },
      {
        name: "CertyLex",
        desc: "Smart contract legal framework for CertyChain",
        lang: "Solidity",
        url: "https://github.com/0xGeN02/CertyLex",
      },
      {
        name: "arch_ros2_setup",
        desc: "ROS2 setup scripts for Arch Linux",
        lang: "Dockerfile",
        url: "https://github.com/0xGeN02/arch_ros2_setup",
      },
      {
        name: "tirios-challenge",
        desc: "Technical challenge solution",
        lang: "JavaScript",
        url: "https://github.com/0xGeN02/tirios-challenge",
      },
    ],
    experience: [
      {
        company: "CertyChain",
        role: "Web3 Developer",
        period: "2024 — present",
        desc: "Building smart contract infrastructure and blockchain tooling.",
      },
      {
        company: "metlabs",
        role: "Web3 Frontend Developer",
        period: "2023 — 2024",
        desc: "DeFi dashboards and wallet integrations with Next.js + Ethers.js.",
      },
    ],
    education: [
      {
        institution: "Universidad de Santiago de Compostela",
        degree: "Computer Engineering",
        period: "2020 — present",
      },
    ],
    contact: [
      {
        label: "Email",
        value: "0xgen02@proton.me",
        url: "mailto:0xgen02@proton.me",
      },
      {
        label: "GitHub",
        value: "github.com/0xGeN02",
        url: "https://github.com/0xGeN02",
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
    bio: "Desarrollador Web3 especializado en Next.js, Solidity y Python. Uso Arch BTW.",
    role: "Desarrollador Web3",
    company: "CertyChain",
    location: "Santiago de Compostela, España (Remoto)",
    learning: "GoLang y Rust",
    interests: "Programar · Gym · Anime",
    system: {
      os: "Arch Linux",
      kernel: "6.18-lts",
      wm: "Hyprland",
      shell: "zsh 5.9",
      terminal: "kitty",
      display: "1920x1080 @ 165Hz",
      theme: "Catppuccin Mocha",
    },
    hardware: {
      cpu: "AMD Ryzen 5 7600X @ 5.46 GHz",
      gpu: ["NVIDIA GeForce RTX 4060", "AMD Raphael"],
      ram: "18.75 GiB / 30.51 GiB (61%)",
    },
    skills: [
      {
        category: "Lenguajes",
        items: [
          "TypeScript",
          "JavaScript",
          "Python",
          "Rust",
          "C",
          "C++",
          "Go (aprendiendo)",
        ],
      },
      {
        category: "Web3",
        items: ["Solidity", "Ethers.js", "Hardhat", "Foundry", "EVM"],
      },
      { category: "Frontend", items: ["Next.js", "React", "Tailwind CSS"] },
      { category: "Backend", items: ["Node.js", "FastAPI", "PostgreSQL"] },
      {
        category: "DevOps",
        items: ["Docker", "Git", "Linux", "Arch", "Hyprland"],
      },
    ],
    projects: [
      {
        name: "PostQuantumEVM",
        desc: "Experimentos de criptografía post-cuántica en EVM",
        lang: "Solidity/TS",
        url: "https://github.com/0xGeN02/PostQuantumEVM",
      },
      {
        name: "DeFiMetrics",
        desc: "Herramienta de analíticas y cálculos DeFi",
        lang: "Rust",
        url: "https://github.com/0xGeN02/DeFiMetrics",
      },
      {
        name: "CertyLex",
        desc: "Framework legal en smart contracts para CertyChain",
        lang: "Solidity",
        url: "https://github.com/0xGeN02/CertyLex",
      },
      {
        name: "arch_ros2_setup",
        desc: "Scripts de configuración de ROS2 para Arch Linux",
        lang: "Dockerfile",
        url: "https://github.com/0xGeN02/arch_ros2_setup",
      },
      {
        name: "tirios-challenge",
        desc: "Solución a reto técnico",
        lang: "JavaScript",
        url: "https://github.com/0xGeN02/tirios-challenge",
      },
    ],
    experience: [
      {
        company: "CertyChain",
        role: "Desarrollador Web3",
        period: "2024 — presente",
        desc: "Infraestructura de smart contracts y herramientas blockchain.",
      },
      {
        company: "metlabs",
        role: "Desarrollador Frontend Web3",
        period: "2023 — 2024",
        desc: "Dashboards DeFi e integraciones de wallet con Next.js + Ethers.js.",
      },
    ],
    education: [
      {
        institution: "Universidad de Santiago de Compostela",
        degree: "Ingeniería Informática",
        period: "2020 — presente",
      },
    ],
    contact: [
      {
        label: "Email",
        value: "0xgen02@proton.me",
        url: "mailto:0xgen02@proton.me",
      },
      {
        label: "GitHub",
        value: "github.com/0xGeN02",
        url: "https://github.com/0xGeN02",
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
