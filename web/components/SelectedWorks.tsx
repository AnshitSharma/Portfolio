"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const projects = [
    {
        title: "Middle Finance",
        subtitle: "Financial Platform",
        description: "Platform handling 500+ daily transactions with 99.8% accuracy and 42% faster APIs using ACID workflows and JWT authentication.",
        tech: ["React.js", "Node.js", "MongoDB"],
        link: "https://middle-finance-six.vercel.app/",
        github: "https://github.com/AnshitSharma",
        image: "/middle-finance.png",
        color: "#10b981",
        year: "2024",
    },
    {
        title: "Infrastructure Management",
        subtitle: "Enterprise System",
        description: "Manages 1000+ IT assets with 30% fewer inconsistencies and 99.5% uptime for enterprise-level infrastructure.",
        tech: ["React.js", "Python", "MySQL"],
        link: "https://github.com/AnshitSharma/IMS-Frontend",
        github: "https://github.com/AnshitSharma/IMS-Frontend",
        image: "/infra-system-v2.png",
        color: "#06b6d4",
        year: "2024",
    },
    {
        title: "Mindscape",
        subtitle: "Wellness Platform",
        description: "Serves 300+ users with 85% retention and 45% lower latency, maintaining 99.9% uptime for mental wellness.",
        tech: ["React.js", "TypeScript", "TailwindCSS"],
        link: "https://mindscape-sepia.vercel.app/",
        github: "https://github.com/AnshitSharma",
        image: "/mindscape-v2.png",
        color: "#8b5cf6",
        year: "2024",
    }
];

