import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, TrendingUp, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  delay: number;
}

function StatCard({ value, label, icon: Icon, delay }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, rotateY: -90 },
        {
          opacity: 1,
          rotateY: 0,
          duration: 0.6,
          delay,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Counter animation
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(
            { val: 0 },
            {
              val: numericValue,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function () {
                setCount(Math.floor(this.targets()[0].val));
              },
            }
          );
        },
        once: true,
      });
    }, cardRef);

    return () => ctx.revert();
  }, [delay, numericValue]);

  return (
    <div
      ref={cardRef}
      className="relative bg-gradient-to-br from-primary-blue to-navy rounded-xl p-6 text-white shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300 cursor-default opacity-0"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Icon className="w-8 h-8 mb-4 opacity-80" />
      <div className="text-4xl font-heading font-bold mb-2">
        {value.includes('%') ? `${count}%` : `${count}+`}
      </div>
      <div className="text-white/80 text-sm">{label}</div>

      {/* Shine effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image slide in
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -100, rotateZ: -5 },
        {
          opacity: 1,
          x: 0,
          rotateZ: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Heading letters stagger
      if (headingRef.current) {
        const letters = headingRef.current.querySelectorAll('.letter');
        gsap.fromTo(
          letters,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: 0.03,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Body text lines
      if (textRef.current) {
        const lines = textRef.current.querySelectorAll('.text-line');
        gsap.fromTo(
          lines,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'smooth',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingLetters = 'About Me'.split('').map((char, i) => (
    <span key={i} className="letter inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
      {char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 lg:py-32 bg-bg-grey overflow-hidden"
    >
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div ref={imageRef} className="relative opacity-0">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Background decoration */}
              <div className="absolute -top-8 -left-8 w-full h-full bg-primary-blue/10 rounded-3xl" />
              <div className="absolute -bottom-8 -right-8 w-full h-full bg-navy/10 rounded-3xl" />

              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-3d">
                <img
                  src="/profile-hero.jpg"
                  alt="Ishan Somani"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-xl px-6 py-3 shadow-card animate-float">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary-blue" />
                  <span className="text-text-dark font-medium">Oracle Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div>
            <h2
              ref={headingRef}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text-black mb-8"
            >
              {headingLetters}
            </h2>

            <div ref={textRef} className="space-y-4 mb-10">
              <p className="text-line text-lg text-text-dark leading-relaxed opacity-0">
                Results-driven Java Full-Stack Developer with 2+ years of experience
                in enterprise application development. I specialize in building scalable
                applications using Java, Spring Boot, Angular, and PostgreSQL.
              </p>
              <p className="text-line text-lg text-text-dark leading-relaxed opacity-0">
                My passion lies in creating efficient solutions that make a real impact—
                like improving operational efficiency by 40% at Yamaha Motor Solutions.
                I thrive in collaborative environments and enjoy mentoring junior developers.
              </p>
              <p className="text-line text-lg text-text-dark leading-relaxed opacity-0">
                With a strong foundation in both backend and frontend technologies,
                I bring a holistic approach to software development, ensuring seamless
                user experiences and robust system architecture.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <StatCard
                value="2+"
                label="Years Experience"
                icon={Clock}
                delay={0.8}
              />
              <StatCard
                value="40%"
                label="Efficiency Improvement"
                icon={TrendingUp}
                delay={0.95}
              />
              <StatCard
                value="50%"
                label="Task Tracking Boost"
                icon={Award}
                delay={1.1}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-navy/5 rounded-full blur-3xl" />
    </section>
  );
}
