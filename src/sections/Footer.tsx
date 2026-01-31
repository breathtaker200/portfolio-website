import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Code2, Mail, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Code2, href: 'https://leetcode.com', label: 'LeetCode' },
  { icon: Mail, href: 'mailto:ishansomani123@gmail.com', label: 'Email' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav links stagger
      if (navRef.current) {
        const links = navRef.current.querySelectorAll('a');
        gsap.fromTo(
          links,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'smooth',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Social icons 3D flip
      if (socialsRef.current) {
        const icons = socialsRef.current.querySelectorAll('a');
        gsap.fromTo(
          icons,
          { opacity: 0, rotateY: 90 },
          {
            opacity: 1,
            rotateY: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.3,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Copyright fade
      gsap.fromTo(
        copyrightRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.6,
          ease: 'smooth',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-text-black text-white py-16 overflow-hidden"
    >
      <div className="section-padding max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center mb-12">
          {/* Name/Brand */}
          <h3 className="font-heading text-3xl font-semibold mb-8">
            Ishan Somani
          </h3>

          {/* Navigation Links */}
          <nav ref={navRef} className="flex flex-wrap justify-center gap-6 mb-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="relative text-white/70 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Social Links */}
          <div ref={socialsRef} className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary-blue hover:text-white hover:scale-110 transition-all duration-300"
                style={{ transformStyle: 'preserve-3d' }}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div
            ref={copyrightRef}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 text-white/50 text-sm opacity-0"
          >
            <p>© 2024 Ishan Somani. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> and code
            </p>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
}
