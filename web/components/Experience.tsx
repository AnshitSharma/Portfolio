"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

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

            <div className="relative border-l border-zinc-800 ml-4 md:ml-12 space-y-16">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        className="relative pl-8 md:pl-16"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-100 ring-4 ring-zinc-900" />

                        <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-4">
                            <h3 className="text-2xl md:text-3xl font-medium text-zinc-100">{exp.company}</h3>
                            <span className="text-lg text-zinc-400 font-light">{exp.role}</span>
                        </div>

                        <div className="flex flex-wrap gap-6 text-sm text-zinc-500 uppercase tracking-wider mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {exp.period}
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {exp.location}
                            </div>
                        </div>

                        <ul className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl list-disc list-outside ml-4">
                            {exp.description.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
