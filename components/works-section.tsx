"use client";

import { useState, useEffect } from "react";
import { WorkCard } from "./work-card";
import { WorkModal } from "./work-modal";
import { categories, Work } from "@/data/works"; // types only
import { site } from "@/data/site";
import { motion, AnimatePresence } from "framer-motion";
import { getWorks } from "@/lib/sanity";

export function WorksSection() {
  const [activeFilter, setActiveFilter] = useState<(typeof categories)[number]>("All");
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getWorks();
        setWorks(data || []);
      } catch (e) {
        console.error("Sanity fetch error, falling back to empty", e);
        setWorks([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredWorks = activeFilter === "All" 
    ? works 
    : works.filter((w) => w.category === activeFilter);

  const featuredWorks = works.slice(0, 4); // 상위 4개 대표작 (Sanity에서 가져온 최신순)

  const openModal = (work: Work) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // 모달 닫힌 후 선택 해제 (애니메이션 위해 약간 딜레이)
    setTimeout(() => setSelectedWork(null), 300);
  };

  return (
    <section id="works" className="section max-w-7xl mx-auto px-6 pt-20 pb-24">
      {/* Featured Works */}
      <div className="mb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[#00F0FF] text-xs tracking-[3px] font-mono mb-2">SELECTED WORK</div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-1px] leading-[1.1]">Featured Works</h2>
          </div>
          <button 
            onClick={() => document.getElementById("all-works")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="hidden md:block btn-ghost"
          >
            전체 작품 보기 →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredWorks.map((work, index) => (
            <motion.div
              key={work.id ?? (work as any)._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.03, 0.15) }}
            >
              <WorkCard work={work} onClick={openModal} featured={index === 0} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Works */}
      <div id="all-works">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="text-[#A78BFA] text-xs tracking-[3px] font-mono mb-2">PORTFOLIO</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.8px] leading-[1.15]">All Works</h2>
          </div>
          <p className="text-[#A1A1AA] text-sm max-w-xs">
            {works.length}개의 작품 · 클릭하면 전체 화면으로 재생됩니다
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`filter-pill ${activeFilter === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredWorks.map((work, index) => (
              <motion.div
                key={work.id ?? (work as any)._id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: Math.min(index * 0.015, 0.2) }}
              >
                <WorkCard work={work} onClick={openModal} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredWorks.length === 0 && !loading && (
          <p className="text-center py-12 text-[#71717A]">해당 카테고리의 작품이 없습니다. (Sanity Studio에서 작품을 Publish 했는지, .env.local 프로젝트 ID가 맞는지 확인하세요)</p>
        )}

        {loading && (
          <p className="text-center py-12 text-[#71717A] text-sm">작품 불러오는 중...</p>
        )}
      </div>

      {/* Modal */}
      <WorkModal 
        work={selectedWork} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </section>
  );
}
