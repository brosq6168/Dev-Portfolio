import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { ParticleBackground } from "@/components/particle-background"
import { Footer } from "@/components/footer"
import { AnimationWrapper } from "@/components/animation-wrapper"
import Script from "next/script"

export default function HomePage() {
  return (
    <>
      {/* Script to detect JavaScript support for progressive enhancement */}
      <Script id="js-detection" strategy="beforeInteractive">
        {`
          // Add js class to html element if JavaScript is enabled
          document.documentElement.classList.remove('no-js');
          document.documentElement.classList.add('js');
        `}
      </Script>

      <main className="relative min-h-screen overflow-hidden">
        <ParticleBackground />
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <AnimationWrapper />
      </main>
      <Footer />
    </>
  )
}
