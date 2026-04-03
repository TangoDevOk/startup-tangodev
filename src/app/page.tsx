'use client';

import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Process';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import Showcase from '@/components/Showcase';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <section id="servicios">
        <Services />
      </section>
      <section id="proyectos">
        <Showcase />
      </section>
      <section id="proceso">
        <Process />
      </section>
      <section id="preguntas">
        <FAQ />
      </section>
      <section id="precios">
        <Pricing />
      </section>
      <CTA />
      <Footer />
    </main>
  );
}
