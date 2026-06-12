"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Play, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { WorkCard } from "./work-card";
import { WorkModal } from "./work-modal";
import { categories, categoryLabels, Work, WorkCategory, WorkVideo } from "@/data/works";
import type { SiteConfig } from "@/data/site";
import { getWorks } from "@/lib/sanity";

interface WorksSectionProps {
  site: SiteConfig;
}

const VISIBLE_WORKS_STEP = 8;

function getEmbedUrl(videoUrl: string) {
  if (videoUrl.includes("/embed/")) return videoUrl;

  const youtubeMatch = videoUrl.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?rel=0&modestbranding=1&playsinline=1`;
  }

  if (videoUrl.includes("vimeo.com")) {
    return videoUrl.replace("vimeo.com/", "player.vimeo.com/video/");
  }

  return videoUrl;
}

function getWorkCategories(work: Work) {
  return work.categories?.length ? work.categories : [work.category];
}

function getPrimaryCategoryLabel(work: Work) {
  const primary = getWorkCategories(work)[0];
  return categoryLabels[primary] || primary;
}

function getVideoCount(work: Work) {
  return (work.videoUrl ? 1 : 0) + (work.videos?.filter((video) => video.videoUrl).length || 0);
}

function getWorkVideos(work: Work): WorkVideo[] {
  const allVideos: WorkVideo[] = [];

  if (work.videoUrl) {
    allVideos.push({
      title: work.mainVideoTitle || "메인 영상",
      videoUrl: work.videoUrl,
      duration: work.duration,
      thumbnail: work.thumbnail,
    });
  }

  work.videos?.forEach((video, index) => {
    if (!video.videoUrl) return;

    allVideos.push({
      title: video.title || `VER.${index + 2}`,
      videoUrl: video.videoUrl,
      duration: video.duration || work.duration,
      thumbnail: video.thumbnail || work.thumbnail,
    });
  });

  return allVideos;
}

export function WorksSection({ site }: WorksSectionProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof categories)[number]>("All");
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(VISIBLE_WORKS_STEP);
  const [expandedWorkId, setExpandedWorkId] = useState<string | number | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const data = await getWorks();
        setWorks(data || []);
      } catch (error) {
        console.error("Sanity fetch error, falling back to empty", error);
        setWorks([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  useEffect(() => {
    setVisibleCount(VISIBLE_WORKS_STEP);
    setExpandedWorkId(null);
    setActiveVideoIndex(0);
  }, [activeFilter]);

  const filteredWorks =
    activeFilter === "All"
      ? works
      : works.filter((work) => getWorkCategories(work).includes(activeFilter as WorkCategory));

  const featuredSource = works.some((work) => work.featured)
    ? works.filter((work) => work.featured)
    : works;
  const featuredWorks = featuredSource.slice(0, 4);
  const mainFeaturedWork = featuredWorks[0];
  const sideFeaturedWorks = featuredWorks.slice(1, 4);
  const visibleWorks = filteredWorks.slice(0, visibleCount);
  const remainingWorks = Math.max(filteredWorks.length - visibleWorks.length, 0);

  const openModal = (work: Work) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedWork(null), 300);
  };

  return (
    <section id="works" className="section mx-auto max-w-7xl px-6 pb-24 pt-20">
      <div className="mb-20">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <div className="mb-2 font-mono text-xs tracking-[3px] text-[#00F0FF]">
              {site.worksFeaturedLabel || "SELECTED WORK"}
            </div>
            <h2 className="text-4xl font-semibold leading-[1.1] tracking-[-1px] sm:text-5xl md:text-6xl">
              {site.worksFeaturedTitle || "Featured Works"}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => document.getElementById("all-works")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="hidden items-center gap-2 rounded-full border border-[#33333A] px-5 py-2.5 text-sm font-semibold text-[#F8F8FA] transition hover:border-[#00F0FF] hover:text-[#00F0FF] md:inline-flex"
          >
            전체 작품 보기
            <ArrowRight size={16} />
          </button>
        </div>

        {mainFeaturedWork && (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
            <motion.button
              type="button"
              onClick={() => openModal(mainFeaturedWork)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative min-h-[420px] overflow-hidden rounded-[8px] border border-[#222228] bg-[#111114] text-left transition hover:border-[#00F0FF]"
            >
              {mainFeaturedWork.thumbnail ? (
                <img
                  src={mainFeaturedWork.thumbnail}
                  alt={mainFeaturedWork.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0 bg-[#16161C]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="badge border-none bg-black/60 text-[10px] backdrop-blur">
                    {getPrimaryCategoryLabel(mainFeaturedWork)}
                  </span>
                  {getVideoCount(mainFeaturedWork) > 1 && (
                    <span className="badge border-none bg-black/60 text-[10px] backdrop-blur">
                      {getVideoCount(mainFeaturedWork)}개 영상
                    </span>
                  )}
                </div>
                <h3 className="max-w-2xl text-3xl font-semibold leading-[1.12] tracking-[-0.6px] text-white sm:text-4xl">
                  {mainFeaturedWork.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#D4D4D8] sm:text-base">
                  {mainFeaturedWork.shortDesc}
                </p>
                <div className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-[#00F0FF]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00F0FF] text-black">
                    <Play size={16} fill="currentColor" />
                  </span>
                  대표 작품 보기
                </div>
              </div>
            </motion.button>

            <div className="grid gap-4">
              {sideFeaturedWorks.map((work, index) => (
                <motion.button
                  key={work.id}
                  type="button"
                  onClick={() => openModal(work)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(index * 0.04, 0.12) }}
                  className="group grid grid-cols-[118px_minmax(0,1fr)] gap-4 rounded-[8px] border border-[#222228] bg-[#111114] p-3 text-left transition hover:border-[#00F0FF] hover:bg-[#16161C] sm:grid-cols-[150px_minmax(0,1fr)]"
                >
                  <div className="relative aspect-video overflow-hidden rounded-[6px] bg-black">
                    {work.thumbnail ? (
                      <img
                        src={work.thumbnail}
                        alt={work.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="h-full w-full bg-[#1A1A20]" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/25 group-hover:opacity-100">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                        <Play size={14} fill="currentColor" />
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 py-1">
                    <div className="mb-2 text-[10px] font-semibold text-[#00F0FF]">
                      {getPrimaryCategoryLabel(work)}
                    </div>
                    <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-white sm:text-base">
                      {work.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#A1A1AA]">
                      {work.shortDesc}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div id="all-works">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 font-mono text-xs tracking-[3px] text-[#A78BFA]">
              {site.worksAllLabel || "PORTFOLIO"}
            </div>
            <h2 className="text-3xl font-semibold leading-[1.15] tracking-[-0.8px] sm:text-4xl md:text-5xl">
              {site.worksAllTitle || "All Works"}
            </h2>
          </div>
          <p className="max-w-xs text-sm text-[#A1A1AA]">
            {works.length}개의 작품 · {site.worksIntro || "클릭하면 작품 설명과 영상을 펼쳐서 볼 수 있습니다."}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={`filter-pill ${activeFilter === category ? "active" : ""}`}
            >
              {categoryLabels[category] || category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {visibleWorks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: Math.min(index * 0.015, 0.2) }}
              >
                <WorkCard
                  work={work}
                  onClick={() => {
                    if (expandedWorkId === work.id) {
                      setExpandedWorkId(null);
                      setActiveVideoIndex(0);
                    } else {
                      setExpandedWorkId(work.id);
                      setActiveVideoIndex(0);
                    }
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {remainingWorks > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + VISIBLE_WORKS_STEP)}
              className="group inline-flex items-center gap-3 rounded-full border border-[#33333A] bg-[#14141A] px-6 py-3 text-sm font-semibold text-white transition hover:border-[#00F0FF] hover:bg-[#1A1A20]"
            >
              더보기
              <span className="rounded-full bg-black/50 px-2.5 py-1 text-xs text-[#A1A1AA] transition group-hover:text-white">
                {remainingWorks}개 남음
              </span>
            </button>
          </div>
        )}

        {expandedWorkId &&
          (() => {
            const expandedWork = works.find((work) => work.id === expandedWorkId);
            if (!expandedWork) return null;

            const expandedWorkCategories = getWorkCategories(expandedWork);
            const isExpandedShortForm = expandedWorkCategories.includes("Reel");
            const allVideos = getWorkVideos(expandedWork);
            const currentVideo = allVideos[activeVideoIndex] || allVideos[0];
            if (!currentVideo) return null;

            const isDirectVideo =
              currentVideo.videoUrl.endsWith(".mp4") || currentVideo.videoUrl.includes("commondatastorage");

            return (
              <div className="mt-6 rounded-2xl border border-[#222228] bg-[#111114] p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-1 text-xs tracking-[2px] text-[#00F0FF]">PROJECT DETAILS</div>
                    <h3 className="text-2xl font-semibold">{expandedWork.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setExpandedWorkId(null);
                      setActiveVideoIndex(0);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#33333A] text-[#A1A1AA] transition hover:border-[#00F0FF] hover:text-white"
                    aria-label="닫기"
                  >
                    <X size={16} />
                  </button>
                </div>

                <p className="mb-6 whitespace-pre-line leading-relaxed text-[#C4C4C8]">
                  {expandedWork.description}
                </p>

                <div className="mb-6">
                  <div className="modal-video-wrapper mb-3 overflow-hidden rounded-xl bg-black">
                    {isDirectVideo ? (
                      <video
                        src={currentVideo.videoUrl}
                        controls
                        autoPlay
                        playsInline
                        className="h-full w-full bg-black object-contain"
                      />
                    ) : (
                      <iframe
                        src={getEmbedUrl(currentVideo.videoUrl)}
                        title={currentVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full border-0"
                      />
                    )}
                  </div>
                  <div className="text-sm text-[#A1A1AA]">
                    {currentVideo.title} {currentVideo.duration && `· ${currentVideo.duration}`}
                  </div>
                </div>

                {allVideos.length > 1 && (
                  <div>
                    <div className="mb-3 text-xs tracking-[2px] text-[#71717A]">
                      이 작업물의 다른 영상 ({allVideos.length}개)
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {allVideos.map((video, index) => (
                        <button
                          key={`${video.videoUrl}-${index}`}
                          type="button"
                          onClick={() => setActiveVideoIndex(index)}
                          className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                            index === activeVideoIndex
                              ? "border-[#00F0FF] bg-[#1A1A20]"
                              : "border-[#222228] hover:border-[#33333A] hover:bg-[#1A1A20]"
                          }`}
                        >
                          <div className="h-9 w-16 flex-shrink-0 overflow-hidden rounded bg-black">
                            {video.thumbnail ? (
                              <img
                                src={video.thumbnail}
                                alt=""
                                className={`h-full w-full ${isExpandedShortForm ? "object-contain" : "object-cover"}`}
                              />
                            ) : expandedWork.thumbnail ? (
                              <img
                                src={expandedWork.thumbnail}
                                alt=""
                                className={`h-full w-full ${isExpandedShortForm ? "object-contain" : "object-cover"}`}
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[10px] text-[#555]">
                                No thumb
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium">{video.title}</div>
                            {video.duration && <div className="text-xs text-[#71717A]">{video.duration}</div>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

        {filteredWorks.length === 0 && !loading && (
          <p className="py-12 text-center text-[#71717A]">
            해당 분류의 작품이 없습니다. 관리자에서 작품을 Publish했는지 확인해주세요.
          </p>
        )}

        {loading && <p className="py-12 text-center text-sm text-[#71717A]">작품 불러오는 중...</p>}
      </div>

      <WorkModal work={selectedWork} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}
