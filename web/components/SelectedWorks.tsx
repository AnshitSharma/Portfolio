"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const projects = [
    {
        title: "Middle Finance",
        description: "Financial platform processing 500+ daily transactions with 99.8% accuracy using ACID transactions and JWT authentication.",
        tech: ["React.js", "Node.js", "MongoDB"],
        link: "https://github.com/AnshitSharma",
        color: "from-blue-500/10 to-purple-500/10",
        border: "group-hover:border-blue-500/50"
    },
    {
        title: "Infrastructure Management System",
        description: "IT asset tracking system managing 1000+ devices, reducing inconsistencies by 30% and maintaining 99.5% uptime.",
        tech: ["React.js", "Python", "PostgreSQL"],
        link: "https://github.com/AnshitSharma",
        color: "from-emerald-500/10 to-teal-500/10",
        border: "group-hover:border-emerald-500/50"
    },
    {
        title: "Mindscape",
        description: "Wellness platform serving 300+ users with 85% retention rate and backend infrastructure achieving 99.9% uptime.",
        tech: ["React.js", "TypeScript", "TailwindCSS"],
        link: "https://github.com/AnshitSharma",
        color: "from-orange-500/10 to-rose-500/10",
        border: "group-hover:border-orange-500/50"
    }
];

export default function SelectedWorks() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <section ref={container} className="relative mt-32 mb-32 px-6">
            <div className="mb-20 px-6 md:px-12 lg:px-24 max-w-[100rem] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-zinc-100 mb-6">Selected Works</h2>
                    <div className="h-[1px] w-24 bg-zinc-800" />
                </motion.div>
            </div>

            <div className="flex flex-col items-center gap-10">
                {projects.map((project, i) => {
                    const targetScale = 1 - ((projects.length - i) * 0.05);
                    return (
                        <Card
                            key={i}
                            i={i}
                            project={project}
                            progress={scrollYProgress}
                            range={[i * 0.25, 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </section>
    );
}

const Card = ({ i, project, progress, range, targetScale }: any) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const scale = useTransform(progress, range, [1, targetScale]);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0 w-full">
            <motion.div
                style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
                className="relative flex flex-col w-full max-w-[1000px] h-[500px] origin-top"
            >
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={`group relative w-full h-full rounded-3xl bg-zinc-900/80 border border-zinc-800/50 backdrop-blur-xl overflow-hidden transition-colors duration-500 ${project.border}`}
                >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full p-8 md:p-12" style={{ transform: "translateZ(50px)" }}>
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-3xl md:text-4xl font-medium text-zinc-100 group-hover:text-white transition-colors">
                                {project.title}
                            </h3>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all hover:scale-110"
                            >
                                <ArrowUpRight className="w-6 h-6" />
                            </a>
                        </div>

                        <p className="text-lg text-zinc-400 leading-relaxed mb-auto max-w-2xl group-hover:text-zinc-300 transition-colors">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-3 mt-8">
                            {project.tech.map((t: string, i: number) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 text-sm uppercase tracking-wider text-zinc-500 border border-zinc-800 rounded-full bg-zinc-900/50 group-hover:border-zinc-700 group-hover:text-zinc-300 transition-all"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};
