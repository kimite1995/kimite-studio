"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Work } from "@/data/works";
import { motion, AnimatePresence } from "framer-motion";

interface WorkModalProps {
  work: Work | null;
  isOpen: boolean;
  onClose: () => void;
}

export function WorkModal({ work, isOpen, onClose }: WorkModalProps) {
  // ESC 키로 닫기
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

  if (!work) return null;

  const isDirectVideo = work.videoUrl.endsWith(".mp4") || work.videoUrl.includes("commondatastorage");
  const isYouTube = work.videoUrl.includes("youtube.com") || work.videoUrl.includes("youtu.be");
  const isVimeo = work.videoUrl.includes("vimeo.com");

  // YouTube embed URL 정규화 (더 안정적인 ID 추출)
  let embedUrl = work.videoUrl;
  if (isYouTube && !work.videoUrl.includes("/embed/")) {
    const getYouTubeId = (url: string): string | null => {
      const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };
    const videoId = getYouTubeId(work.videoUrl);
    if (videoId) {
      embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
    } else {
      // fallback
      embedUrl = work.videoUrl;
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="modal-backdrop"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="modal-content relative w-full max-w-5xl z-[110] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Video Player - fixed aspect, no shrink */}
            <div className="modal-video-wrapper bg-black flex-shrink-0">
              {isDirectVideo ? (
                <video
                  src={work.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full"
                />
              ) : isYouTube || isVimeo ? (
                <iframe
                  src={embedUrl}
                  title={work.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                // Fallback: direct video assumed
                <video
                  src={work.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full"
                />
              )}
            </div>

            {/* Metadata + Description - scrolls if needed */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="badge">{work.category}</span>
                <span className="badge">{work.year}</span>
                <span className="badge">{work.duration}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-1px] leading-tight mb-3 break-keep break-words">
                {work.title}
              </h2>

              {work.role && (
                <p className="text-[#A1A1AA] mb-6 text-sm tracking-wide">
                  {work.role}
                </p>
              )}

              <div className="prose prose-invert max-w-none text-[#C4C4C8] leading-relaxed whitespace-pre-line mb-8">
                {work.description}
              </div>

              {/* Tools */}
              {work.tools.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-[2px] text-[#71717A] mb-3">
                    사용된 툴
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {work.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-4 py-1.5 rounded-full bg-[#1A1A20] text-sm border border-[#33333A]"
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
