"use client";

import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";

const experiences = [
    {
        company: "Bharat Datacenter",
        role: "Software Engineer Intern",
        period: "June 2024 - Present",
        location: "New Delhi, India",
        description: [
            "Developed scalable backend services and responsive UI components, improving user engagement by 15% and system performance by 25% for 10,000+ daily users.",
            "Optimized application architecture using data structures and algorithms, reducing page load times by 25% and enhancing system reliability across distributed environments."
        ]
    },
    {
        company: "DMO",
        role: "Software Engineer Intern",
        period: "March 2024 - June 2024",
        location: "New Delhi, India",
        description: [
            "Built enterprise inventory management system using Java, translating user stories into features that processed 500+ SKUs with 40% faster tracking.",
            "Developed automated test scripts with Postman, achieving 95% code coverage and reducing production bugs by 28% through robust backend validation."
        ]
    }
];

export default function Experience() {
    return (
        <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[100rem] mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-20"
            >
                <h2 className="text-4xl md:text-6xl font-serif text-zinc-100 mb-6">Experience</h2>
                <div className="h-[1px] w-24 bg-zinc-800" />
            </motion.div>

            <div className="grid grid-cols-1 gap-12 md:gap-16 relative">
                {/* Connecting Line (Visual only, simplified for card layout) */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent hidden md:block" />

                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                    >
                        {/* Card Side */}
                        <div className="w-full md:w-1/2 perspective-1000">
                            <ExperienceCard {...exp} />
                        </div>

                        {/* Timeline Dot (Center) */}
                        <div className="relative hidden md:flex items-center justify-center w-8 h-8">
                            <div className="w-3 h-3 rounded-full bg-zinc-100 shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10" />
                            <div className="absolute w-8 h-8 rounded-full bg-zinc-800/50 animate-ping opacity-20" />
                        </div>

                        {/* Empty Side for Balance */}
                        <div className="w-full md:w-1/2 hidden md:block" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
