import { useRef, useState, useEffect } from "react";
import {
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Sparkles,
  X,
  Globe,
  Loader2,
  Code,
  Zap,
} from "lucide-react";

const portfolioItems = [
  {
    category: "NGO / Social Welfare Website",
    title: "Seva Samarpit Foundation",
    description:
      "Non-profit organization website focused on social service, humanitarian initiatives, community welfare programs, transparency, and donor engagement.",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&auto=format&fit=crop",
    url: "https://www.sevasamarpitfoundation.in/",
    metrics: { impact: "+450%", trust: "+320%", engagement: "+260%" },
    tags: ["HTML", "CSS", "JavaScript", "NGO", "Responsive Design"],
    color: "from-orange-500/10 to-amber-500/10",
  }
  ,{
    category: "Organization Website",
    title: "NHRWWO Official",
    description:
      "Government/NGO website featuring informational pages, mission, welfare programs, image galleries, and announcements.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop",
    url: "https://www.nhrwwo.in/",
    metrics: { awareness: "+500%", trust: "+300%", traffic: "+220%" },
    tags: ["Bootstrap", "PHP", "CMS", "Accessibility"],
    color: "from-emerald-500/10 to-teal-500/10",
  },
  {
    category: "Business Website",
    title: "Ojhaprintingpress",
    description:
      "High-performance stock market and trading analytics platform with secure architecture and modern UI.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop",
    url: "https://ojhaprintingpress.vercel.app/",
    metrics: { performance: "+210%", engagement: "+85%", conversion: "+45%" },
    tags: ["React", "Next.js 14", "TypeScript", "Tailwind"],
    color: "from-blue-500/10 to-cyan-500/10",
  },
  {
    category: "Portfolio Website",
    title: "Anshumesh Saini",
    description:
      "Personal portfolio website showcasing skills, experience, projects, and digital footprint with smooth UX.",
    image:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=1200&auto=format&fit=crop",
    url: "https://anshumeshsaini.me",
    metrics: { engagement: "+450%", retention: "+180%", speed: "99%" },
    tags: ["React", "GSAP", "Three.js", "Framer Motion"],
    color: "from-purple-500/10 to-pink-500/10",
  },
  {
    category: "Community Portal",
    title: "North Indians in UAE",
    description:
      "A modern community web portal providing resources, events, news updates, registration, and contact features.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop",
    url: "https://www.northindiansinuae.com/",
    metrics: { growth: "+380%", interaction: "+240%", satisfaction: "94%" },
    tags: ["Next.js", "Supabase", "Stripe", "Real-time"],
    color: "from-amber-500/10 to-orange-500/10",
  },
];

const glassCard =
  "bg-black border border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.55)] rounded-none"; // sharp edges, black bg[web:60][web:62]

const primaryAccent =
  "bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500";
const primaryAccentText =
  "bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500";

const PortfolioSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIframeMode, setIsIframeMode] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const activeItem = portfolioItems[activeIndex];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) setIsFullscreen(false);
        if (isIframeMode) setIsIframeMode(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isFullscreen, isIframeMode]);

  useEffect(() => {
    if (isFullscreen || isIframeMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen, isIframeMode]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % portfolioItems.length);
    if (isIframeMode) setIsIframeMode(false);
    setImageLoaded(false);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length
    );
    if (isIframeMode) setIsIframeMode(false);
    setImageLoaded(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const minSwipeDistance = 50;
    if (Math.abs(distance) < minSwipeDistance) return;
    if (distance > 0) nextSlide();
    else prevSlide();
    touchStart.current = 0;
    touchEnd.current = 0;
  };

  const handleIframeClick = () => {
    setIframeLoading(true);
    setIsIframeMode(true);
  };
  const handleIframeLoad = () => setIframeLoading(false);
  const handleBackToPreview = () => setIsIframeMode(false);

  return (
    <section
      id="portfolio"
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* subtle grid like hero */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, #1f293733 1px, transparent 1px),linear-gradient(to bottom, #1f293733 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20 md:py-24">
        {/* header */}
        <div className="mb-10 sm:mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4">
            <div className={`${primaryAccent} h-0.5 w-10 sm:w-16`} />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Selected Works
            </span>
            <div className={`${primaryAccent} h-0.5 w-10 sm:w-16`} />
          </div>

          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-50">
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-slate-50 via-slate-100 to-slate-300">
                  We Craft
                </span>
                <br />
                <span className={primaryAccentText}>Digital Masterpieces</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-400">
                Performance-focused websites and products that help brands grow,
                scale, and dominate in their category.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-semibold text-slate-50">
                  0{activeIndex + 1}
                  <span className="text-slate-500">/0{portfolioItems.length}</span>
                </div>
                <div className="text-xs text-slate-500">Selected Project</div>
              </div>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className={`${glassCard} p-2 sm:p-3 hover:scale-105 active:scale-95 transition-transform`}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? (
                  <X className="h-4 w-4 text-slate-100" />
                ) : (
                  <Maximize2 className="h-4 w-4 text-slate-100" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* iframe overlay */}
        {isIframeMode && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl px-2 sm:px-4">
            <div
              className={`${glassCard} w-full max-w-6xl h-[90vh] flex flex-col`}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 sm:px-4 sm:py-3">
                <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                  <span className={`h-2 w-2 rounded-full ${primaryAccent}`} />
                  <div className="font-mono text-xs sm:text-sm text-slate-300 truncate">
                    <span className="text-slate-500">https://</span>
                    <span>{activeItem.url.replace("https://", "")}</span>
                  </div>
                  {iframeLoading && (
                    <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={activeItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-white/5 px-2 py-1 text-xs text-slate-100 hover:bg-white/10"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span className="hidden sm:inline">New Tab</span>
                  </a>
                  <button
                    onClick={handleBackToPreview}
                    className="bg-white/5 p-1.5 text-slate-100 hover:bg-white/10"
                    aria-label="Back to preview"
                  >
                    <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 bg-black">
                {iframeLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="h-8 w-8 animate-spin text-cyan-300" />
                      <span className="text-sm text-slate-400">
                        Loading website preview...
                      </span>
                    </div>
                  </div>
                )}
                <iframe
                  src={activeItem.url}
                  className="h-full w-full border-0"
                  title={`Live preview of ${activeItem.title}`}
                  onLoad={handleIframeLoad}
                  loading="lazy"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        )}

        {/* fullscreen overlay */}
        {isFullscreen && !isIframeMode && (
          <div
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/95 backdrop-blur-xl px-2 sm:px-4"
            onClick={(e) =>
              e.target === e.currentTarget && setIsFullscreen(false)
            }
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute right-4 top-4 bg-black/60 p-2 text-slate-100 hover:bg-black"
              aria-label="Close fullscreen"
            >
              <X className="h-5 w-5" />
            </button>
            <div className={`${glassCard} w-full max-w-6xl`}>
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${primaryAccent}`} />
                  <span className="font-mono text-xs sm:text-sm text-slate-300">
                    https://
                    {activeItem.url.replace("https://", "").split("/")[0]}
                  </span>
                </div>
                <a
                  href={activeItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 px-3 py-1.5 text-xs text-slate-100 hover:bg-white/10"
                >
                  Open Live Site
                </a>
              </div>
              <div className="relative aspect-[16/9] bg-black">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* main preview */}
        <div
          className={`relative transition-all duration-700 ${
            isFullscreen ? "fixed inset-2 z-[10000]" : ""
          }`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`${glassCard} relative overflow-hidden`}>
            {/* preview header */}
            <div className="border-b border-white/10 px-3 py-3 sm:px-4 sm:py-4 md:px-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full items-center gap-2 sm:gap-3 overflow-hidden">
                  <span className={`h-2 w-2 rounded-full ${primaryAccent}`} />
                  <span className="font-mono text-xs sm:text-sm text-slate-300 truncate">
                    https://
                    {activeItem.url.replace("https://", "").split("/")[0]}
                  </span>
                </div>
                <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
                  <button
                    onClick={handleIframeClick}
                    className="group relative flex-1 items-center justify-center overflow-hidden border border-white/10 px-3 py-1.5 text-xs text-slate-50 transition-transform hover:scale-105 active:scale-95 sm:flex-none sm:px-4 sm:py-2"
                  >
                    <span
                      className={`${primaryAccent} absolute inset-0 opacity-0 transition-opacity group-hover:opacity-30`}
                    />
                    <span className="relative flex items-center justify-center gap-1.5">
                      <Globe className="h-3 w-3" />
                      <span>Open Website Preview</span>
                    </span>
                  </button>
                  <a
                    href={activeItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center border border-white/10 bg-white/5 p-1.5 text-slate-50 transition hover:bg-white/10"
                    aria-label="Open in new tab"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* preview image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] cursor-pointer">
              <div
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 opacity-0 transition-opacity hover:opacity-100"
                onClick={handleIframeClick}
              >
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center bg-white/10">
                    <Globe className="h-7 w-7 text-white" />
                  </div>
                  <p className="text-base sm:text-lg font-medium text-slate-50">
                    Click to preview website
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-slate-400">
                    Opens an interactive preview of {activeItem.title}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 overflow-hidden">
                {!imageLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-black" />
                )}
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className={`h-full w-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? "opacity-80" : "opacity-0"
                  }`}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="pointer-events-none absolute right-3 top-3 flex flex-wrap justify-end gap-1 sm:right-4 sm:top-4 sm:gap-2">
                  {activeItem.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/20 bg-black/70 px-2 py-0.5 text-xs text-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-5 md:p-6 lg:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 border border-white/15 bg-black/70 px-2 py-1 text-xs text-slate-200">
                      <Sparkles className="h-3 w-3 text-cyan-300" />
                      <span>{activeItem.category}</span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-slate-50">
                      {activeItem.title}
                    </h3>
                    <p className="mt-1 max-w-xl text-xs sm:text-sm text-slate-300">
                      {activeItem.description}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-50">
                      {Object.values(activeItem.metrics)[0]}
                    </div>
                    <div className="text-xs text-slate-400 capitalize">
                      {Object.keys(activeItem.metrics)[0]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* navigation */}
        <div className="mt-7 flex items-center justify-center gap-6">
          <button
            onClick={prevSlide}
            className={`${glassCard} flex h-10 w-10 items-center justify-center text-slate-100 transition-transform hover:scale-105 active:scale-95`}
            aria-label="Previous project"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex gap-2">
            {portfolioItems.map((item, index) => (
              <button
                key={item.title}
                onClick={() => {
                  setActiveIndex(index);
                  if (isIframeMode) setIsIframeMode(false);
                  setImageLoaded(false);
                }}
                className="group relative h-3 w-3"
                aria-label={`View project ${index + 1}`}
              >
                <span
                  className={`block h-full w-full rounded-full transition-all ${
                    index === activeIndex
                      ? `${primaryAccent} scale-125`
                      : "bg-slate-600/40 group-hover:bg-slate-300/80"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className={`${glassCard} flex h-10 w-10 items-center justify-center text-slate-100 transition-transform hover:scale-105 active:scale-95`}
            aria-label="Next project"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* tech + metrics */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-50">
              <Code className="h-5 w-5 text-cyan-300" />
              Tech Stack &amp; Implementation
            </h4>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4">
              {activeItem.tags.map((tech, index) => (
                <div
                  key={tech}
                  className="group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className={`${glassCard} relative p-3 sm:p-4 transition-transform duration-300 ${
                      hoveredIndex === index ? "scale-[1.03]" : ""
                    }`}
                  >
                    <div
                      className={`mb-1 text-lg font-semibold ${primaryAccentText}`}
                    >
                      0{index + 1}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-50">
                      {tech}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-400">
                      {index === 0
                        ? "Framework"
                        : index === 1
                        ? "Frontend"
                        : index === 2
                        ? "Backend"
                        : "Integration"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-50">
              <Zap className="h-5 w-5 text-cyan-300" />
              Performance Metrics
            </h4>
            <div className="space-y-3">
              {Object.entries(activeItem.metrics).map(([key, value]) => {
                const numeric =
                  typeof value === "string"
                    ? parseFloat(value.replace("%", "").replace("+", ""))
                    : 100;
                return (
                  <div
                    key={key}
                    className={`${glassCard} bg-black p-3 sm:p-4`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="max-w-[60%] text-xs capitalize text-slate-400">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-sm font-semibold text-slate-50">
                        {value}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden bg-slate-800">
                      <div
                        className={`${primaryAccent} h-full`}
                        style={{ width: `${Math.min(numeric, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* all projects grid */}
        <div className="mt-14">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Complete Portfolio
              </p>
              <h3 className="mt-1 font-display text-xl sm:text-2xl font-semibold text-slate-50">
                All Projects
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className={`${glassCard} p-2 text-slate-100 hover:scale-105 active:scale-95`}
                aria-label="Previous project"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextSlide}
                className={`${glassCard} p-2 text-slate-100 hover:scale-105 active:scale-95`}
                aria-label="Next project"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {portfolioItems.map((item, index) => (
              <button
                key={item.title}
                onClick={() => {
                  setActiveIndex(index);
                  setImageLoaded(false);
                }}
                className="text-left"
                aria-label={`View ${item.title} project`}
              >
                <div
                  className={`relative h-full overflow-hidden border border-white/10 bg-black p-4 transition-transform duration-300 hover:scale-[1.03] ${
                    index === activeIndex
                      ? "ring-2 ring-cyan-400/70 shadow-[0_0_32px_rgba(56,189,248,0.35)]"
                      : ""
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="truncate border border-white/15 bg-black px-2 py-0.5 text-xs text-slate-200">
                      {item.category}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        index === activeIndex
                          ? primaryAccent
                          : "bg-slate-500/60"
                      }`}
                    />
                  </div>
                  <h4 className="font-display text-base sm:text-lg font-semibold text-slate-50">
                    {item.title}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-xs sm:text-sm text-slate-400">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-slate-50">
                      {Object.values(item.metrics)[0]}
                    </span>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