export default function SelectedWorks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * 100}%`]);

    // Update active index based on scroll
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const index = Math.round(latest * (projects.length - 1));
            setActiveIndex(Math.min(index, projects.length - 1));
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <section ref={containerRef} className="relative" style={{ height: `${projects.length * 100}vh` }}>
            {/* Fixed Container */}
            <div className="sticky top-0 h-screen overflow-hidden bg-[#050505]">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#0a0a0a]" />

                {/* Animated Background Grid */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }} />
                </div>

                {/* Dynamic Color Accent */}
                <motion.div
                    className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 transition-colors duration-1000"
                    style={{ backgroundColor: projects[activeIndex]?.color }}
                />

                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-20 px-8 md:px-16 py-12">
                    <div className="flex items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-6"
                        >
                            <span className="text-zinc-500 font-mono text-sm tracking-widest">SELECTED WORKS</span>
                            <div className="hidden md:block h-[1px] w-24 bg-gradient-to-r from-zinc-700 to-transparent" />
                        </motion.div>

                        {/* Progress Indicator */}
                        <div className="flex items-center gap-4">
                            <span className="text-zinc-400 font-mono text-sm">
                                <span className="text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
                                <span className="mx-2">/</span>
                                <span>{String(projects.length).padStart(2, '0')}</span>
                            </span>
                            <div className="hidden md:flex gap-1">
                                {projects.map((_, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="h-1 rounded-full transition-all duration-500"
                                        style={{
                                            width: idx === activeIndex ? 32 : 8,
                                            backgroundColor: idx === activeIndex ? projects[activeIndex]?.color : '#3f3f46'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Scrolling Content */}
                <motion.div
                    ref={scrollRef}
                    style={{ x }}
                    className="absolute inset-0 flex items-center"
                >
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={i}
                            project={project}
                            index={i}
                        />
                    ))}
                </motion.div>

                {/* Bottom Navigation Hint */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <span className="text-zinc-600 text-xs uppercase tracking-widest">Scroll to explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-5 h-8 border border-zinc-700 rounded-full flex justify-center pt-2"
                    >
                        <motion.div className="w-1 h-1 bg-zinc-500 rounded-full" />
                    </motion.div>
                </motion.div>

                {/* Side Navigation */}
                <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-20">
                    {projects.map((project, idx) => (
                        <motion.button
                            key={idx}
                            className="group flex items-center gap-3"
                            whileHover={{ x: -4 }}
                        >
                            <span className={`text-xs font-mono transition-colors duration-300 ${idx === activeIndex ? 'text-white' : 'text-zinc-600'}`}>
                                {String(idx + 1).padStart(2, '0')}
                            </span>
                            <motion.div
                                className="h-[2px] rounded-full transition-all duration-500"
                                style={{
                                    width: idx === activeIndex ? 40 : 16,
                                    backgroundColor: idx === activeIndex ? project.color : '#52525b'
                                }}
                            />
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
}

interface ProjectCardProps {
    project: typeof projects[0];
    index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const projectNumber = String(index + 1).padStart(2, '0');

    return (
        <div className="min-w-screen w-screen h-screen flex items-center justify-center px-8 md:px-16 lg:px-24">
            <motion.div
                ref={cardRef}
                className="relative w-full max-w-[1400px] h-[75vh] max-h-[800px]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Main Card Container */}
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden group">
                    {/* Animated Border */}
                    <div className="absolute -inset-[1px] rounded-[2.5rem] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                            background: `linear-gradient(90deg, transparent, ${project.color}40, transparent)`
                        }}
                    />

                    {/* Card Background */}
                    <div className="absolute inset-[1px] rounded-[2.5rem] bg-zinc-900/80 backdrop-blur-xl overflow-hidden">
                        {/* Mouse Spotlight */}
                        <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                                background: isHovered
                                    ? `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, ${project.color}15, transparent 40%)`
                                    : 'none',
                            }}
                        />

                        {/* Content Grid */}
                        <div className="relative h-full grid grid-cols-1 lg:grid-cols-2 gap-0">
                            {/* Left: Project Info */}
                            <div className="relative z-10 flex flex-col justify-between p-8 md:p-12 lg:p-16">
                                {/* Top Section */}
                                <div>
                                    {/* Project Number & Year */}
                                    <motion.div
                                        className="flex items-center gap-4 mb-8"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <span
                                            className="text-6xl md:text-8xl font-bold font-serif opacity-20"
                                            style={{ color: project.color }}
                                        >
                                            {projectNumber}
                                        </span>
                                        <div className="flex flex-col">
                                            <span className="text-zinc-500 text-xs uppercase tracking-widest">{project.subtitle}</span>
                                            <span className="text-zinc-600 text-xs font-mono">{project.year}</span>
                                        </div>
                                    </motion.div>

                                    {/* Title */}
                                    <motion.h3
                                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                    >
                                        {project.title}
                                    </motion.h3>

                                    {/* Description */}
                                    <motion.p
                                        className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md mb-8"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                    >
                                        {project.description}
                                    </motion.p>

                                    {/* Tech Stack */}
                                    <motion.div
                                        className="flex flex-wrap gap-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                    >
                                        {project.tech.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-4 py-2 text-xs uppercase tracking-wider rounded-full border transition-all duration-300 hover:scale-105"
                                                style={{
                                                    borderColor: `${project.color}30`,
                                                    color: project.color,
                                                    backgroundColor: `${project.color}10`
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* Bottom: CTAs */}
                                <motion.div
                                    className="flex items-center gap-4 mt-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                >
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/btn relative flex items-center gap-3 px-6 py-4 rounded-full font-medium overflow-hidden transition-all duration-300"
                                        style={{
                                            backgroundColor: project.color,
                                            color: '#000'
                                        }}
                                    >
                                        <span className="relative z-10 font-semibold">View Live</span>
                                        <ExternalLink className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                    </a>

                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/btn flex items-center gap-3 px-6 py-4 rounded-full font-medium border border-zinc-700 text-white hover:border-zinc-500 transition-all duration-300"
                                    >
                                        <FaGithub className="w-4 h-4" />
                                        <span>Source</span>
                                    </a>
                                </motion.div>
                            </div>

                            {/* Right: Project Image */}
                            <div className="relative hidden lg:block">
                                {/* Floating Image Container */}
                                <motion.div
                                    className="absolute inset-8 rounded-3xl overflow-hidden"
                                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {/* Image Glow */}
                                    <div
                                        className="absolute -inset-4 rounded-3xl blur-2xl opacity-30 transition-opacity duration-500 group-hover:opacity-50"
                                        style={{ backgroundColor: project.color }}
                                    />

                                    {/* Image Frame */}
                                    <div className="relative h-full rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900">
                                        {/* Browser Chrome */}
                                        <div className="absolute top-0 left-0 right-0 h-10 bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-800 flex items-center px-4 z-10">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                            </div>
                                            <div className="flex-1 flex justify-center">
                                                <div className="px-4 py-1 bg-zinc-800/50 rounded-md text-zinc-500 text-xs font-mono truncate max-w-[200px]">
                                                    {project.link.replace('https://', '')}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Project Image */}
                                        <motion.div
                                            className="absolute inset-0 pt-10"
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover object-top transition-transform duration-700"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 via-transparent to-transparent" />
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Floating Elements */}
                                <motion.div
                                    className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 text-xs text-zinc-400 font-mono"
                                    initial={{ opacity: 0, y: -20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                                    Live
                                </motion.div>
                            </div>
                        </div>

                        {/* Corner Decorations */}
                        <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 rounded-tl-xl opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                            style={{ borderColor: project.color }}
                        />
                        <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 rounded-br-xl opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                            style={{ borderColor: project.color }}
                        />
                    </div>
                </div>

                {/* Large Background Number */}
                <div className="absolute -top-20 -left-10 pointer-events-none select-none overflow-hidden">
                    <span
                        className="text-[20rem] md:text-[28rem] font-bold font-serif leading-none opacity-[0.02]"
                        style={{ color: project.color }}
                    >
                        {projectNumber}
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
