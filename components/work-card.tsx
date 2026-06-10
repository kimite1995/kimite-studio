"use client";

import { useRef } from "react";
import { Play } from "lucide-react";
import { Work } from "@/data/works";
import { motion } from "framer-motion";

interface WorkCardProps {
  work: Work;
  onClick: (work: Work) => void;
  featured?: boolean;
}

export function WorkCard({ work, onClick, featured = false }: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDirectVideo = work.videoUrl.endsWith(".mp4") || work.videoUrl.includes("commondatastorage");

  const handleMouseEnter = () => {
    if (isDirectVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
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
        {isDirectVideo ? (
          <video
            ref={videoRef}
            src={work.videoUrl}
            poster={work.thumbnail}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        ) : (
          // Embed / Poster only (YouTube, Vimeo 등)
          <img
            src={work.thumbnail}
            alt={work.title}
            className="w-full h-full object-cover"
          />
        )}

        {/* Overlay */}
        <div className="video-overlay">
          <div className="play-icon">
            <Play size={24} className="ml-0.5" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 badge bg-black/70 text-white border-none text-[10px] px-2 py-0.5">
          {work.duration}
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="badge text-[10px] bg-black/60 backdrop-blur border-none">
            {work.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-lg leading-tight tracking-[-0.3px] pr-2">
            {work.title}
          </h3>
          <span className="text-xs text-[#A1A1AA] font-mono mt-1 whitespace-nowrap">
            {work.year}
          </span>
        </div>
        <p className="text-[#A1A1AA] text-sm mt-2 line-clamp-2">
          {work.shortDesc}
        </p>
      </div>
    </motion.div>
  );
}
