import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: 'Java', icon: '☕' },
  { name: 'Spring Boot', icon: '🍃' },
  { name: 'Angular', icon: '🅰️' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Kafka', icon: '📊' },
  { name: 'JavaScript', icon: '📜' },
  { name: 'Git', icon: '🔀' },
  { name: 'Docker', icon: '🐳' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'REST API', icon: '🔌' },
  { name: 'Microservices', icon: '🔧' },
  { name: 'Flutter', icon: '📱' },
];

export default function LogoStream() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveal
      gsap.fromTo(
        sectionRef.current,
        { clipPath: 'inset(0 50% 0 50%)' },
        {
          clipPath: 'inset(0 0% 0 0%)',
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Label animation
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, letterSpacing: '0em' },
        {
          opacity: 1,
          letterSpacing: '0.15em',
          duration: 0.6,
          ease: 'smooth',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 bg-bg-grey overflow-hidden"
    >
      {/* Section Label */}
      <p
        ref={labelRef}
        className="text-center text-text-grey text-sm font-medium uppercase tracking-widest mb-8 opacity-0"
      >
        Trusted Technologies
      </p>

      {/* Logo Track Container */}
      <div className="relative">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-grey to-transparent z-10 pointer-events-none" />

        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-grey to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div
          ref={trackRef}
          className="flex animate-slide-infinite"
          style={{ width: 'fit-content' }}
        >
          {/* First set */}
          {[...technologies, ...technologies].map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-3 mx-8 px-6 py-4 bg-white rounded-xl shadow-card hover:shadow-card-hover hover:scale-110 transition-all duration-300 cursor-default group"
            >
              <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-300">
                {tech.icon}
              </span>
              <span className="text-text-dark font-medium whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-navy/5 rounded-full blur-3xl" />
    </section>
  );
}
