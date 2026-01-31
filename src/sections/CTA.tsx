import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Download, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background gradient reveal
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'smooth',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Heading scale + glow
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          delay: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Subheading fade up
      gsap.fromTo(
        subheadingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.5,
          ease: 'smooth',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Buttons pop in
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.querySelectorAll('button');
        gsap.fromTo(
          buttons,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.15,
            delay: 0.7,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden opacity-0"
    >
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0070a0, #1b9cca, #2c90c9, #004968)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 10s ease infinite',
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl" />

      {/* Content */}
      <div className="relative z-10 section-padding max-w-4xl mx-auto text-center">
        <h2
          ref={headingRef}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white mb-6 opacity-0"
        >
          Let's Work Together
        </h2>

        <p
          ref={subheadingRef}
          className="text-xl text-white/80 mb-10 max-w-2xl mx-auto opacity-0"
        >
          Have a project in mind? Let's create something amazing.
          I'm always open to discussing new opportunities.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:ishansomani123@gmail.com"
            className="group inline-flex items-center justify-center gap-3 bg-white text-primary-blue px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            Get In Touch
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            onClick={() => alert('Resume download coming soon!')}
            className="group inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </button>
        </div>

        {/* Contact Info */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/70">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span className="text-sm">ishansomani123@gmail.com</span>
          </div>
        </div>
      </div>
    </section>
  );
}
