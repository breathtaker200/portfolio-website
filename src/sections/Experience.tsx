import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: 'Associate Software Engineer',
    company: 'Yamaha Motor Solutions Limited',
    period: 'Jan 2024 – Present',
    location: 'India',
    highlights: [
      'Architected Assembly OEE application monitoring 8 production lines in real-time',
      'Built Supplier Connect Portal managing 1,000+ supplier records, reducing manual coordination by 40%',
      'Deployed Performance Index tracking 10+ KPIs with 30% faster data retrieval',
      'Mentored junior developers on Spring Boot best practices',
    ],
  },
  {
    role: 'Research Trainee',
    company: 'DRDO - Institute for Systems Studies & Analyses',
    period: 'Jul 2022 – Aug 2022',
    location: 'New Delhi, India',
    highlights: [
      'Designed Activity Diary web application improving task tracking efficiency by 50%',
      'Established full CRUD functionality supporting 100+ activity entries per user',
      'Leveraged AJAX for asynchronous operations enhancing user experience',
    ],
  },
];

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
  isLeft: boolean;
}

function ExperienceCard({ experience, index, isLeft }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, rotateY: isLeft ? -90 : 90 },
        {
          opacity: 1,
          rotateY: 0,
          duration: 0.7,
          delay: index * 0.3 + 0.2,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index, isLeft]);

  return (
    <div
      ref={cardRef}
      className={`relative bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 opacity-0 ${
        isLeft ? 'lg:mr-auto' : 'lg:ml-auto'
      }`}
      style={{
        maxWidth: '500px',
        transformStyle: 'preserve-3d',
        transform: isLeft ? 'perspective(1000px) rotateY(-3deg)' : 'perspective(1000px) rotateY(3deg)',
      }}
    >
      {/* Timeline Node */}
      <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary-blue rounded-full shadow-glow z-10"
        style={{ [isLeft ? 'right' : 'left']: '-42px' }}
      />

      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl bg-primary-blue/10 flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-7 h-7 text-primary-blue" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-semibold text-text-black">
            {experience.role}
          </h3>
          <p className="text-primary-blue font-medium">{experience.company}</p>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm text-text-grey">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{experience.period}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{experience.location}</span>
        </div>
      </div>

      {/* Highlights */}
      <ul className="space-y-3">
        {experience.highlights.map((highlight, i) => (
          <li key={i} className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-primary-blue flex-shrink-0 mt-0.5" />
            <span className="text-text-dark text-sm leading-relaxed">{highlight}</span>
          </li>
        ))}
      </ul>

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent hover:border-primary-blue/30 transition-colors duration-300 pointer-events-none" />
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation with character split
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { opacity: 0, y: 20, rotation: () => gsap.utils.random(-10, 10) },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.05,
            stagger: 0.02,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Timeline path draw animation
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingChars = 'Professional Experience'.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
      {char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 lg:py-32 bg-bg-grey overflow-hidden"
    >
      <div className="section-padding max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2
            ref={headingRef}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text-black mb-6"
          >
            {headingChars}
          </h2>
          <p className="text-lg text-text-grey max-w-2xl mx-auto">
            A journey of growth and innovation in enterprise software development.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* SVG Timeline Path */}
          <svg
            className="hidden lg:block absolute left-1/2 top-0 h-full w-4 -translate-x-1/2"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0070a0" />
                <stop offset="50%" stopColor="#1b9cca" />
                <stop offset="100%" stopColor="#0070a0" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d="M 8 0 L 8 100%"
              stroke="url(#timelineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              style={{ height: '100%' }}
            />
          </svg>

          {/* Experience Cards */}
          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`lg:flex ${
                  index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'
                } lg:py-8`}
              >
                <ExperienceCard
                  experience={exp}
                  index={index}
                  isLeft={index % 2 === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-navy/5 rounded-full blur-3xl" />
    </section>
  );
}
