import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { cn } from "../lib/utils";
import { Card, CardContent } from "./card";
import {
  Calendar,
  PhoneCall,
  CheckCircle,
  Users,
  Target,
  BarChart,
  Zap,
  Award,
} from "lucide-react";

export interface TimelineEvent {
  id?: string;
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode | string;
  details?: string[];
  color?: string;
}

export interface ScrollTimelineProps {
  events: TimelineEvent[];
  title?: string;
  subtitle?: string;
  animationOrder?: "sequential" | "staggered" | "simultaneous";
  cardAlignment?: "alternating" | "left" | "right";
  lineColor?: string;
  activeColor?: string;
  progressIndicator?: boolean;
  cardVariant?: "default" | "elevated" | "outlined" | "filled";
  cardEffect?: "none" | "glow" | "shadow" | "bounce";
  parallaxIntensity?: number;
  progressLineWidth?: number;
  progressLineCap?: "round" | "square";
  dateFormat?: "text" | "badge";
  className?: string;
  revealAnimation?: "fade" | "slide" | "scale" | "flip" | "none";
  connectorStyle?: "dots" | "line" | "dashed";
  perspective?: boolean;
  darkMode?: boolean;
  smoothScroll?: boolean;
  showNumberBadge?: boolean;
  showDetailsList?: boolean;
}

const DEFAULT_EVENTS: TimelineEvent[] = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We start with a deep dive into your business, goals, challenges, and vision. Understanding you is our first priority.",
    details: ["Business Analysis", "Goal Setting", "Competitor Research"],
    icon: "call",
  },
  {
    number: "02",
    title: "Strategy Development",
    description:
      "Based on our discovery, we craft a comprehensive strategy tailored to your unique needs and objectives.",
    details: ["Market Research", "Strategy Planning", "Timeline Creation"],
    icon: "target",
  },
  {
    number: "03",
    title: "Implementation",
    description:
      "Our team executes the strategy with precision, keeping you informed every step of the way.",
    details: ["Project Management", "Quality Assurance", "Regular Updates"],
    icon: "zap",
  },
];

const getIconComponent = (
  iconName?: string,
  defaultIcon?: React.ReactNode
): React.ReactNode => {
  if (!iconName && defaultIcon) return defaultIcon;

  const iconMap: Record<string, React.ReactNode> = {
    call: <PhoneCall className="h-5 w-5" />,
    check: <CheckCircle className="h-5 w-5" />,
    users: <Users className="h-5 w-5" />,
    target: <Target className="h-5 w-5" />,
    chart: <BarChart className="h-5 w-5" />,
    zap: <Zap className="h-5 w-5" />,
    award: <Award className="h-5 w-5" />,
    calendar: <Calendar className="h-5 w-5" />,
  };

  return (
    iconMap[iconName?.toLowerCase() || ""] ||
    defaultIcon || <PhoneCall className="h-5 w-5" />
  );
};

