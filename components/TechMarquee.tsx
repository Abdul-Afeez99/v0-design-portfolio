'use client';

const items = [
  'Python',
  'TypeScript',
  'NestJS',
  'FastAPI',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Node.js',
  'RabbitMQ',
  'Microservices',
  'REST APIs',
  'WebSockets',
  'CI/CD',
  'Nginx',
];

export function TechMarquee() {
  // Duplicate the list so the -50% translate loops seamlessly.
  const loop = [...items, ...items];

  return (
    <div className="border-y border-border bg-card/40 py-5">
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
          {loop.map((item, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="font-display text-lg font-medium text-muted-foreground transition-colors hover:text-accent">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
