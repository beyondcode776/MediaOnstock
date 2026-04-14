import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const typingTexts = [
  "Performance Marketing",
  "SEO Growth",
  "Web Development",
  "Brand Strategy",
  "Automation",
];

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentFullText = typingTexts[currentTextIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Mouse Follow Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle, hsl(var(--neon-cyan) / 0.1) 0%, transparent 70%)`,
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
      />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-neon-cyan/5 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-purple/5 blur-3xl animate-float animation-delay-200" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-neon-pink/5 blur-3xl animate-float animation-delay-400" />

      {/* Animated Circles */}
      <div className="absolute top-20 right-20 opacity-20">
        <div className="w-72 h-72 rounded-full border border-primary/30 animate-spin-slow" />
        <div className="absolute inset-4 rounded-full border border-neon-purple/30 animate-counter-spin" />
        <div className="absolute inset-8 rounded-full border border-neon-pink/30 animate-spin-slow" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >

            <span className="text-sm text-muted-foreground">

            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          >
            We Build Brands That
            <br />
            <span className="neon-text-gradient">Grow, Scale & Dominate</span>
          </motion.h1>

          {/* Typing Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-12 mb-8"
          >
            <span className="text-xl md:text-2xl text-muted-foreground">
              We specialize in{" "}
              <span className="text-primary font-semibold">
                {displayText}
                <span className="border-r-2 border-primary ml-1 animate-typing-cursor" />
              </span>
            </span>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
          >
            Performance Marketing + SEO + Websites + Automation — all in one agency.
            Transform your digital presence and achieve exponential growth.
          </motion.p>

          {/* CTA Buttons */}
         {/* CTA Buttons */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.8 }}
  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
>
  <a
    href="#contact"
    className="btn-neon rounded-none flex items-center gap-2 group"
  >
    Book Strategy Call
    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </a>

  <a
    href="#portfolio"
    className="btn-ghost-neon rounded-none flex items-center gap-2"
  >
    <Play className="w-5 h-5" />
    See Transformations
  </a>
</motion.div>


          {/* Trust Indicators */}
          
        </div>
      </div>

      {/* Scroll Indicator */}
     
    </section>
  );
};

export default HeroSection;
