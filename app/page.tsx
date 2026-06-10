import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { WorksSection } from "@/components/works-section";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { site } from "@/data/site";

export default function KimiteStudioPortfolio() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F8F8FA] selection:bg-[#00F0FF] selection:text-black">
      <Navbar />
      <Hero />

      <WorksSection />

      <About />

      <Services />

      {/* Contact */}
      <section id="contact" className="section bg-[#111114] border-t border-[#222228] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-[#00F0FF] text-xs tracking-[3px] font-mono mb-3">LET&apos;S CREATE TOGETHER</div>
            <h2 className="text-5xl md:text-6xl font-semibold tracking-[-1px] leading-[1.1] mb-4">
              프로젝트를 시작해볼까요?
            </h2>
            <p className="text-[#A1A1AA] max-w-md mx-auto">
              브랜드 필름, 광고, 뮤직비디오, 추모영상, AI 레슨까지.<br />
              원하는 프로젝트를 자세히 알려주세요.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>

          {/* Direct contact info */}
          <div className="text-center mt-12 text-sm text-[#A1A1AA]">
            또는 직접 연락주세요{" "}
            <a href={`mailto:${site.contact.email}`} className="text-white underline hover:no-underline">
              {site.contact.email}
            </a>
            {site.contact.youtube && (
              <>
                {" · "}
                <a 
                  href={site.contact.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white underline hover:no-underline"
                >
                  YouTube
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
