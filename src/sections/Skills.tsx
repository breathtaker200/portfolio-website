import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Server,
  Database,
  Smartphone,
  Wrench,
  Layers,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: Skill[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: Code2,
    color: '#0070a0',
    skills: [
      { name: 'Java', level: 95 },
      { name: 'JavaScript', level: 85 },
      { name: 'SQL', level: 90 },
      { name: 'HTML5/CSS3', level: 88 },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    color: '#1b9cca',
    skills: [
      { name: 'Spring Boot', level: 92 },
      { name: 'Spring MVC', level: 88 },
      { name: 'REST APIs', level: 90 },
      { name: 'Microservices', level: 85 },
      { name: 'Apache Kafka', level: 80 },
    ],
  },
  {
    title: 'Frontend',
    icon: Layers,
    color: '#2c90c9',
    skills: [
      { name: 'Angular', level: 88 },
      { name: 'Vue.js', level: 75 },
      { name: 'React', level: 82 },
      { name: 'TypeScript', level: 85 },
    ],
  },
  {
    title: 'Database',
    icon: Database,
    color: '#004968',
    skills: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'Query Optimization', level: 85 },
      { name: 'Indexing', level: 88 },
      { name: 'Performance Tuning', level: 82 },
    ],
  },
  {
    title: 'Mobile',
    icon: Smartphone,
    color: '#66a2cd',
    skills: [
      { name: 'Android', level: 85 },
      { name: 'Flutter', level: 78 },
      { name: 'Firebase', level: 80 },
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    color: '#00577c',
    skills: [
      { name: 'Git/GitHub', level: 90 },
      { name: 'Maven', level: 85 },
      { name: 'IntelliJ IDEA', level: 92 },
      { name: 'Docker', level: 78 },
    ],
  },
];

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

function SkillCard({ category, index }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 100, rotateX: 30 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const Icon = category.icon;

  return (
    <div
      ref={cardRef}
      className="relative bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 opacity-0 group"
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered ? 'translateZ(40px) rotateX(0deg)' : 'rotateX(-3deg)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
          style={{ backgroundColor: category.color }}
        >
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-heading text-xl font-semibold text-text-black">
          {category.title}
        </h3>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        {category.skills.map((skill, skillIndex) => (
          <div key={skillIndex} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-text-dark text-sm font-medium">{skill.name}</span>
              <span className="text-text-grey text-xs">{skill.level}%</span>
            </div>
            <div className="h-2 bg-bg-grey rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: isHovered ? `${skill.level}%` : '0%',
                  backgroundColor: category.color,
                  transitionDelay: `${skillIndex * 100}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 40px ${category.color}30`,
        }}
      />
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { opacity: 0, y: -50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingWords = 'Technical Skills'.split(' ').map((word, i) => (
    <span key={i} className="word inline-block mr-4">
      {word}
    </span>
  ));

  const filteredCategories = activeFilter
    ? skillCategories.filter((cat) => cat.title === activeFilter)
    : skillCategories;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="section-padding max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text-black mb-6"
          >
            {headingWords}
          </h2>
          <p className="text-lg text-text-grey max-w-2xl mx-auto">
            A comprehensive toolkit built over years of hands-on experience in
            enterprise software development.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === null
                ? 'bg-primary-blue text-white shadow-glow'
                : 'bg-bg-grey text-text-grey hover:bg-primary-blue/10 hover:text-primary-blue'
            }`}
          >
            All
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.title}
              onClick={() => setActiveFilter(cat.title)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat.title
                  ? 'bg-primary-blue text-white shadow-glow'
                  : 'bg-bg-grey text-text-grey hover:bg-primary-blue/10 hover:text-primary-blue'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {filteredCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-navy/5 rounded-full blur-3xl" />
    </section>
  );
}
