import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Smartphone, Monitor } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  type: string;
  description: string;
  technologies: string[];
  image: string;
  achievements?: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const projects: Project[] = [
  {
    title: 'TranslateIT',
    type: 'Android Application',
    description: 'Multi-lingual translation app supporting voice and text translation across 57 languages using Firebase ML Kit and Google Translate API.',
    technologies: ['Java', 'XML', 'Firebase ML Kit', 'Google Translate API'],
    image: '/project-translateit.jpg',
    achievements: ['95% translation accuracy', 'Published in Springer'],
    icon: Smartphone,
  },
  {
    title: 'Medical Helpline',
    type: 'Android Application',
    description: 'Emergency healthcare application with SOS alert system and instant access to patient medical documents with location-based services.',
    technologies: ['Java', 'XML', 'Firebase', 'Google Maps API'],
    image: '/project-medical.jpg',
    achievements: ['Real-time medical records', 'Location-based emergency services'],
    icon: Smartphone,
  },
  {
    title: 'Assembly OEE',
    type: 'Web Application',
    description: 'Real-time production monitoring system for 8 production lines calculating Availability, Performance, and Quality metrics.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Apache Kafka'],
    image: '/project-oee.jpg',
    achievements: ['40% efficiency improvement', 'Real-time data processing'],
    icon: Monitor,
  },
  {
    title: 'Supplier Connect Portal',
    type: 'Web Application',
    description: 'Full-stack supplier management system with CRUD operations, reducing manual coordination time by 40%.',
    technologies: ['Java', 'Spring Boot', 'AngularJS', 'PostgreSQL'],
    image: '/project-supplier.jpg',
    achievements: ['1,000+ supplier records', 'Comprehensive RESTful APIs'],
    icon: Monitor,
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = project.icon;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 100, rotateX: 30 },
        {
          opacity: 1,
          y: 0,
          rotateX: index % 2 === 0 ? -5 : 5,
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

  return (
    <div
      ref={cardRef}
      className="relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 opacity-0 group"
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered
          ? 'translateZ(60px) rotateX(0deg) rotateY(0deg) scale(1.02)'
          : `rotateX(${index % 2 === 0 ? '-3deg' : '3deg'})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Type Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary-blue" />
          <span className="text-sm font-medium text-text-dark">{project.type}</span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary-blue/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
          <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary-blue hover:scale-110 transition-transform">
            <ExternalLink className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary-blue hover:scale-110 transition-transform">
            <Github className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-2xl font-semibold text-text-black mb-3 group-hover:text-primary-blue transition-colors">
          {project.title}
        </h3>

        <p className="text-text-grey text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Achievements */}
        {project.achievements && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.achievements.map((achievement, i) => (
              <span
                key={i}
                className="text-xs bg-primary-blue/10 text-primary-blue px-3 py-1 rounded-full font-medium"
              >
                {achievement}
              </span>
            ))}
          </div>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="text-xs bg-bg-grey text-text-grey px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 3D Shadow Layers */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500"
        style={{
          boxShadow: isHovered
            ? '0 20px 60px rgba(0, 112, 160, 0.3), 0 40px 80px rgba(0, 0, 0, 0.15)'
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      />
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading word cascade
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

  const headingWords = 'Featured Projects'.split(' ').map((word, i) => (
    <span key={i} className="word inline-block mr-4">
      {word}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="projects"
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
            A showcase of my work across mobile and web platforms, demonstrating
            expertise in full-stack development.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          className="grid sm:grid-cols-2 gap-8"
          style={{ perspective: '1000px' }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-navy/5 rounded-full blur-3xl" />
    </section>
  );
}
