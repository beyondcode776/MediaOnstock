import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Users, Globe, Award } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: 12000,
    suffix: "+",
    label: "Impressions Generated",
    prefix: "",
    color: "primary",
  },
  {
    icon: Users,
    value: 500,
    suffix: "%",
    label: "Average ROI in Ads",
    prefix: "",
    color: "secondary",
  },
  {
    icon: Globe,
    value: 10,
    suffix: "+",
    label: "Stunning Websites Built",
    prefix: "",
    color: "accent",
  },
  {
    icon: Award,
    value: 95,
    suffix: "%",
    label: "Client Retention Rate",
    prefix: "",
    color: "primary",
  },
];

const AnimatedCounter = ({ value, suffix, prefix }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  return (
    <span ref={ref}>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
};

const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Secondary rotating card - BEHIND the main card */}
      <motion.div
        animate={{
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          rotate: {
            duration: 2,
            ease: "linear",
            repeat: isHovered ? Infinity : 0,
          },
          scale: {
            duration: 0.3,
            type: "spring",
            stiffness: 200,
          },
        }}
        className="absolute inset-0 glass-card-hover rounded-none bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 border border-primary/30 opacity-70"
      />
      
      {/* Optional second rotating layer for more depth */}
      <motion.div
        animate={{
          rotate: isHovered ? -360 : 0,
          scale: isHovered ? 0.95 : 1,
        }}
        transition={{
          rotate: {
            duration: 3,
            ease: "linear",
            repeat: isHovered ? Infinity : 0,
          },
          scale: {
            duration: 0.3,
          },
        }}
        className="absolute inset-2 glass-card-hover rounded-none bg-gradient-to-tr from-secondary/15 via-transparent to-primary/15 border border-secondary/20 opacity-50"
      />

      {/* Main stationary card - ABOVE the rotating cards */}
      <div className="glass-card-hover rounded-none p-8 text-center group relative z-10">
        {/* Icon with subtle hover effect */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-none bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 transition-colors relative">
          {/* Optional rotating ring around icon */}
          <motion.div
            animate={{
              rotate: isHovered ? 360 : 0,
            }}
            transition={{
              rotate: {
                duration: 1.5,
                ease: "linear",
                repeat: isHovered ? Infinity : 0,
              },
            }}
            className="absolute inset-0 rounded-none border-2 border-primary/40 border-t-transparent"
          />
          <Icon className="w-8 h-8 text-primary relative z-10" />
        </div>

        {/* Animated Number */}
        <div className="font-display text-5xl md:text-6xl font-bold text-foreground mb-2">
          <AnimatedCounter
            value={stat.value}
            suffix={stat.suffix}
            prefix={stat.prefix}
          />
        </div>

        {/* Label */}
        <p className="text-muted-foreground">{stat.label}</p>

        {/* Animated Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          animate={{
            scaleX: isHovered ? 1.1 : 1,
          }}
          transition={{
            scaleX: {
              duration: 0.3,
            },
          }}
          viewport={{ once: true }}
          className="h-1 bg-gradient-to-r from-primary to-secondary rounded-none mt-6 origin-left"
        />
      </div>
    </motion.div>
  );
};

// Alternative: Simpler secondary card rotation
const StatCardSimple = ({ stat, index }) => {
  const Icon = stat.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Single rotating secondary card */}
      <motion.div
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          rotate: {
            duration: 4,
            ease: "linear",
            repeat: isHovered ? Infinity : 0,
          },
        }}
        className="absolute -inset-4 glass-card rounded-none bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 opacity-60"
      />

      {/* Main stationary card */}
      <div className="glass-card-hover rounded-none p-8 text-center group relative z-10 backdrop-blur-sm bg-card/80">
        <div className="w-16 h-16 mx-auto mb-6 rounded-none bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-8 h-8 text-primary" />
        </div>

        <div className="font-display text-5xl md:text-6xl font-bold text-foreground mb-2">
          <AnimatedCounter
            value={stat.value}
            suffix={stat.suffix}
            prefix={stat.prefix}
          />
        </div>

        <p className="text-muted-foreground">{stat.label}</p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
          viewport={{ once: true }}
          className="h-1 bg-gradient-to-r from-primary to-secondary rounded-none mt-6 origin-left"
        />
      </div>
    </motion.div>
  );
};

