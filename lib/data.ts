export const portfolioData = {
  name: "AbdulAfeez Adeyemo",
  title: "Backend Engineer & Full Stack Developer",
  description: "I build scalable backend systems and full-stack applications with modern technologies. Passionate about clean code, performance optimization, and creating products that matter.",
  email: "adeyemoadebayo603@gmail.com",
  phone: "+2348146604258",
  location: "Abeokuta, Ogun State, Nigeria",

  projects: [
    {
      id: 1,
      name: "Drova",
      shortDescription: "Delivery-as-a-Service infrastructure platform for Africa",
      fullDescription: "Drova is Africa's infrastructure layer for the last-mile delivery industry, a $3.2 billion market built on WhatsApp groups, cash payments, and trust. It provides a full-stack Delivery-as-a-Service (DaaS) platform that enables any local delivery operator—from five-rider motorcycle fleets to 50-van logistics companies—to run a professional, scalable business without writing code. Built with NestJS, FastAPI, and PostgreSQL, it features a branded storefront, real-time rider fleet mapping, and a trustworthy payment system. Think Shopify for logistics: in under ten minutes, a business can go from zero to fully operational with live tracking, professional APIs, and integrated payment processing.",
      link: "https://usedrova.app/",
      status: "in-development",
      statusLabel: "In Development",
      tech: ["NestJS", "FastAPI", "PostgreSQL", "WhatsApp Cloud API", "OpenRouter LLM", "Python", "TypeScript"],
      images: [],
    },
    {
      id: 2,
      name: "Instaflow",
      shortDescription: "Cross-border fintech platform for CAD-NGN transfers",
      fullDescription: "A Canadian cross-border fintech platform enabling seamless CAD-NGN money transfers, real-time currency conversion, and Canadian bill payments for individuals across Canada and Nigeria. Built with FastAPI and PostgreSQL, featuring KYC verification, fund transfers, currency conversion, and bill payment processing with production deployment on DigitalOcean.",
      link: "https://instaflow.ca/",
      status: "completed",
      statusLabel: "Completed",
      tech: ["FastAPI", "PostgreSQL", "Python", "DigitalOcean", "Nginx", "SSL/TLS"],
      images: [],
    },
    {
      id: 3,
      name: "Kormart",
      shortDescription: "P2P digital marketplace with escrow and negotiation",
      fullDescription: "A trusted Nigerian P2P marketplace connecting buyers and sellers with support for distressed sales, flexible pricing negotiation, and secure escrow-backed transactions. Built with NestJS, featuring robust RESTful APIs, modular architecture, third-party payment and logistics integrations, seller storefronts, and comprehensive dispute resolution.\n\n⚠️ Note: The development environment is deployed on Render's free tier, so the server may go to sleep after periods of inactivity. It may take a moment to wake up on first load.",
      link: "https://kormart.ng/",
      status: "in-development",
      statusLabel: "In Development",
      tech: ["NestJS", "TypeScript", "PostgreSQL", "REST APIs", "Payment Integration"],
      images: [],
    },
  ],

  experience: [
    {
      company: "Kormart",
      role: "Contract Backend Engineer (NestJS)",
      period: "Oct 2025 - Present",
      description: "6-month contract as sole backend engineer for P2P e-commerce platform",
      highlights: [
        "Designed, built, and maintained all core backend services using NestJS for P2P marketplace",
        "Designed and documented robust RESTful APIs for web and mobile engineers",
        "Integrated third-party payment processing and logistics APIs for end-to-end transactions",
        "Implemented modular architecture with emphasis on error handling and testability",
      ],
    },
    {
      company: "Roppi",
      role: "Backend Engineer",
      period: "Jun 2024 - Nov 2025",
      description: "Full-time backend engineer for multi-service super app platform",
      highlights: [
        "Developed and maintained scalable server-side services using NestJS",
        "Designed RESTful APIs supporting delivery, food ordering, parcel courier, and commerce features",
        "Collaborated with front-end engineers to align APIs with product requirements",
        "Optimized server-side logic and database queries for improved throughput",
      ],
    },
    {
      company: "Instaflow",
      role: "Contract Python Backend Developer",
      period: "Oct 2024 - Present",
      description: "Contract backend developer for cross-border fintech platform",
      highlights: [
        "Built and maintained core backend service using FastAPI and PostgreSQL",
        "Designed and documented API routes for web and mobile applications",
        "Deployed and managed production servers on DigitalOcean with Nginx reverse proxy",
        "Enhanced security through firewall, SSH hardening, SSL/TLS, and access controls",
      ],
    },
    {
      company: "Yayako",
      role: "Contract Python Backend Developer",
      period: "Apr 2024 - Aug 2024",
      description: "Contract backend developer for e-commerce marketplace",
      highlights: [
        "Built core backend service using FastAPI and MongoDB",
        "Designed RESTful APIs for multi-vendor product listings and order management",
        "Integrated third-party logistics and delivery APIs",
        "Collaborated with teams to translate requirements into robust solutions",
      ],
    },
    {
      company: "Mzienet Systems",
      role: "Contract Python Backend Developer",
      period: "Nov 2023 - Apr 2024",
      description: "Backend developer supporting web applications",
      highlights: [
        "Developed backend services for web applications",
        "Contributed to API design, database management, and system integrations",
        "Collaborated with engineering and product teams",
      ],
    },
    {
      company: "CodeDay Labs",
      role: "Software Development Intern",
      period: "Jun 2023 - Aug 2023",
      description: "Internship developing game console with C++ and Windows API",
      highlights: [
        "Contributed to PIX-16, a fantasy retro-style game console",
        "Implemented graphics primitives (lines, rectangles, triangles, circles)",
        "Developed font rendering system for in-game text display",
        "Gained hands-on experience with memory management and large-scale codebases",
      ],
    },
  ],

  skills: {
    languages: ["Python", "JavaScript", "TypeScript", "C++", "C", "C#", "HTML", "CSS"],
    backend: ["FastAPI", "NestJS", "Django REST Framework", "Flask", "Node.js", "Starlette", ".NET"],
    frontend: ["React", "Next.js", "TailwindCSS", "Framer Motion"],
    databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "SQLite"],
    tools: ["Docker", "Nginx", "DigitalOcean", "Linux/Ubuntu", "Git & GitHub", "CI/CD"],
    messaging: ["Celery", "CeleryBeat", "RabbitMQ"],
    other: ["WebSockets", "Microservices", "REST API Design", "SQLAlchemy", "PyTest", "Unit Testing", "Machine Learning", "Web Scraping"],
  },

  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: "linkedin",
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: "twitter",
    },
  ],
};

export type Project = typeof portfolioData.projects[0];
export type Experience = typeof portfolioData.experience[0];
