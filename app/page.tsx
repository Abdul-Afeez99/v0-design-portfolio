'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { portfolioData } from '@/lib/data';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ProjectCard } from '@/components/ProjectCard';
import { HeroText } from '@/components/HeroText';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ExperienceTimelineScroller } from '@/components/ExperienceTimelineScroller';
import { TechMarquee } from '@/components/TechMarquee';
import {
  ArrowUpRight,
  Github,
  Mail,
  MapPin,
  Download,
  Linkedin,
  Phone,
  Menu,
  X,
  ArrowDown,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileNavOpen]);

  // Parallax drift on the hero orbs + fade the hero content on scroll.
  useGSAP(
    () => {
      gsap.to('.orb-1', {
        yPercent: 40,
        xPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.orb-2', {
        yPercent: -30,
        xPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero-inner', {
        yPercent: 18,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { scope: heroRef }
  );

  const githubUrl =
    portfolioData.socialLinks.find((l) => l.name === 'GitHub')?.url ??
    'https://github.com';
  const linkedinUrl =
    portfolioData.socialLinks.find((l) => l.name === 'LinkedIn')?.url ??
    'https://linkedin.com';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed inset-x-0 top-0 z-50">
        <div className="glass border-b border-border">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <a
              href="#home"
              className="flex items-center gap-2 font-display text-xl font-bold"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-bold text-accent-foreground">
                A
              </span>
              <span className="text-gradient">AbdulAfeez</span>
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="link-muted text-sm font-medium"
                >
                  {link}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-3 md:flex">
                <a
                  href={portfolioData.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary px-5 py-2 text-sm"
                >
                  Resume
                  <ArrowUpRight size={16} />
                </a>
                <ThemeToggle />
              </div>
              <div className="flex items-center gap-3 md:hidden">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setMobileNavOpen((v) => !v)}
                  className="btn btn-outline p-2"
                  aria-label="Toggle navigation"
                  aria-expanded={mobileNavOpen}
                >
                  {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileNavOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
                onClick={() => setMobileNavOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="glass absolute inset-x-0 top-full z-50 border-b border-border md:hidden"
              >
                <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col">
                    {navLinks.map((link) => (
                      <a
                        key={link}
                        href={`#${link.toLowerCase()}`}
                        className="link-muted py-3 text-base font-medium"
                        onClick={() => setMobileNavOpen(false)}
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3 pt-4">
                    <a
                      href={portfolioData.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full px-4 py-3"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      <ArrowUpRight size={16} />
                      View Resume
                    </a>
                    <a
                      href={portfolioData.cvUrl}
                      download
                      className="btn btn-outline w-full px-4 py-3"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      <Download size={16} />
                      Download
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero */}
        <section
          id="home"
          ref={heroRef}
          className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 sm:px-6 lg:px-8"
        >
          <div className="dotgrid absolute inset-0 -z-20 opacity-60" />
          <div className="absolute inset-0 -z-10">
            <div className="orb-1 absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
            <div className="orb-2 absolute bottom-[12%] right-[8%] h-96 w-96 rounded-full bg-[color:var(--chart-4)]/25 blur-[120px]" />
          </div>

          <div className="hero-inner mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for backend & systems work
            </motion.div>

            <HeroText
              as="h1"
              text={`Hi, I'm ${portfolioData.name}`}
              highlight="AbdulAfeez Adeyemo"
              className="mb-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl"
              delay={0.15}
            />

            <HeroText
              as="p"
              text={portfolioData.title}
              className="mb-6 font-display text-xl text-accent sm:text-2xl md:text-3xl"
              delay={0.35}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg"
            >
              {portfolioData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a href="#projects" className="btn btn-primary w-full px-8 py-3 font-semibold sm:w-auto">
                View My Work
              </a>
              <a
                href={`mailto:${portfolioData.email}`}
                className="btn btn-outline w-full px-8 py-3 font-semibold sm:w-auto"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>

          <motion.a
            href="#about"
            aria-label="Scroll to content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              <ArrowDown size={18} className="text-accent" />
            </motion.span>
          </motion.a>
        </section>

        {/* Tech marquee */}
        <TechMarquee />

        {/* About */}
        <section id="about" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <AnimatedSection>
              <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
                01 — About
              </p>
              <h2 className="mb-8 font-display text-4xl font-bold md:text-5xl">
                Building what powers the product
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  I build backend systems for products where reliability isn&apos;t a nice-to-have—it&apos;s the job. I&apos;ve helped power fintech, logistics, and marketplace platforms by shaping the infrastructure behind payments, integrations, and high-traffic APIs.
                </p>
                <p>
                  Over the years, I&apos;ve worn different hats—from working within a core engineering team to owning backend delivery end-to-end as the only backend engineer. I enjoy taking a problem from vague requirements to a production-ready service: clear contracts, robust error handling, observability, and deployments that don&apos;t keep you up at night.
                </p>
                <p>
                  My strongest tools are Python and TypeScript. I use them to turn complex workflows into maintainable systems with a focus on performance, security, and clean architecture—especially when there are third-party services involved and the edge cases aren&apos;t optional.
                </p>
                <p>
                  Beyond the tools, I&apos;m a creative thinker and a problem solver—I enjoy breaking messy, real-world constraints into simple systems that teams can trust. Outside of work, you&apos;ll usually find me chasing new food spots, planning a trip, playing football, or getting lost in a good book.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <AnimatedSection className="mb-4">
              <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
                02 — Experience
              </p>
              <h2 className="font-display text-4xl font-bold md:text-5xl">
                Where I&apos;ve shipped
              </h2>
            </AnimatedSection>
            <ExperienceTimelineScroller experiences={portfolioData.experience} />
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <AnimatedSection className="mb-14">
              <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
                03 — Projects
              </p>
              <h2 className="mb-4 font-display text-4xl font-bold md:text-5xl">
                Featured work
              </h2>
              <p className="max-w-2xl text-lg text-muted-foreground">
                A selection of recent projects that showcase how I design and ship backend systems.
              </p>
            </AnimatedSection>

            <div className="grid gap-8">
              {portfolioData.projects.map((project, index) => (
                <AnimatedSection key={project.id} delay={index * 0.05}>
                  <ProjectCard project={project} index={index} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <AnimatedSection className="mb-14">
              <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
                04 — Skills
              </p>
              <h2 className="font-display text-4xl font-bold md:text-5xl">
                Tools &amp; technologies
              </h2>
            </AnimatedSection>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid gap-8 md:grid-cols-2"
            >
              {Object.entries(portfolioData.skills).map(([category, skills]) => (
                <motion.div
                  key={category}
                  variants={itemVariants}
                  className="rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-accent/40"
                >
                  <h3 className="mb-4 font-display text-lg font-bold capitalize text-accent">
                    {category.replace(/([A-Z])/g, ' $1')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
          </div>
          <div className="mx-auto max-w-4xl text-center">
            <AnimatedSection>
              <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
                05 — Contact
              </p>
              <h2 className="mb-6 font-display text-4xl font-bold md:text-6xl text-balance">
                Let&apos;s build something reliable
              </h2>
              <p className="mb-10 text-lg text-muted-foreground">
                I&apos;m always interested in hearing about new projects and opportunities.
              </p>

              <div className="flex flex-col items-center gap-8">
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="btn btn-primary px-8 py-4 text-base font-semibold"
                >
                  <Mail size={20} />
                  Send me an email
                </a>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`mailto:${portfolioData.email}`}
                    className="link-muted inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm"
                  >
                    <Mail size={16} />
                    {portfolioData.email}
                  </a>
                  <a
                    href={`tel:${portfolioData.phone}`}
                    className="link-muted inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm"
                  >
                    <Phone size={16} />
                    {portfolioData.phone}
                  </a>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-muted inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm"
                  >
                    <Github size={16} />
                    {githubUrl.replace(/^https?:\/\//, '')}
                  </a>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-muted inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm"
                  >
                    <Linkedin size={16} />
                    {linkedinUrl.replace(/^https?:\/\//, '')}
                  </a>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-muted-foreground">
                    <MapPin size={16} />
                    {portfolioData.location}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
          <p>
            Built with Next.js, TypeScript, Tailwind &amp; GSAP.
          </p>
          <p className="text-accent">© 2026 AbdulAfeez Adeyemo</p>
        </div>
      </footer>
    </div>
  );
}
