import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experiences from '@/components/Experiences';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import MobileNav from '@/components/MobileNav';

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <MobileNav />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-background focus:font-mono focus:text-sm"
      >
        Skip to content
      </a>
      <main id="main-content" className="bg-background text-foreground">
        <Hero />
        <About />
        <Projects />
        <Experiences />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
