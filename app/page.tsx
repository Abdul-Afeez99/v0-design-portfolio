'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { portfolioData } from '@/lib/data';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ProjectCard } from '@/components/ProjectCard';
import { HeroText } from '@/components/HeroText';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ExperienceTimelineScroller } from '@/components/ExperienceTimelineScroller';
import {
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Download,
  Linkedin,
  Phone,
  Menu,
  X,
} from 'lucide-react';

const navLinks = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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

  const githubUrl =
    portfolioData.socialLinks.find((link) => link.name === 'GitHub')?.url ??
    'https://github.com';
  const linkedinUrl =
    portfolioData.socialLinks.find((link) => link.name === 'LinkedIn')?.url ??
    'https://linkedin.com';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border relative"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between relative z-50">
          <motion.a
            href="#home"
            className="text-xl font-bold bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AA
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium link-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4">
              <motion.a
                href={portfolioData.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary px-6 py-2"
              >
                <ExternalLink size={16} />
                View Resume
              </motion.a>
              <motion.a
                href={portfolioData.cvUrl}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline px-4 py-2"
              >
                <Download size={16} />
                Download
              </motion.a>
              <ThemeToggle />
            </div>

            <div className="flex md:hidden items-center gap-3">
              <ThemeToggle />
              <motion.button
                type="button"
                onClick={() => setMobileNavOpen((v) => !v)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline p-2"
                aria-label="Toggle navigation"
                aria-expanded={mobileNavOpen}
              >
                {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
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
                className="fixed inset-0 bg-background/40 backdrop-blur-sm md:hidden z-40"
                onClick={() => setMobileNavOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-full left-0 right-0 md:hidden border-b border-border bg-background/95 backdrop-blur-md z-50"
              >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                  <div className="flex flex-col">
                    {navLinks.map((link) => (
                      <a
                        key={link}
                        href={`#${link.toLowerCase()}`}
                        className="py-3 text-base font-medium link-muted"
                        onClick={() => setMobileNavOpen(false)}
                      >
                        {link}
                      </a>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                    <a
                      href={portfolioData.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full px-4 py-3"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      <ExternalLink size={16} />
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
      </motion.nav>

      {/* Main Content */}
      <main className="pt-24">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
              animate={{
                y: [0, 30, 0],
                x: [0, 20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
              animate={{
                y: [0, -30, 0],
                x: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, delay: 0.5 }}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/30 text-sm font-medium">
                Welcome to my portfolio
              </span>
            </motion.div>

            <HeroText
              text={`Hi, I'm ${portfolioData.name}`}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight"
              delay={0.1}
            />

            <HeroText
              text={portfolioData.title}
              className="text-xl sm:text-2xl md:text-3xl text-accent mb-8"
              delay={0.2}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base sm:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              {portfolioData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary w-full sm:w-auto px-8 py-3 font-semibold transition-all"
              >
                View My Work
              </motion.a>
              <motion.a
                href={`mailto:${portfolioData.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline w-full sm:w-auto px-8 py-3 font-semibold transition-all"
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-sm text-muted-foreground">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-accent rounded-full flex items-start justify-center p-2">
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1 h-2 bg-accent rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-card/30"
        >
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">About Me</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I build backend systems for products where reliability isn&apos;t a nice-to-have—it&apos;s the job. I&apos;ve helped power fintech, logistics, and marketplace platforms by shaping the infrastructure behind payments, integrations, and high-traffic APIs.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Over the years, I&apos;ve worn different hats—from working within a core engineering team to owning backend delivery end-to-end as the only backend engineer. I enjoy taking a problem from vague requirements to a production-ready service: clear contracts, robust error handling, observability, and deployments that don&apos;t keep you up at night.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                My strongest tools are Python and TypeScript. I use them to turn complex workflows into maintainable systems with a focus on performance, security, and clean architecture—especially when there are third-party services involved and the edge cases aren&apos;t optional.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Beyond the tools, I&apos;m a creative thinker and a problem solver—I enjoy breaking messy, real-world constraints into simple systems that teams can trust. Outside of work, you&apos;ll usually find me chasing new food spots, planning a trip, playing football, or getting lost in a good book.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="pt-12 pb-12 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold">Experience</h2>
            </AnimatedSection>

            <ExperienceTimelineScroller experiences={portfolioData.experience} />
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="pt-12 pb-24 px-4 sm:px-6 lg:px-8 bg-card/30"
        >
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
              <p className="text-lg text-muted-foreground">
                Here are some of my recent projects that showcase my skills and expertise.
              </p>
            </AnimatedSection>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-1 gap-8"
            >
              {portfolioData.projects.map((project, index) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="py-24 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Skills & Technologies</h2>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-8"
              >
                {Object.entries(portfolioData.skills).map(([category, skills]) => (
                  <motion.div key={category} variants={itemVariants}>
                    <h3 className="text-xl font-bold mb-4 capitalize">
                      {category.replace(/([A-Z])/g, ' $1')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <motion.span
                          key={skill}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-4 py-2 rounded-lg bg-secondary text-foreground hover:text-accent transition-colors cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30"
        >
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Let&apos;s Work Together</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-10 sm:mb-12">
                I&apos;m always interested in hearing about new projects and opportunities.
              </p>

              <div className="flex flex-col items-center gap-6">
                <motion.a
                  href={`mailto:${portfolioData.email}`}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary w-full sm:w-auto px-6 sm:px-8 py-3 font-semibold transition-all"
                >
                  <Mail size={20} />
                  Send me an email
                </motion.a>

                <div className="w-full">
                  <div className="mx-auto flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-6">
                    <a
                      href={`mailto:${portfolioData.email}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm link-muted"
                    >
                      <Mail size={16} />
                      {portfolioData.email}
                    </a>
                    <a
                      href={`tel:${portfolioData.phone}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm link-muted"
                    >
                      <Phone size={16} />
                      {portfolioData.phone}
                    </a>
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm link-muted"
                    >
                      <Github size={16} />
                      {githubUrl.replace('https://', '').replace('http://', '')}
                    </a>
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm link-muted"
                    >
                      <Linkedin size={16} />
                      {linkedinUrl.replace('https://', '').replace('http://', '')}
                    </a>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
                      <MapPin size={16} />
                      {portfolioData.location}
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/30"
      >
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>
            Built with Next.js, TypeScript, Tailwind CSS & Framer Motion. 
            <span className="text-accent"> © 2024 AbdulAfeez Adeyemo</span>
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