export const ScrollTimeline = ({
  events = DEFAULT_EVENTS,
  title = "Our Process",
  subtitle = "Step-by-step journey to success",
  animationOrder = "sequential",
  cardAlignment = "alternating",
  lineColor = "bg-[#050608]",
  activeColor = "#00f7ff",
  progressIndicator = true,
  cardVariant = "default",
  cardEffect = "glow",
  parallaxIntensity = 0.18,
  progressLineWidth = 3,
  progressLineCap = "round",
  dateFormat = "badge",
  revealAnimation = "fade",
  className = "",
  connectorStyle = "line",
  perspective = false,
  darkMode = true,
  smoothScroll = true,
  showNumberBadge = true,
  showDetailsList = true,
}: ScrollTimelineProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const newIndex = Math.floor(v * events.length);
      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < events.length
      ) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, events.length, activeIndex]);

  const getCardVariants = (index: number) => {
    const baseDelay =
      animationOrder === "simultaneous"
        ? 0
        : animationOrder === "staggered"
        ? index * 0.2
        : index * 0.3;

    const initialStates = {
      fade: { opacity: 0, y: 20 },
      slide: {
        x:
          cardAlignment === "left"
            ? -100
            : cardAlignment === "right"
            ? 100
            : index % 2 === 0
            ? -100
            : 100,
        opacity: 0,
      },
      scale: { scale: 0.8, opacity: 0 },
      flip: { rotateY: 90, opacity: 0 },
      none: { opacity: 1 },
    };

    return {
      initial: initialStates[revealAnimation],
      whileInView: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateY: 0,
        transition: {
          duration: 0.7,
          delay: baseDelay,
          ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
        },
      },
      viewport: { once: false, margin: "-100px" },
    };
  };

  const getConnectorClasses = () => {
    const baseClasses = cn(
      "absolute left-1/2 transform -translate-x-1/2",
      lineColor
    );
    const widthStyle = `w-[${progressLineWidth}px]`;
    switch (connectorStyle) {
      case "dots":
        return cn(baseClasses, "w-1 rounded-full");
      case "dashed":
        return cn(
          baseClasses,
          widthStyle,
          "[mask-image:linear-gradient(to_bottom,black_33%,transparent_33%,transparent_66%,black_66%)] [mask-size:1px_12px]"
        );
      case "line":
      default:
        return cn(baseClasses, widthStyle);
    }
  };

  const getCardClasses = (index: number) => {
    const baseClasses =
      "relative z-30 rounded-2xl transition-all duration-300 backdrop-blur-xl";
    const variantClasses = {
      default:
        "bg-white/5 border border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.9)]",
      elevated:
        "bg-white/7 border border-white/15 shadow-[0_25px_55px_rgba(0,0,0,0.95)]",
      outlined:
        "bg-white/5 border border-[#00f7ff]/40 shadow-[0_0_40px_rgba(0,247,255,0.25)]",
      filled:
        "bg-gradient-to-br from-white/20 via-white/5 to-transparent border border-[#00f7ff]/40",
    };
    const effectClasses = {
      none: "",
      glow: "hover:shadow-[0_0_40px_rgba(0,247,255,0.55)]",
      shadow: "hover:shadow-2xl hover:-translate-y-1.5",
      bounce: "hover:scale-[1.03] hover:shadow-xl active:scale-[0.97]",
    };
    const alignmentClassesDesktop =
      cardAlignment === "alternating"
        ? index % 2 === 0
          ? "lg:mr-[calc(50%+20px)]"
          : "lg:ml-[calc(50%+20px)]"
        : cardAlignment === "left"
        ? "lg:mr-auto lg:ml-0"
        : "lg:ml-auto lg:mr-0";

    return cn(
      baseClasses,
      variantClasses[cardVariant],
      effectClasses[cardEffect],
      alignmentClassesDesktop,
      "w-full lg:w-[calc(50%-40px)]"
    );
  };

  return (
    <div
      ref={scrollRef}
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        "bg-black text-white", // PURE BLACK BACKGROUND
        className
      )}
    >
      <div className="relative z-10 text-center py-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4
          bg-gradient-to-r from-[#00f7ff] via-[#6a5bff] to-[#ff4fd8]
          bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pb-24 z-10">
        <div className="relative mx-auto">
          <div
            className={cn(getConnectorClasses(), "h-full absolute top-0 z-0")}
          ></div>

          {progressIndicator && (
            <>
              <motion.div
                className="absolute top-0 z-10"
                style={{
                  height: progressHeight,
                  width: progressLineWidth,
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius:
                    progressLineCap === "round" ? "9999px" : "0px",
                  background:
                    "linear-gradient(to bottom,#00f7ff,#6a5bff,#ff4fd8)",
                  boxShadow: `
                    0 0 25px rgba(0,247,255,0.9),
                    0 0 45px rgba(0,247,255,0.7),
                    0 0 70px rgba(255,79,216,0.4)
                  `,
                }}
              />
              <motion.div
                className="absolute z-20"
                style={{
                  top: progressHeight,
                  left: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                }}
              >
                <motion.div
                  className="w-6 h-6 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, #ffffff 0%, #00f7ff 30%, #6a5bff 60%, rgba(255,79,216,0) 90%)",
                    boxShadow: `
                      0 0 20px 8px rgba(0,247,255,0.9),
                      0 0 40px 16px rgba(106,91,255,0.6),
                      0 0 60px 24px rgba(255,79,216,0.35)
                    `,
                    border: "1px solid rgba(255, 255, 255, 0.8)",
                  }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </>
          )}

          <div className="relative z-20">
            {events.map((event, index) => {
              const yOffset = useTransform(
                smoothProgress,
                [0, 1],
                [parallaxIntensity * 100, -parallaxIntensity * 100]
              );
              return (
                <div
                  key={event.id || index}
                  ref={(el) => {
                    timelineRefs.current[index] = el;
                  }}
                  className={cn(
                    "relative flex items-center mb-20 py-4",
                    "flex-col lg:flex-row",
                    cardAlignment === "alternating"
                      ? index % 2 === 0
                        ? "lg:justify-start"
                        : "lg:flex-row-reverse lg:justify-start"
                      : cardAlignment === "left"
                      ? "lg:justify-start"
                      : "lg:flex-row-reverse lg:justify-start"
                  )}
                >
                  {/* badge: mobile top, desktop centered */}
                  <div
                    className={cn(
                      "absolute z-40",
                      "top-0 left-1/2 -translate-x-1/2",
                      "lg:top-1/2 lg:-translate-y-1/2"
                    )}
                  >
                    <div className="relative">
                      <motion.div
                        className={cn(
                          "w-12 h-12 rounded-full border-4 bg-black flex items-center justify-center text-lg font-bold transition-all duration-300",
                          index <= activeIndex
                            ? "border-[#00f7ff] text-[#00f7ff] shadow-[0_0_20px_rgba(0,247,255,0.8)]"
                            : "border-zinc-700 text-zinc-500"
                        )}
                        animate={
                          index <= activeIndex
                            ? {
                                scale: [1, 1.1, 1],
                                boxShadow: [
                                  "0 0 0px rgba(0,247,255,0)",
                                  "0 0 25px rgba(0,247,255,0.9)",
                                  "0 0 0px rgba(0,247,255,0)",
                                ],
                              }
                            : {}
                        }
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          repeatDelay: 4,
                          ease: "easeInOut",
                        }}
                      >
                        {event.number}
                      </motion.div>
                      {showNumberBadge && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#00f7ff] via-[#6a5bff] to-[#ff4fd8] text-black text-xs flex items-center justify-center font-bold shadow-[0_0_10px_rgba(0,247,255,0.9)]">
                          {index + 1}
                        </div>
                      )}
                    </div>
                  </div>

                  <motion.div
                    className={cn(
                      getCardClasses(index),
                      "mt-14 lg:mt-16"
                    )}
                    variants={getCardVariants(index)}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: false, margin: "-100px" }}
                    style={parallaxIntensity > 0 ? { y: yOffset } : undefined}
                  >
                    <Card className="bg-transparent border-none h-full">
                      <CardContent className="p-6 md:pn-7">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div
                              className={cn(
                                "p-3 rounded-xl border transition-all duration-300",
                                index <= activeIndex
                                  ? "bg-[#00f7ff]/10 text-[#00f7ff] border-[#00f7ff]/40 shadow-[0_0_20px_rgba(0,247,255,0.5)]"
                                  : "bg-zinc-900/80 text-zinc-400 border-zinc-700"
                              )}
                            >
                              {getIconComponent(
                                typeof event.icon === "string"
                                  ? event.icon
                                  : undefined,
                                event.icon
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-[#00f7ff]">
                                  {event.number}
                                </span>
                                <span className="text-sm text-zinc-600">•</span>
                                <span className="text-sm text-zinc-400 font-medium">
                                  Step {index + 1}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-white">
                                {event.title}
                              </h3>
                            </div>
                          </div>

                          <p className="text-zinc-300 leading-relaxed">
                            {event.description}
                          </p>

                          {showDetailsList &&
                            event.details &&
                            event.details.length > 0 && (
                              <div className="pt-4 border-t border-zinc-800/80">
                                <p className="text-sm font-semibold text-zinc-400 mb-2">
                                  Key Activities:
                                </p>
                                <ul className="space-y-2">
                                  {event.details.map(
                                    (detail, detailIndex) => (
                                      <li
                                        key={detailIndex}
                                        className="flex items-start gap-2"
                                      >
                                        <CheckCircle className="h-4 w-4 text-[#00f7ff] mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-zinc-200">
                                          {detail}
                                        </span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                          {event.subtitle && (
                            <div className="pt-3 border-t border-zinc-800/80">
                              <p className="text-sm font-medium text-[#00f7ff]">
                                {event.subtitle}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
