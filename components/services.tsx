"use client";

import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import type { ComponentType } from "react";
import type { SiteConfig } from "@/data/site";

interface ServicesProps {
  site: SiteConfig;
}

type IconComponent = ComponentType<{ size?: number; className?: string }>;
const iconMap = Icons as unknown as Record<string, IconComponent>;

export function Services({ site }: ServicesProps) {

  return (
    <section id="services" className="section max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <div className="text-[#A78BFA] text-xs tracking-[3px] font-mono mb-3">{site.servicesTag || 'WHAT I OFFER'}</div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-1px] leading-[1.1]">{site.servicesTitle || 'Services'}</h2>
        <p className="mt-4 text-[#A1A1AA] max-w-md mx-auto whitespace-pre-line">
          {site.servicesIntro || 'AI 영상 제작부터 레슨까지. 프로젝트에 가장 적합한 형태로 함께합니다.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {site.services.map((service, index) => {
          const Icon = iconMap[service.icon] || Icons.Film;
          return (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              className="service-card group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1A1A20] flex items-center justify-center mb-6 text-[#00F0FF] group-hover:text-[#A78BFA] transition-colors">
                <Icon size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3">{service.title}</h3>
              <p className="text-[#A1A1AA] leading-relaxed">{service.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 text-center text-sm text-[#71717A]">
        {site.servicesNote || "모든 프로젝트는 맞춤 견적으로 진행됩니다. 구체적인 브리프를 보내주세요."}
      </div>
    </section>
  );
}
