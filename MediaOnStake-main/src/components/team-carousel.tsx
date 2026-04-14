import React, { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { TargetAndTransition } from "framer-motion";
import { cn } from "../lib/utils";

/* 🔥 THEME COLOR — MATCHES HERO */
const CYAN = "#7CF9FF";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface TeamCarouselProps {
  members: TeamMember[];
  title?: string;
  titleSize?: "sm" | "md" | "lg" | "xl" | "2xl";
  background?: string;
  cardWidth?: number;
  cardHeight?: number;
  showArrows?: boolean;
  showDots?: boolean;
  keyboardNavigation?: boolean;
  touchNavigation?: boolean;
  animationDuration?: number;
  autoPlay?: number;
  pauseOnHover?: boolean;
  visibleCards?: number;
  sideCardScale?: number;
  sideCardOpacity?: number;
  grayscaleEffect?: boolean;
  className?: string;
  cardClassName?: string;
  titleClassName?: string;
  infoPosition?: "bottom" | "overlay" | "none";
  onMemberChange?: (member: TeamMember, index: number) => void;
  onCardClick?: (member: TeamMember, index: number) => void;
  initialIndex?: number;
}

export const TeamCarousel: React.FC<TeamCarouselProps> = ({
  members,
  title = "MEET THE TEAM BEHIND THE GROWTH",
  titleSize = "xl",
  background = "transparent",
  cardWidth = 280,
  cardHeight = 380,
  showArrows = true,
  showDots = true,
  keyboardNavigation = true,
  touchNavigation = true,
  animationDuration = 800,
  autoPlay = 0,
  pauseOnHover = true,
  visibleCards = 2,
  sideCardScale = 0.85,
  sideCardOpacity = 0.6,
  grayscaleEffect = true,
  className,
  cardClassName,
  titleClassName,
  infoPosition = "bottom",
  onMemberChange,
  onCardClick,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(
    Math.max(0, Math.min(initialIndex, members.length - 1))
  );
  const [direction, setDirection] = useState(0);

  const totalMembers = members.length;

  const paginate = useCallback(
    (dir: number) => {
      if (!totalMembers) return;
      setDirection(dir);
      const next = (currentIndex + dir + totalMembers) % totalMembers;
      setCurrentIndex(next);
      onMemberChange?.(members[next], next);
    },
    [currentIndex, totalMembers, members, onMemberChange]
  );

  const getVariant = (pos: string): TargetAndTransition => {
    const t = {
      duration: animationDuration / 1000,
      ease: [0.25, 0.46, 0.45, 0.94],
    };
    switch (pos) {
      case "center":
        return {
          scale: 1.1,
          opacity: 1,
          zIndex: 10,
          x: 0,
          filter: "grayscale(0%)",
          transition: t,
        };
      case "right":
        return {
          scale: sideCardScale,
          opacity: sideCardOpacity,
          x: cardWidth * 0.7,
          filter: grayscaleEffect ? "grayscale(100%)" : "none",
          transition: t,
        };
      case "left":
        return {
          scale: sideCardScale,
          opacity: sideCardOpacity,
          x: -cardWidth * 0.7,
          filter: grayscaleEffect ? "grayscale(100%)" : "none",
          transition: t,
        };
      default:
        return { opacity: 0, scale: 0.8, transition: t };
    }
  };

  const titleSizes: Record<string, string> = {
    sm: "text-4xl",
    md: "text-5xl",
    lg: "text-6xl",
    xl: "text-7xl",
    "2xl": "text-8xl",
  };

  if (!members.length) return null;

  return (
    <section
      className={cn(
        "min-h-screen flex flex-col items-center justify-center overflow-hidden py-10",
        "bg-black text-white", // CHANGED FROM bg-[#02060f] TO bg-black
        className
      )}
      style={{ background }}
    >
      {/* 🔥 TITLE */}
      <h2
        className={cn(
          "font-black uppercase mb-16 text-center tracking-[0.02em]",
          titleSizes[titleSize],
          titleClassName
        )}
        style={{
          color: "transparent",
          background: `linear-gradient(to bottom, ${CYAN} 20%, ${CYAN}80 80%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          textShadow: `0 0 20px ${CYAN}80`,
        }}
      >
        {title}
      </h2>

      {/* CAROUSEL */}
      <div
        className="relative w-full max-w-6xl"
        style={{ height: cardHeight + 120 }}
      >
        {showArrows && (
          <>
            <button
              onClick={() => paginate(-1)}
              className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 border border-cyan-400/40 hover:border-cyan-400 bg-black/80 hover:bg-cyan-400/20 text-white flex items-center justify-center z-20"
              style={{ boxShadow: `0 0 12px ${CYAN}40` }}
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 border border-cyan-400/40 hover:border-cyan-400 bg-black/80 hover:bg-cyan-400/20 text-white flex items-center justify-center z-20"
              style={{ boxShadow: `0 0 12px ${CYAN}40` }}
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}

        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence>
            {members.map((m, i) => {
              const pos =
                i === currentIndex
                  ? "center"
                  : i === (currentIndex + 1) % totalMembers
                  ? "right"
                  : i === (currentIndex - 1 + totalMembers) % totalMembers
                  ? "left"
                  : "hidden";

              if (pos === "hidden") return null;

              return (
                <motion.div
                  key={m.id}
                  className={cn(
                    "absolute overflow-hidden cursor-pointer",
                    cardClassName
                  )}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    borderRadius: 0,
                    boxShadow:
                      pos === "center" ? `0 0 25px ${CYAN}60` : "none",
                    border:
                      pos === "center"
                        ? `2px solid ${CYAN}`
                        : "2px solid transparent",
                  }}
                  initial="hidden"
                  animate={getVariant(pos)}
                  onClick={() => {
                    setCurrentIndex(i);
                    onCardClick?.(m, i);
                  }}
                >
                  {/* SHARP-EDGED IMAGE */}
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover"
                    style={{ borderRadius: 0 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* 🔥 INFO */}
      {infoPosition === "bottom" && (
        <div className="text-center mt-12">
          <h3
            className="text-4xl font-bold relative inline-block"
            style={{ color: CYAN, textShadow: `0 0 15px ${CYAN}` }}
          >
            {members[currentIndex].name}
            <span
              className="absolute left-0 top-full mt-2 h-1 w-full"
              style={{ background: CYAN, boxShadow: `0 0 15px ${CYAN}` }}
            />
          </h3>
          <p className="mt-4 text-xl uppercase tracking-wider text-muted-foreground">
            {members[currentIndex].role}
          </p>
        </div>
      )}

      {/* 🔥 DOTS */}
      {showDots && (
        <div className="flex gap-3 mt-16">
          {members.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="w-5 h-[3px]"
              style={{
                background: i === currentIndex ? CYAN : `${CYAN}40`,
                boxShadow:
                  i === currentIndex ? `0 0 12px ${CYAN}` : "none",
                borderRadius: 0,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

// Default team members data
TeamCarousel.defaultProps = {
  members: [
    {
      id: "1",
      name: "Alex Johnson",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      bio: "Visionary leader with 10+ years of experience in tech entrepreneurship.",
    },
    {
      id: "2",
      name: "Sarah Williams",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&q=80",
      bio: "Award-winning designer specializing in user experience and brand identity.",
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "Lead Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
      bio: "Full-stack developer passionate about scalable architecture and clean code.",
    },
    {
      id: "4",
      name: "Neha Gupta",
      role: "Backend Engineer",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
      bio: "Backend engineer skilled in APIs, databases, and scalable server-side architectures.",
    },
    {
      id: "5",
      name: "David Rodriguez",
      role: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
      bio: "Product strategist focused on market research and user-centric product development.",
    },
    {
      id: "6",
      name: "Emma Wilson",
      role: "UX Researcher",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
      bio: "Dedicated to understanding user behavior and creating intuitive digital experiences.",
    },
  ],
};

export default TeamCarousel;