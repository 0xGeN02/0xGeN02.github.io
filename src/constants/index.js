import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  git,
  threejs,
  c,
  cpp,
  python,
  solidity,

  boundless,
  backendimg,
  uie,
  ia,
  
  flappy,
  university,
  portfolioimg,

} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer React && Next.JS",
    icon: web,
  },
  {
    title: "Backend Developer C/C++ && SQL",
    icon: mobile,
  },
  {
    title: "Blockchain && AI",
    icon: backend,
  },
  {
    title: "Python && Big Data",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },

  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "solidity",
    icon: solidity,
  },
  {
    name: "c",
    icon: c,
  },
  {
    name: "c++",
    icon: cpp,
  },
  {
    name: "python",
    icon: python,
  },
];

const experiences = [
  {
    title: "My Degree Journey",
    company_name: "UDC",
    icon: backendimg,
    iconBg: "#383E56",
    date: "September 2020 - June 2022",
    points: [
      "I started my degre at A Coruña University at Computer Science, after 2 years I moved into UiE to learn Cybersecurity, AI and Big Data Analitycs.",
      "I was also learning about how blockchains work and dived into Web3 DeFi protocols, learning to deploy NFT and SmartContracts.",
      "At this time was when I started with C/C++, Git and Octave.",
      "Then I realized that at the UDC I wasnt learning the things that I wanted the most so I moved into UiE.",
    ],
  },
  {
    title: "DeFi Freelance Developer",
    company_name: "Boundless.Money",
    icon: boundless,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "After 1 year of learning Blockchain and Cybersecurity at the Internet, I joined a Dev team and deployed and OHM fork called Boundless.",
      "I deployed NFT, SmartContracts, managing people, I learned Solidity and how a Semi-Professinal remote workflow works.",
      "This project was funt to work but due to the bearmarket we decided to stop working at this project and we moved on.",
      "Finaly I decided that I needed to learn more about programing because I could done things better while working at Boundless.",
    ],
  },
  {
    title: "UiE/Cambridge",
    company_name: "UiE",
    icon: uie,
    iconBg: "#383E56",
    date: "August 2022 - Present",
    points: [
      "After studing 2 years of Computer Science, I switched into Smart Systems, a degree focused into AI, Big Data and Cibersecurity which are the areas where I want to focus the most",
      "Cursing now the first year at this University, I was selected into study at Cambridge this summer where I will be learning about Quantic Computers",
      "I'm very passioned about keep cursing here and learn about IA and the newest technologies and how are going to impact in the next few years.",
      "After cursing the degree I would like to do a master in AI or Cybersecurity as long as I work part-time",
    ],
  },
  {
    title: "Full stack Developer",
    company_name: "Future",
    icon: ia,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    points: [
      "After being in the coding world I can offer a bag of habilities.",
      "3+ years with C/C++, Python, Octave.",
      "1,5+ years with CSS, HTML, JS, TS, ThreeJS, React",
      "2+ years with Solidity, Blockchain development and Cibersecurity audits.",
    ],
  },
];

const testimonials = [
  {
    testimonial: 
      "I thought it was impossible to make a website as beautiful as our product, but GeN0 proved me wrong.",
    name: "Jennyfer Austin",
    designation: "CFO",
    company: "ShoppY",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a blockchain developer who truly cares about the project success like him does.",
    name: "Chris Brown",
    designation: "COO",
    company: "CryptoVoid",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After GeN0 optimized our enterprise logic, our performance increased by 50%. We can't thank him enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "SaveUrData CO",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "3D_Portfolio",
    description:
      "My first web-page using Three.JS and React with TailwindCSS. This page is a personal project to upload my projects.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "Three.JS",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: portfolioimg,
    source_code_link: "https://github.com/0xGeN02",
  },
  {
    name: "FlappyBird Remake",
    description:
      "I made a remake of the mythical game FlappyBird, it was my biggest project with Python at the University.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "PyGame",
        color: "pink-text-gradient",
      },
    ],
    image: flappy,
    source_code_link: "https://github.com/0xGeN02",
  },
  {
    name: "University",
    description:
      "This is a portfolio that I will be uploading and uprading as long as I will get involved into more projects at the College.",
    tags: [
      {
        name: "C/C++",
        color: "blue-text-gradient",
      },
      {
        name: "Python",
        color: "green-text-gradient",
      },
      {
        name: "Java",
        color: "pink-text-gradient",
      },
      {
        name: "SQL",
        color: "orange-text-gradient",
      },
    ],
    image: university,
    source_code_link: "https://github.com/0xGeN02",
  },
];

export { services, technologies, experiences, testimonials, projects };
