import {
  Zap,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  ArrowUp,
  Sparkles,
  Shield,
  TrendingUp,
  Globe,
} from "lucide-react";
import logo from "../assets/logo.jpg";
import ShaderBackground from "./shader-background"; // Adjust the import path as needed

const footerLinks = {
  services: [
    { name: "Performance Marketing", href: "#services", icon: TrendingUp },
    { name: "SEO & Content", href: "#services", icon: Sparkles },
    { name: "Web Development", href: "#services", icon: Zap },
    { name: "Brand Strategy", href: "#services", icon: Shield },
    { name: "Social Media", href: "#services", icon: Globe },
  ],
  company: [
    { name: "About Us", href: "#about", badge: "New" },
    { name: "Careers", href: "#careers" },
    { name: "Contact", href: "#contact" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Instagram, href: "https://www.instagram.com/mediaonstake/" },
  { icon: Facebook, href: "#" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-background border-t border-border pt-20 pb-10 overflow-hidden">
      
      {/* Shader Background - positioned behind content */}
      <div className="absolute inset-0 z-0">
        <ShaderBackground 
          backdropBlurAmount="none" // No blur or choose "sm", "md", etc.
          color="#07eae6ff" // Cyan color to match your theme
          className="opacity-20" // Adjust opacity as needed
        />
      </div>

      {/* Grid overlay - keep this with reduced opacity */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-5">
        <div className="h-full w-full bg-[linear-gradient(to_right,#999_1px,transparent_1px),linear-gradient(to_bottom,#999_1px,transparent_1px)] bg-[size:28px_28px]" />
      </div>

      <div className="container-custom relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 mb-16">

          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="/" className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 border border-border flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <img src={logo} alt="MediaOnStake" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  MediaOnStake<span className="text-primary">.</span>
                </h2>
                <div className="h-[2px] w-12 bg-primary mt-1" />
              </div>
            </a>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-8 border-l-2 border-primary pl-4 bg-background/50 backdrop-blur-sm p-3">
              We build brands that grow, scale, and dominate. Your success is our mission.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    className="w-11 h-11 border border-border flex items-center justify-center hover:border-primary transition bg-background/80 backdrop-blur-sm"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground hover:text-primary transition" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* 🔥 SERVICES WITH NEON HOVER */}
          <div className="lg:col-span-4">
            <h4 className="text-lg font-semibold mb-6 border-b border-border pb-2">
              Services
            </h4>

            <ul className="space-y-3">
              {footerLinks.services.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="
                        group relative flex items-center gap-3 p-3
                        border border-transparent
                        transition-all duration-300
                        hover:border-primary
                        hover:bg-primary/5
                        bg-background/70 backdrop-blur-sm
                      "
                    >
                      {/* Neon Glow */}
                      <span className="
                        absolute inset-0 opacity-0 group-hover:opacity-100
                        pointer-events-none
                        shadow-[0_0_18px_theme(colors.primary)]
                        transition
                      " />

                      <div className="
                        w-8 h-8 border border-border
                        flex items-center justify-center
                        group-hover:border-primary
                        group-hover:shadow-[0_0_12px_theme(colors.primary)]
                        transition
                        bg-background
                      ">
                        <Icon className="
                          w-4 h-4 text-muted-foreground
                          group-hover:text-primary
                          transition
                        " />
                      </div>

                      <span className="
                        text-sm text-muted-foreground
                        group-hover:text-primary
                        transition
                      ">
                        {item.name}
                      </span>

                      <ArrowUp className="
                        w-3 h-3 ml-auto rotate-45
                        opacity-0 group-hover:opacity-100
                        text-primary
                        transition
                      " />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-4">
            <h4 className="text-lg font-semibold mb-6 border-b border-border pb-2">
              Company
            </h4>

            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center justify-between p-2 border border-transparent hover:border-border transition bg-background/70 backdrop-blur-sm"
                  >
                    <span className="text-sm text-muted-foreground hover:text-foreground">
                      {item.name}
                    </span>
                    {item.badge && (
                      <span className="text-[11px] px-2 py-1 border border-green-600 text-green-600 bg-background">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground bg-background/70 backdrop-blur-sm px-4 py-2">
            © {new Date().getFullYear()} MediaOnStake. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 border border-border hover:border-primary transition bg-background/80 backdrop-blur-sm"
          >
            Back to Top <ArrowUp className="w-4 h-4 text-primary" />
          </button>
        </div>
      </div>
    </footer>
  );
}