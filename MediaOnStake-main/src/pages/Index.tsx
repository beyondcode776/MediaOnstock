import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import PortfolioSection from "@/components/PortfolioSection";
import { ScrollTimeline } from "@/components/ProcessSection";
import { TeamCarousel } from "@/components/team-carousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Founder from "../assets/teams/Founder.jpeg"
import Cofounder from "../assets/teams/Co-Founder.jpeg"
import manager from "../assets/teams/Manager.jpeg"
import researchteam from "../assets/teams/ResearchTeam.png"
import seo from "../assets/teams/SEO.png"
import ShaderBackground from '@/components/shader-background';
import socialmedia from "../assets/teams/Socialmediamanager.png";
import harshcmo from "../assets/teams/harshcmo.jpeg"
import pathak from "../assets/teams/pathak.jpeg"

import researchteam2 from "../assets/teams/Researchteam2.jpeg"
/* -------------------- DATA -------------------- */

const events = [
  {
    number: "",
    title: "Discovery Call",
    description:
      "We start with a deep dive into your business, goals, challenges, and vision. Understanding you is our first priority.",
    details: ["Business Analysis", "Goal Setting", "Competitor Research"],
  },
  {
    number: "",
    title: "Strategy & Planning",
    description:
      "Based on our discovery, we craft a tailored strategy with clear milestones, KPIs, and actionable roadmap.",
    details: ["Custom Strategy", "Timeline Creation", "Resource Allocation"],
  },
  {
    number: "",
    title: "Execution & Optimization",
    description:
      "Our expert team brings the strategy to life, continuously testing and optimizing for peak performance.",
    details: ["Implementation", "A/B Testing", "Real-time Adjustments"],
  },
  {
    number: "",
    title: "Reporting & Scaling",
    description:
      "Transparent reporting with actionable insights. When we hit targets, we scale what works for exponential growth.",
    details: ["Monthly Reports", "Performance Review", "Scale Strategy"],
  },
];

const teamMembers = [
  {
    id: "1",
    name: "Harsh Gupta",
    role: "Founder",
    image: Founder,
    bio: "Full-stack developer and visionary founder with a passion for building impactful digital products.",
  },
  {
    id: "2",
    name: "Anshumesh Saini",
    role: "Co-Founder & Lead Developer",
    image: Cofounder,
    bio: "Creative designer focused on crafting intuitive, user-friendly, and visually stunning interfaces.",
  },
  {
    id: "3",
    name: "Harsh Chauhan ",
    role: "CMO & SEO Manager",
    image: harshcmo,
    bio: "Frontend specialist with expertise in React, animations, and performance-optimized web apps.",
  },
  {
    id: "3",
    name: "PARIKSHIT PATHAK",
    role: "Co Founder and BDE",
    image: pathak,
    bio: "Frontend specialist with expertise in React, animations, and performance-optimized web apps.",
  },
  {
    id: "4",
    name: "Tarang ",
    role: "Manager",
    image: manager,
    bio: "Frontend specialist with expertise in React, animations, and performance-optimized web apps.",
  },
  {
    id: "5",
    name: "Shristi Chandra Choudhary",
    role: "Research and Development",
    image: researchteam,
    bio: "Backend engineer skilled in APIs, databases, and scalable server-side architectures.",
  },
  {
    id: "6",
    name: "Pratistha Mishra",
    role: "Research Analyst",
    image: researchteam2,
    bio: "Storyteller and community builder creating meaningful connections with audiences.",
  },
  {
    id: "7",
    name: "Sehna Agrawal",
    role: "Social Meida Manager",
    image: socialmedia,
    bio: "Storyteller and community builder creating meaningful connections with audiences.",
  },
  {
    id: "8",
    name: "Sakshi Sah",
    role: "SEO Specialist",
    image: seo,
    bio: "Growth-focused marketer helping brands scale through data-driven digital strategies.",
  },
 
 
];


/* -------------------- PAGE -------------------- */

const Index = () => {
  return (
    <>
      <Helmet>
        <title>MediaOnStake - Digital Growth Agency</title>
        <meta
          name="description"
          content="MediaOnStake is a premium digital agency specializing in performance marketing, SEO, web development, and brand strategy."
        />
        <meta
          name="keywords"
          content="digital agency, performance marketing, SEO, web development"
        />
        <link rel="canonical" href="https://www.mediaonstake.com/" />
        <meta property="og:title" content="MediaOnStake - Digital Growth Agency" />
        <meta
          property="og:description"
          content="Premium digital agency specializing in performance marketing, SEO, web development, and brand strategy."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.mediaonstake.com/" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main>
          <HeroSection />
          <ProblemSolutionSection />
          <ServicesSection />
          <ResultsSection />

          {/* Process Timeline */}
          <ScrollTimeline
            events={events}
            title="Our Process"
            subtitle="Scroll to explore how we work"
            progressIndicator
            cardAlignment="alternating"
            revealAnimation="fade"
          />

          <PortfolioSection />

          {/* Team Section */}
          <TeamCarousel
  members={teamMembers}
  title="OUR TEAM"
  titleColor="#004CFF"
  background="bg-background"
  cardRadius={0}
  infoTextColor="#004CFF"
/>

          <TestimonialsSection />
          <ContactSection />
        </main>

        <Footer />

      </div>
    </>
  );
};

export default Index;
