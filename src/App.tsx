import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import LogoStream from './sections/LogoStream';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize GSAP defaults
    gsap.defaults({
      ease: 'power3.out',
      duration: 1,
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative bg-bg-grey min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Logo Stream */}
        <LogoStream />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Experience Section */}
        <Experience />

        {/* Projects Section */}
        <Projects />

        {/* CTA Section */}
        <CTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Speed Insights */}
      <SpeedInsights />
    </div>
  );
}

export default App;
