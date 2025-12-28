"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { motion } from "framer-motion";
import { Calendar, MapPin, Building2, TrendingUp } from "lucide-react";

function ExperienceContent({
    company,
    role,
    period,
    location,
    description,
    metrics,
    tech,
}: {
    company: string;
    role: string;
    period: string;
    location: string;
    description: string[];
    metrics: { label: string; value: string }[];
    tech: string[];
}) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-400">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm font-mono uppercase tracking-wider">
                        {company}
                    </span>
                </div>
                <h4 className="text-2xl md:text-3xl font-bold text-zinc-100">
                    {role}
                </h4>
                <div className="flex flex-wrap gap-4 text-sm text-zinc-500 font-mono">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {period}
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {location}
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {metrics.map((metric, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-colors group"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                            <span className="text-xs text-zinc-500 uppercase tracking-wider">
                                {metric.label}
                            </span>
                        </div>
                        <span className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                            {metric.value}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Description */}
            <div className="space-y-3">
                {description.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className="flex gap-3 text-zinc-400 text-sm md:text-base leading-relaxed"
                    >
                        <span className="text-emerald-500 mt-1">&#9656;</span>
                        <span>{item}</span>
                    </motion.div>
                ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 pt-2">
                {tech.map((item, idx) => (
                    <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full border border-zinc-800 text-zinc-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
                    >
                        {item}
                    </motion.span>
                ))}
            </div>
        </div>
    );
}

export default function Experience() {
    const timelineData = [
        {
            title: "2024",
            content: (
                <ExperienceContent
                    company="Bharat Datacenter"
                    role="Software Engineer Intern"
                    period="June 2024 - Present"
                    location="New Delhi, India"
                    description={[
                        "Developed scalable backend services and responsive UI components, improving user engagement by 15% and system performance by 25% for 10,000+ daily users.",
                        "Optimized application architecture using data structures and algorithms, reducing page load times by 25% and enhancing system reliability across distributed environments.",
                    ]}
                    metrics={[
                        { label: "User Growth", value: "+15%" },
                        { label: "Performance", value: "+25%" },
                        { label: "Daily Users", value: "10K+" },
                    ]}
                    tech={["Java", "React", "Node.js", "AWS", "PostgreSQL"]}
                />
            ),
        },
        {
            title: "Early 2024",
            content: (
                <ExperienceContent
                    company="DMO"
                    role="Software Engineer Intern"
                    period="March 2024 - June 2024"
                    location="New Delhi, India"
                    description={[
                        "Built enterprise inventory management system using Java, translating user stories into features that processed 500+ SKUs with 40% faster tracking.",
                        "Developed automated test scripts with Postman, achieving 95% code coverage and reducing production bugs by 28% through robust backend validation.",
                    ]}
                    metrics={[
                        { label: "SKUs Processed", value: "500+" },
                        { label: "Faster Tracking", value: "+40%" },
                        { label: "Code Coverage", value: "95%" },
                    ]}
                    tech={["Java", "Spring Boot", "Postman", "MySQL", "REST APIs"]}
                />
            ),
        },
    ];

    return (
        <section id="experience" className="relative bg-[#0a0a0a]">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <Timeline data={timelineData} />
        </section>
    );
}