import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Rocket,
  Target,
  TrendingUp,
  Share2,
  BarChart3,
  Users,
  Megaphone,
  Globe,
  Code,
  Palette,
  ShoppingCart,
  Cog,
  Zap,
  ArrowRight,
} from "lucide-react";

const serviceCategories = [
  {
    title: "Growth & Marketing",
    icon: Rocket,
    color: "neon-cyan",
    services: [
      {
        name: "Performance Ads",
        icon: Target,
        description: "Data-driven ad campaigns that deliver measurable ROI",
        tools: ["Google Ads", "Meta Ads", "TikTok"],
        results: "300% avg. ROAS",
      },
      {
        name: "Meta Ads",
        icon: Share2,
        description: "Facebook & Instagram campaigns that convert",
        tools: ["Audience Builder", "Pixel", "CAPI"],
        results: "2.5x engagement",
      },
      {
        name: "Google Ads",
        icon: TrendingUp,
        description: "Search, Display & YouTube advertising mastery",
        tools: ["Search", "Display", "PMax"],
        results: "40% cost reduction",
      },
      {
        name: "SMM & SMO",
        icon: Users,
        description: "Social media management that builds communities",
        tools: ["Content Calendar", "Analytics", "Engagement"],
        results: "500% follower growth",
      },
      {
        name: "Lead Generation",
        icon: BarChart3,
        description: "Qualified leads that fuel your sales pipeline",
        tools: ["Landing Pages", "CRM", "Automation"],
        results: "10x more leads",
      },
      {
        name: "Brand Awareness",
        icon: Megaphone,
        description: "Strategic campaigns that put you on the map",
        tools: ["PR", "Influencers", "Content"],
        results: "1M+ impressions",
      },
    ],
  },
  {
    title: "Web & Technology",
    icon: Globe,
    color: "neon-purple",
    services: [
      {
        name: "Website Design",
        icon: Palette,
        description: "Stunning designs that capture your brand essence",
        tools: ["Figma", "Adobe XD", "Framer"],
        results: "95% satisfaction",
      },
      {
        name: "Web Development",
        icon: Code,
        description: "Fast, scalable, and secure web applications",
        tools: ["React", "Next.js", "Node.js"],
        results: "3s load time",
      },
      {
        name: "UI/UX Design",
        icon: Zap,
        description: "User experiences that drive engagement",
        tools: ["User Research", "Prototyping", "Testing"],
        results: "60% more conversions",
      },
      {
        name: "E-commerce Setup",
        icon: ShoppingCart,
        description: "Complete online store solutions",
        tools: ["Shopify", "WooCommerce", "Custom"],
        results: "200% sales increase",
      },
      {
        name: "CRM + Automation",
        icon: Cog,
        description: "Streamline operations with smart automation",
        tools: ["HubSpot", "Zapier", "Custom APIs"],
        results: "70% time saved",
      },
    ],
  },
];

const ServiceCard = ({ service, index, categoryColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`glass-card-hover rounded-none p-6 cursor-pointer transition-all duration-500 ${
        isExpanded ? "row-span-2" : ""
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-none flex items-center justify-center shrink-0 ${
            categoryColor === "neon-cyan"
              ? "bg-primary/10 border border-primary/30"
              : "bg-secondary/10 border border-secondary/30"
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              categoryColor === "neon-cyan" ? "text-primary" : "text-secondary"
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-display font-semibold text-foreground mb-1">
            {service.name}
          </h4>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {service.description}
          </p>
        </div>

        <ArrowRight
          className={`w-5 h-5 text-muted-foreground transition-transform ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-4 mt-4 border-t border-border">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Tools We Use
          </span>

          <div className="flex flex-wrap gap-2 mt-2">
            {service.tools.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 rounded-none bg-muted text-muted-foreground text-xs border border-border"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-4">
            <span
              className={`text-2xl font-display font-bold ${
                categoryColor === "neon-cyan" ? "text-primary" : "text-secondary"
              }`}
            >
              {service.results}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="services" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 bg-hero-glow opacity-50" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need to
            <br />
            <span className="neon-text-gradient">Dominate Digital</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A complete suite of services designed to accelerate your growth.
            Click on any service to learn more.
          </p>
        </motion.div>

        <div className="space-y-16">
          {serviceCategories.map((category, catIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: catIndex * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`w-12 h-12 rounded-none flex items-center justify-center ${
                      category.color === "neon-cyan"
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-secondary/10 border border-secondary/30"
                    }`}
                  >
                    <CategoryIcon
                      className={`w-6 h-6 ${
                        category.color === "neon-cyan"
                          ? "text-primary"
                          : "text-secondary"
                      }`}
                    />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.services.map((service, index) => (
                    <ServiceCard
                      key={service.name}
                      service={service}
                      index={index}
                      categoryColor={category.color}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