// Alternative: Rotating corner elements
const StatCardCorners = ({ stat, index }) => {
  const Icon = stat.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Rotating corner elements */}
      <motion.div
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          rotate: {
            duration: 3,
            ease: "linear",
            repeat: isHovered ? Infinity : 0,
          },
        }}
        className="absolute -top-2 -left-2 w-12 h-12 rounded-none bg-gradient-to-br from-primary/30 to-transparent border border-primary/40"
      />
      
      <motion.div
        animate={{
          rotate: isHovered ? -360 : 0,
        }}
        transition={{
          rotate: {
            duration: 3,
            ease: "linear",
            repeat: isHovered ? Infinity : 0,
          },
        }}
        className="absolute -top-2 -right-2 w-12 h-12 rounded-none bg-gradient-to-bl from-secondary/30 to-transparent border border-secondary/40"
      />
      
      <motion.div
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          rotate: {
            duration: 3,
            ease: "linear",
            repeat: isHovered ? Infinity : 0,
          },
        }}
        className="absolute -bottom-2 -left-2 w-12 h-12 rounded-none bg-gradient-to-tr from-accent/30 to-transparent border border-accent/40"
      />
      
      <motion.div
        animate={{
          rotate: isHovered ? -360 : 0,
        }}
        transition={{
          rotate: {
            duration: 3,
            ease: "linear",
            repeat: isHovered ? Infinity : 0,
          },
        }}
        className="absolute -bottom-2 -right-2 w-12 h-12 rounded-none bg-gradient-to-tl from-primary/30 to-transparent border border-primary/40"
      />

      {/* Main stationary card */}
      <div className="glass-card-hover rounded-none p-8 text-center group relative z-10">
        <div className="w-16 h-16 mx-auto mb-6 rounded-none bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-8 h-8 text-primary" />
        </div>

        <div className="font-display text-5xl md:text-6xl font-bold text-foreground mb-2">
          <AnimatedCounter
            value={stat.value}
            suffix={stat.suffix}
            prefix={stat.prefix}
          />
        </div>

        <p className="text-muted-foreground">{stat.label}</p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
          viewport={{ once: true }}
          className="h-1 bg-gradient-to-r from-primary to-secondary rounded-none mt-6 origin-left"
        />
      </div>
    </motion.div>
  );
};

const ResultsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="results"
      className="section-padding relative overflow-hidden"
      ref={ref}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-none bg-primary/5 blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
            Results Engine
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Numbers That Speak
            <br />
            <span className="neon-text-gradient">Louder Than Words</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real results from real campaigns. These aren't just numbers —
            they're success stories of businesses we've transformed.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            // Choose which version you prefer:
            <StatCard key={stat.label} stat={stat} index={index} />
            // <StatCardSimple key={stat.label} stat={stat} index={index} />
            // <StatCardCorners key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Additional Context */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 glass-card rounded-none p-8 md:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-display text-xl font-bold text-foreground mb-2">
                Proven Track Record
              </h4>
              <p className="text-muted-foreground text-sm">
                5+ years of delivering exceptional results across industries
              </p>
            </div>
            <div>
              <h4 className="font-display text-xl font-bold text-foreground mb-2">
                Data-Driven Approach
              </h4>
              <p className="text-muted-foreground text-sm">
                Every decision backed by analytics and real performance metrics
              </p>
            </div>
            <div>
              <h4 className="font-display text-xl font-bold text-foreground mb-2">
                Continuous Optimization
              </h4>
              <p className="text-muted-foreground text-sm">
                We never stop improving your campaigns for maximum ROI
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;