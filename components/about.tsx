"use client";

import { useEffect, useState } from "react";
import { site as fallbackSite } from "@/data/site";
import { getSiteSettings } from "@/lib/sanity";
import { motion } from "framer-motion";

export function About() {
  const [site, setSite] = useState(fallbackSite);

  useEffect(() => {
    getSiteSettings().then((data) => {
      if (data) setSite(data as any);
    });
  }, []);

  return (
    <section id="about" className="section bg-[#111114] py-20 border-y border-[#222228]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12 items-start">
          {/* Left - Title + Photo from Sanity */}
          <div className="md:col-span-5">
            <div className="sticky top-24">
              <div className="text-[#00F0FF] text-xs tracking-[3px] font-mono mb-3">CHAPTER 01</div>
              <h2 className="text-5xl md:text-6xl font-semibold tracking-[-1px] leading-[1.1] mb-8">
                {site.about.title}
              </h2>

              {/* Profile Photo from Sanity */}
              <div className="aspect-[4/3] bg-[#1A1A20] rounded-2xl border border-[#222228] overflow-hidden mb-6">
                {site.about.aboutPhoto ? (
                  <img 
                    src={site.about.aboutPhoto} 
                    alt="프로필 사진" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#71717A]">
                    <div className="text-center">
                      <div className="text-sm tracking-widest mb-2">프로필 사진</div>
                      <div className="text-xs">관리자에서 사진 업로드</div>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-[#71717A]">관리자 페이지 → 사이트 설정 → 어바웃 섹션에서 사진 교체</p>
            </div>
          </div>

          {/* Right - Bio */}
          <div className="md:col-span-7 space-y-8 text-lg leading-relaxed text-[#C4C4C8]">
            <p className="text-base md:text-lg whitespace-pre-line">{site.about.intro}</p>
            <p className="text-[#E8D5A3] font-medium tracking-[-0.2px] whitespace-pre-line text-base md:text-lg">
              {site.about.philosophy}
            </p>

            {/* Tools */}
            <div className="pt-6">
              <div className="uppercase tracking-[2px] text-xs text-[#71717A] mb-4">주요 사용 툴 &amp; 워크플로우</div>
              <div className="flex flex-wrap gap-2">
                {site.about.tools.map((tool) => (
                  <span key={tool} className="px-5 py-2 bg-[#1A1A20] rounded-full text-sm border border-[#33333A]">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#222228]">
              {site.about.stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tighter tabular-nums text-white">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-[#A1A1AA] text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
