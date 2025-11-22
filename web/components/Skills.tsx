"use client";

import { motion } from "framer-motion";
import {
    SiReact, SiNodedotjs, SiTypescript, SiJavascript, SiPython,
    SiMongodb, SiPostgresql, SiDocker, SiGit, SiTailwindcss,
    SiNextdotjs, SiHtml5, SiCss3, SiMysql, SiCplusplus
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import SkillsOrbit from "./SkillsOrbit";

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

export default function Skills() {
    return (
        <section className="py-20 relative overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="w-full"
            >
                <SkillsOrbit skills={skills} />
            </motion.div>
        </section>
    );
}
