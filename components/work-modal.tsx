"use client";

import { useEffect, useMemo, useState } from "react";
import { Play, X } from "lucide-react";
import { categoryLabels, Work, WorkVideo } from "@/data/works";
import { motion, AnimatePresence } from "framer-motion";

interface WorkModalProps {
  work: Work | null;
  isOpen: boolean;
  onClose: () => void;
}

function getEmbedUrl(videoUrl: string) {
  if (videoUrl.includes("/embed/")) return videoUrl;

  const youtubeMatch = videoUrl.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?rel=0&modestbranding=1&playsinline=1`;
  }

  const vimeoMatch = videoUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return videoUrl;
}

function isEmbeddableVideo(videoUrl: string) {
  return videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") || videoUrl.includes("vimeo.com");
}

function buildVideoList(work: Work): WorkVideo[] {
  const videos: WorkVideo[] = [];

  if (work.videoUrl) {
    videos.push({
      title: work.mainVideoTitle || "메인 영상",
      videoUrl: work.videoUrl,
      duration: work.duration,
      thumbnail: work.thumbnail,
    });
  }

  work.videos?.forEach((video, index) => {
    if (!video.videoUrl) return;

    videos.push({
      title: video.title || `VER.${index + 2}`,
      videoUrl: video.videoUrl,
      duration: video.duration || work.duration,
      thumbnail: video.thumbnail || work.thumbnail,
    });
  });

  return videos;
}

export function WorkModal({ work, isOpen, onClose }: WorkModalProps) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setActiveVideoIndex(0);
  }, [work?.id, isOpen]);

  const allVideos = useMemo(() => (work ? buildVideoList(work) : []), [work]);

  if (!work) return null;

  const currentVideo = allVideos[activeVideoIndex] || allVideos[0];
  const tools = work.tools || [];
  const workCategories = work.categories?.length ? work.categories : [work.category];
  const isShortForm = workCategories.includes("Reel");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="modal-backdrop"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="modal-content relative z-[110] flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
              aria-label="창 닫기"
            >
              <X size={20} />
            </button>

            <div className="modal-video-wrapper flex-shrink-0 bg-black">
              {currentVideo ? (
                isEmbeddableVideo(currentVideo.videoUrl) ? (
                  <iframe
                    key={currentVideo.videoUrl}
                    src={getEmbedUrl(currentVideo.videoUrl)}
                    title={currentVideo.title || work.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                ) : (
                  <video
                    key={currentVideo.videoUrl}
                    src={currentVideo.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-contain bg-black"
                  />
                )
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[#71717A]">
                  등록된 영상이 없습니다.
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {workCategories.map((category) => (
                  <span key={category} className="badge">{categoryLabels[category] || category}</span>
                ))}
                <span className="badge">{work.year}</span>
                {currentVideo?.duration && <span className="badge">{currentVideo.duration}</span>}
              </div>

              <h2 className="mb-3 break-keep break-words text-2xl font-semibold leading-tight tracking-[-1px] sm:text-3xl md:text-4xl">
                {work.title}
              </h2>

              {work.role && (
                <p className="mb-6 text-sm tracking-wide text-[#A1A1AA]">
                  {work.role}
                </p>
              )}

              <div className="mb-8 max-w-none whitespace-pre-line text-[#C4C4C8] leading-relaxed">
                {work.description}
              </div>

              {allVideos.length > 1 && (
                <div className="mb-8">
                  <div className="mb-3 text-xs uppercase tracking-[2px] text-[#71717A]">
                    이 작품의 다른 영상 ({allVideos.length}개)
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
                        <div className="relative h-12 w-20 flex-shrink-0 overflow-hidden rounded bg-black">
                          {video.thumbnail ? (
                            <img
                              src={video.thumbnail}
                              alt=""
                              className={`h-full w-full ${isShortForm ? "object-contain" : "object-cover"}`}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[#71717A]">
                              <Play size={16} />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-white">
                            {video.title || work.title}
                          </div>
                          <div className="mt-1 text-xs text-[#71717A]">
                            {index === activeVideoIndex ? "현재 재생 중" : video.duration || "영상 보기"}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {tools.length > 0 && (
                <div>
                  <div className="mb-3 text-xs uppercase tracking-[2px] text-[#71717A]">
                    사용 도구
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-[#33333A] bg-[#1A1A20] px-4 py-1.5 text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
