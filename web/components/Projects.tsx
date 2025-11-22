"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
    {
        title: "Middle Finance",
        description: "Financial platform processing 500+ daily transactions with 99.8% accuracy using ACID transactions and JWT authentication.",
        tech: ["React.js", "Node.js", "MongoDB"],
        link: "https://github.com/AnshitSharma", // Placeholder link
    },
    {
        title: "Infrastructure Management System",
        description: "IT asset tracking system managing 1000+ devices, reducing inconsistencies by 30% and maintaining 99.5% uptime.",
        tech: ["React.js", "Python", "PostgreSQL"],
        link: "https://github.com/AnshitSharma",
    },
    {
        title: "Mindscape",
        description: "Wellness platform serving 300+ users with 85% retention rate and backend infrastructure achieving 99.9% uptime.",
        tech: ["React.js", "TypeScript", "TailwindCSS"],
        link: "https://github.com/AnshitSharma",
    }
];

export default function Projects() {
    return (
        <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[100rem] mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-20"
            >
                <h2 className="text-4xl md:text-6xl font-serif text-zinc-100 mb-6">Selected Works</h2>
                <div className="h-[1px] w-24 bg-zinc-800" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group relative p-8 rounded-2xl bg-zinc-900/20 border border-zinc-800/50 hover:bg-zinc-900/40 transition-colors duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl font-medium text-zinc-100 group-hover:text-white transition-colors">{project.title}</h3>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all">
                                    <ArrowUpRight className="w-5 h-5" />
                                </a>
                            </div>

                            <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="px-3 py-1 text-xs uppercase tracking-wider text-zinc-500 border border-zinc-800 rounded-full">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
