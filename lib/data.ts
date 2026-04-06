export const portfolioData = {
  name: "AbdulAfeez Adeyemo",
  title: "Backend Engineer & Full Stack Developer",
  description: "I build scalable backend systems and full-stack applications with modern technologies. Passionate about clean code, performance optimization, and creating products that matter.",
  email: "abdulfafeez.dev@gmail.com",
  location: "Lagos, Nigeria",

  projects: [
    {
      id: 1,
      name: "Drova",
      shortDescription: "Fintech platform for money transfers and payments",
      fullDescription: "A modern fintech application built with Node.js and React, enabling seamless money transfers and payment processing.",
      link: "https://usedrova.app/",
      status: "pending",
      statusLabel: "Pending",
      tech: ["Node.js", "TypeScript", "React", "PostgreSQL", "Redis"],
      images: [],
    },
    {
      id: 2,
      name: "Instaflow",
      shortDescription: "Automation platform for workflow management",
      fullDescription: "A comprehensive automation platform designed to streamline business workflows and improve team productivity.",
      link: "https://instaflow.ca/",
      status: "completed",
      statusLabel: "Completed",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "TailwindCSS"],
      images: [],
    },
    {
      id: 3,
      name: "Kormart",
      shortDescription: "E-commerce marketplace for African goods",
      fullDescription: "An e-commerce platform connecting sellers and buyers for African goods, built with modern tech stack and scalable architecture.",
      link: "https://kormart.ng/",
      status: "in-development",
      statusLabel: "In Development",
      tech: ["Node.js", "React", "MongoDB", "Express", "AWS"],
      images: [],
    },
  ],

  experience: [
    {
      company: "Roppi",
      role: "Backend Engineer",
      period: "2022 - Present",
      description: "Lead backend development for core payment and subscription services",
      highlights: [
        "Designed and implemented scalable microservices architecture",
        "Reduced API response time by 60% through optimization",
        "Led team of 3 engineers on critical infrastructure projects",
      ],
    },
  ],

  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "SQL", "HTML/CSS"],
    backend: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Redis"],
    frontend: ["React", "Next.js", "TailwindCSS", "Framer Motion", "SWR"],
    tools: ["Git", "Docker", "AWS", "GitHub", "Postman", "Vercel"],
    databases: ["PostgreSQL", "MongoDB", "Redis", "Firebase"],
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
