"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { categoryLabels, Work } from "@/data/works";
import { motion } from "framer-motion";

interface WorkCardProps {
  work: Work;
  onClick: (work: Work) => void;
  featured?: boolean;
}

export function WorkCard({ work, onClick, featured = false }: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const previewVideoUrl = work.videoUrl || work.videos?.[0]?.videoUrl || "";
  const isDirectVideo = previewVideoUrl.endsWith(".mp4") || previewVideoUrl.includes("commondatastorage");
  const workCategories = work.categories?.length ? work.categories : [work.category];
  const isShortForm = workCategories.includes("Reel");
  const mediaFitClass = isShortForm ? "!object-contain" : "object-cover";

  const handleMouseEnter = () => {
    if (isDirectVideo && videoRef.current) {
      setIsPreviewing(true);
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsPreviewing(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => onClick(work)}
      className={`work-card group cursor-pointer ${featured ? "col-span-1 md:col-span-2" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video / Thumbnail Area */}
      <div className="video-container aspect-video relative">
        {isShortForm && work.thumbnail && (
          <>
            <img
              src={work.thumbnail}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-md"
            />
            <div className="absolute inset-0 bg-black/35" />
          </>
        )}

        {isDirectVideo ? (
          <>
            {work.thumbnail && (
              <img
                src={work.thumbnail}
                alt={work.title}
                className={`absolute inset-0 h-full w-full ${mediaFitClass} transition-opacity duration-150 ${
                  isPreviewing ? "opacity-0" : "opacity-100"
                }`}
              />
            )}
            <video
              ref={videoRef}
              src={previewVideoUrl}
              poster={work.thumbnail}
              muted
              loop
              playsInline
              preload="metadata"
              className={`absolute inset-0 h-full w-full ${mediaFitClass} transition-opacity duration-150 ${
                isPreviewing || !work.thumbnail ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        ) : (
          // Embed / Poster only (YouTube, Vimeo 등)
          work.thumbnail ? (
            <img
              src={work.thumbnail}
              alt={work.title}
              className={`relative h-full w-full ${mediaFitClass}`}
            />
          ) : (
            <div className="w-full h-full bg-[#1A1A20]" />
          )
        )}

        {/* Overlay */}
        <div className="video-overlay">
          <div className="play-icon">
            <Play size={24} className="ml-0.5" />
          </div>
        </div>

        {work.duration && (
          <div className="absolute bottom-3 right-3 badge bg-black/70 text-white border-none text-[10px] px-2 py-0.5">
            {work.duration}
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="badge text-[10px] bg-black/60 backdrop-blur border-none">
            {categoryLabels[workCategories[0]] || workCategories[0]}
            {workCategories.length > 1 ? ` +${workCategories.length - 1}` : ""}
          </span>
        </div>

        {/* Multiple videos indicator */}
        {work.videos && work.videos.length > 0 && (
          <div className="absolute top-3 right-3">
            <span className="badge text-[10px] bg-black/70 border-none">
              {work.videos.length + (work.videoUrl ? 1 : 0)}개 영상
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex h-[96px] flex-col px-4 py-3.5 sm:h-[100px] sm:px-5">
        <div>
          <h3 className="line-clamp-1 text-base font-semibold leading-[1.25] tracking-[-0.2px] break-keep break-words sm:text-[17px]">
            {work.title}
          </h3>
        </div>
        <p className="mt-1.5 line-clamp-2 text-[11px] leading-[1.45] text-[#A1A1AA] break-keep break-words sm:text-xs md:text-xs md:leading-[1.45]">
          {work.shortDesc}
        </p>
      </div>
    </motion.div>
  );
}
