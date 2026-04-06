'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/data';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ProjectCard } from '@/components/ProjectCard';
import { HeroText } from '@/components/HeroText';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ExternalLink, Github, Mail, MapPin, Download } from 'lucide-react';

const navLinks = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

export default function Home() {
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
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
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
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
                whileHover={{ color: '#00d4ff' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href="/cv.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Download size={16} />
              Resume
            </motion.a>
            <ThemeToggle />
          </div>
        </div>
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
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
              delay={0.1}
            />

            <HeroText
              text={portfolioData.title}
              className="text-2xl md:text-3xl text-accent mb-8"
              delay={0.2}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
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
                className="px-8 py-3 rounded-lg bg-accent text-primary font-semibold hover:bg-accent/90 transition-all"
              >
                View My Work
              </motion.a>
              <motion.a
                href={`mailto:${portfolioData.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg border border-accent text-accent hover:bg-accent/10 font-semibold transition-all"
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
          className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30"
        >
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">About Me</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I&apos;m a backend engineer with a passion for building scalable, efficient systems that solve real-world problems. With experience across the full stack, I specialize in Node.js, TypeScript, and cloud technologies.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I love the challenge of designing systems that are not just functional, but elegant and performant. When I&apos;m not coding, you can find me exploring new technologies, contributing to open source, or writing about software development.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="py-24 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-12">Experience</h2>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                {portfolioData.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative pl-8 pb-8 border-l-2 border-accent/30 hover:border-accent transition-colors"
                  >
                    <div className="absolute -left-4 top-0 w-6 h-6 bg-accent rounded-full border-4 border-background" />
                    <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                    <p className="text-accent font-semibold mb-2">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-4">{exp.period}</p>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="text-muted-foreground flex items-start gap-3"
                        >
                          <span className="text-accent mt-1.5">›</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30"
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
          <div className="max-w-2xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Let&apos;s Work Together</h2>
              <p className="text-lg text-muted-foreground mb-12">
                I&apos;m always interested in hearing about new projects and opportunities.
              </p>

              <div className="flex flex-col items-center gap-6">
                <motion.a
                  href={`mailto:${portfolioData.email}`}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-accent text-primary font-semibold hover:bg-accent/90 transition-all"
                >
                  <Mail size={20} />
                  Send me an email
                </motion.a>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <MapPin size={20} />
                  <span>{portfolioData.location}</span>
                </div>

                <div className="flex gap-6 mt-4">
                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, color: '#00d4ff' }}
                    whileTap={{ scale: 0.95 }}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Github size={24} />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, color: '#00d4ff' }}
                    whileTap={{ scale: 0.95 }}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <ExternalLink size={24} />
                  </motion.a>
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
