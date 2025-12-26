import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SkillsSection } from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import { ContactSection } from "@/components/ContactSection";
import parchmentTextureT from '@/assets/parchment-textureT.jpg';
import parchmentTextureM from '@/assets/parchment-textureM.jpg';
import parchmentTextureB from '@/assets/parchment-textureB.jpg';

const Index = () => {
  return (
    <div className="bg-background">
      <Navigation />
      <main>
        <div className="relative z-20">
          <HeroSection />
        </div>

        {/* The rest of the page with the parchment texture */}
        <div
          className="relative -mt-24"
          style={{
            backgroundImage: `url(${parchmentTextureT}), url(${parchmentTextureB}), url(${parchmentTextureM})`,
            backgroundPosition: 'center top, center bottom, center top',
            backgroundRepeat: 'no-repeat, no-repeat, repeat-y',
            backgroundSize: '100% auto, 100% auto, 100% auto',
            backgroundAttachment: 'scroll',
          }}
        >
          {/* Overlay for better text readability on parchment */}
          <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 pt-24">
            <AboutSection />
            <ExperienceSection />
            <SkillsSection />
            <CertificationsSection />
            <ContactSection />

            {/* Footer */}
            <footer className="py-8 text-center border-t border-border/50">
              <p className="font-body text-sm text-muted-foreground">
                © {new Date().getFullYear()} The Burnt Letter. Crafted with care and nostalgia.
              </p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;