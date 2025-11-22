"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import {
    SiReact, SiNodedotjs, SiTypescript, SiJavascript, SiPython,
    SiMongodb, SiPostgresql, SiDocker, SiGit, SiTailwindcss,
    SiNextdotjs, SiHtml5, SiCss3, SiMysql, SiCplusplus
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const skills = [
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "C++", icon: SiCplusplus, color: "#00599C" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6" },
];

function SkillCard({ skill, index }: { skill: typeof skills[0], index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        x.set(clientX - left);
        y.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onMouseMove={onMouseMove}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            className="group relative flex flex-col items-center justify-center p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl overflow-hidden hover:bg-zinc-800/50 transition-colors"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <skill.icon
                className="w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2"
                style={{ color: skill.color }}
            />

            <span className="text-zinc-400 font-medium tracking-wide group-hover:text-zinc-100 transition-colors">
                {skill.name}
            </span>
        </motion.div>
    );
}

export default function Skills() {
    return (
        <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[100rem] mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-20"
            >
                <h2 className="text-4xl md:text-6xl font-serif text-zinc-100 mb-6">Technical Arsenal</h2>
                <div className="h-[1px] w-24 bg-zinc-800" />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {skills.map((skill, index) => (
                    <SkillCard key={index} skill={skill} index={index} />
                ))}
            </div>
        </section>
    );
}
