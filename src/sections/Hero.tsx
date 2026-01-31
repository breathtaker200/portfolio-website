import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Linkedin, Github, Code2, Mail, ChevronDown } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Greeting fade in
      tl.fromTo(
        greetingRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6 },
        0.3
      );

      // Name character animation
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { opacity: 0, rotateX: -90, transformOrigin: 'center bottom' },
          { opacity: 1, rotateX: 0, duration: 0.08, stagger: 0.04, ease: 'back.out(1.7)' },
          0.5
        );
      }

      // Title words animation
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
          0.9
        );
      }

      // Tagline typewriter effect
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        1.2
      );

      // Profile image
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0, rotateY: 45 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
        1.2
      );

      // CTA buttons
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('button');
        tl.fromTo(
          buttons,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' },
          1.5
        );
      }

      // Social icons orbit start
      tl.fromTo(
        socialsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.8
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Floating animation for profile image
  useEffect(() => {
    if (!imageRef.current) return;

    const floatAnimation = gsap.to(imageRef.current, {
      y: -15,
      rotation: 3,
      duration: 5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    return () => {
      floatAnimation.kill();
    };
  }, [imageLoaded]);

  const nameChars = 'Ishan Somani'.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
      {char}
    </span>
  ));

  const titleWords = 'Full-Stack Developer'.split(' ').map((word, i) => (
    <span key={i} className="word inline-block mr-3">
      {word}
    </span>
  ));

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-grey/50 z-[1]" />

      {/* Content */}
      <div className="relative z-10 section-padding w-full max-w-7xl mx-auto py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <span
              ref={greetingRef}
              className="inline-block text-primary-blue text-lg font-medium mb-4 opacity-0"
            >
              Hello, I'm
            </span>

            <h1
              ref={nameRef}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold text-text-black mb-4 leading-tight"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {nameChars}
            </h1>

            <p
              ref={titleRef}
              className="text-2xl sm:text-3xl lg:text-4xl text-text-dark font-medium mb-6"
            >
              {titleWords}
            </p>

            <p
              ref={taglineRef}
              className="text-lg text-text-grey mb-8 max-w-lg mx-auto lg:mx-0 opacity-0"
            >
              Crafting Digital Excellence with Java, Spring Boot & Angular
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-primary flex items-center justify-center gap-2"
              >
                View My Work
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-secondary"
              >
                Get In Touch
              </button>
            </div>

            {/* Social Links */}
            <div ref={socialsRef} className="mt-10 flex justify-center lg:justify-start gap-4 opacity-0">
              {[
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: Code2, href: 'https://leetcode.com', label: 'LeetCode' },
                { icon: Mail, href: 'mailto:ishansomani123@gmail.com', label: 'Email' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white shadow-card flex items-center justify-center text-primary-blue hover:bg-primary-blue hover:text-white hover:shadow-glow transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div
              ref={imageRef}
              className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px] opacity-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-blue via-navy to-light-blue opacity-30 blur-3xl animate-pulse-glow" />

              {/* Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-3d">
                <img
                  src="/profile-hero.jpg"
                  alt="Ishan Somani"
                  className="w-full h-full object-cover"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl px-4 py-2 shadow-card animate-float">
                <span className="text-primary-blue font-semibold">2+ Years</span>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-primary-blue rounded-xl px-4 py-2 shadow-glow animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-white font-semibold">Java Expert</span>
              </div>

              <div className="absolute top-1/2 -right-8 bg-white rounded-xl px-3 py-2 shadow-card animate-float" style={{ animationDelay: '2s' }}>
                <span className="text-text-dark text-sm font-medium">Spring Boot</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary-blue/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-blue rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
