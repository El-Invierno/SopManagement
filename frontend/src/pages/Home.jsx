import React from 'react';
import { BentoCard } from '@/components/magicui/bento-grid';
import { FileTextIcon, InputIcon, GlobeIcon, CalendarIcon, BellIcon } from '@radix-ui/react-icons';
import WordFadeIn from "@/components/magicui/word-fade-in";

const Home = () => {
  const features = [
    {
      Icon: FileTextIcon,
      name: "Create SOP",
      description: "Start creating your Standard Operating Procedures.",
      href: "/create-sop",
      cta: "Go to SOP Form",
    },
    {
      Icon: InputIcon,
      name: "Assess Quality",
      description: "Assess and manage quality control processes.",
      href: "/assess-quality",
      cta: "Assess Quality",
    },
    {
      Icon: GlobeIcon,
      name: "AI Suggestions",
      description: "Explore AI-powered suggestions for process improvement.",
      href: "/ai-suggestions",
      cta: "AI Suggestions",
    },
    {
      Icon: CalendarIcon,
      name: "Control Management",
      description: "Manage and track controls efficiently.",
      href: "/control-management",
      cta: "Control Management",
    },
    {
      Icon: BellIcon,
      name: "Gap Analysis",
      description: "Perform gap analysis to identify areas for improvement.",
      href: "/gap-analysis",
      cta: "Gap Analysis",
    },
    {
      Icon: BellIcon,
      name: "Log Change",
      description: "Log and track changes made to SOPs.",
      href: "/log-change",
      cta: "Log Change",
    },
    {
      Icon: BellIcon,
      name: "Validate Compliance",
      description: "Validate compliance with regulatory requirements.",
      href: "/validate-compliance",
      cta: "Validate Compliance",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8 rounded-2xl">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          <WordFadeIn delay={0.0} words="Welcome to the SOP Management System" />
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {features.map((feature, index) => (
            <BentoCard key={index} {...feature} className="w-full sm:w-1/2 lg:w-1/3" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
