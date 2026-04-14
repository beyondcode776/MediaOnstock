import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sonal Singh",
    role: "Director, NHRRWO",
    image: "https://www.nhrwwo.in/assets/Logopit_1690716648215-BQyKVKEg.png",
    content:
      "MediaOnStake delivered an exceptionally polished and impactful website for NHRRWO. The UI is clean, fast, and built with precision. Our engagement, member activity, and overall visibility have significantly increased.",
    rating: 5,
    metrics: "160% rise in member engagement",
  },
  {
    name: "Prathmeesh Saini",
    role: "Founder, North Indian UAE",
    image:
      "https://d2gjqh9j26unp0.cloudfront.net/profilepic/e47557d5f4cc1330490c5d58bf807774",
    content:
      "We wanted a premium Indian-themed website that speaks to the UAE audience — and MediaOnStake nailed it perfectly. The design, speed, animations, and user flow feel international-level.",
    rating: 5,
    metrics: "Customer interactions up by 3.8x",
  },
  {
    name: "Himashu Ojha",
    role: "Owner, Ohja Printing Press",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format",
    content:
      "MediaOnStake created a highly professional and visually appealing website for our printing press. We now receive consistent leads every week.",
    rating: 5,
    metrics: "Leads increased by 240%",
  },
  {
    name: "Anshumesh Saini",
    role: "Co Founder, CyberShield",
    image: "https://avatars.githubusercontent.com/u/119862734?s=48&v=4",
    content:
      "MediaOnStake’s UI excellence helped establish a powerful digital presence for my portfolio. Client conversions increased massively.",
    rating: 5,
    metrics: "Client conversions increased by 300%",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () =>
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <section
      id="testimonials"
      ref={ref}
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-hero-glow opacity-30" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider block mb-3">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">
            What Our Clients
            <br />
            <span className="neon-text-gradient">Say About Us</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real feedback from real businesses we’ve helped grow.
          </p>
        </motion.div>

        {/* Card */}
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Quote className="w-6 h-6 text-primary" />
          </div>

          <div className="glass-card p-10 rounded-none">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: i === activeIndex ? 1 : 0,
                  x: i === activeIndex ? 0 : 20,
                }}
                transition={{ duration: 0.4 }}
                className={i === activeIndex ? "block" : "hidden"}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground text-xl leading-relaxed italic mb-8">
                  “{t.content}”
                </p>

                {/* Author */}
                <div className="flex items-center justify-between border-t border-border/40 pt-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-14 h-14 object-cover border border-primary/30"
                    />
                    <div>
                      <h4 className="font-display font-semibold text-foreground">
                        {t.name}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {t.role}
                      </p>
                    </div>
                  </div>

                  <span className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                    {t.metrics}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 glass-card rounded-none flex items-center justify-center hover:bg-primary/10 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-sm text-muted-foreground font-mono">
              {activeIndex + 1} / {testimonials.length}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 glass-card rounded-none flex items-center justify-center hover:bg-primary/10 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
