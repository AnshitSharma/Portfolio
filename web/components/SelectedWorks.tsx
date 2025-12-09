"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

const projects = [
    {
        title: "Middle Finance",
        description: "Platform handling 500+ daily transactions with 99.8% accuracy and 42% faster APIs using ACID workflows and JWT authentication.",
        tech: ["React.js", "Node.js", "MongoDB"],
        link: "https://middle-finance-six.vercel.app/",
        image: "/middle-finance.png",
    },
    {
        title: "Infrastructure Management System",
        description: "Manages 1000+ IT assets with 30% fewer inconsistencies and 99.5% uptime.",
        tech: ["React.js", "Python", "MySQL"],
        link: "https://github.com/AnshitSharma/IMS-Frontend",
        image: "/infra-system-v2.png",
    },
    {
        title: "Mindscape",
        description: "Serves 300+ users with 85% retention and 45% lower latency, maintaining 99.9% uptime.",
        tech: ["React.js", "TypeScript", "TailwindCSS"],
        link: "https://mindscape-sepia.vercel.app/",
        image: "/mindscape-v2.png",
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
                    <h2 className="text-4xl md:text-7xl font-serif text-zinc-100 mb-6 tracking-tight">Selected Works</h2>
                    <div className="h-[1px] w-24 bg-zinc-800" />
                </motion.div>
            </div>

            <div className="flex flex-col items-center gap-20">
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

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0 w-full px-4 md:px-0">
            <motion.div
                style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
                className="relative flex flex-col w-full max-w-[1200px] h-[600px] origin-top"
            >
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="group relative w-full h-full rounded-[2rem] bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full justify-end p-8 md:p-14" style={{ transform: "translateZ(50px)" }}>
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div className="max-w-3xl">
                                <h3 className="text-4xl md:text-8xl font-bold text-white mb-6 leading-[0.9] tracking-tight">
                                    {project.title}
                                </h3>

                                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-8 max-w-2xl font-light">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    {project.tech.map((t: string, i: number) => (
                                        <span
                                            key={i}
                                            className="px-4 py-2 text-sm uppercase tracking-wider text-zinc-300 border border-white/20 rounded-full bg-white/5 backdrop-blur-md"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn flex items-center gap-3 px-6 py-4 bg-white text-black rounded-full hover:bg-zinc-200 transition-all font-medium"
                            >
                                View Project
                                <ArrowUpRight className="w-5 h-5 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};
