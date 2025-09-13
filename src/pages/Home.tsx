import { HeroSection } from '@/components/HeroSection';
import { TechnologySection } from '@/components/TechnologySection';
import { UseCasesSection } from '@/components/UseCasesSection';
import { CtaSection } from '@/components/CtaSection';
import { Footer } from '@/components/Footer';
import { Layout } from '@/components/Layout';
import { CursorEffect } from '@/components/CursorEffect';
import { ParticleBackground } from '@/components/ParticleBackground';

export default function Home() {
  return (
    <>
      <CursorEffect />
      <ParticleBackground />
      <Layout showNavbar={false}>
        <HeroSection />
        <TechnologySection />
        <UseCasesSection />
        <CtaSection />
        <Footer />
      </Layout>
    </>
  );
}