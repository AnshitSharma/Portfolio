"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
    return (
        <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[100rem] mx-auto min-h-[80vh] flex flex-col justify-between">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl md:text-6xl font-serif text-zinc-100 mb-6">Let's Connect</h2>
                <div className="h-[1px] w-24 bg-zinc-800" />
            </motion.div>

            <div className="flex flex-col gap-12">
                <motion.a
                    href="mailto:anshitsharma82002@gmail.com"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="group flex items-center gap-4 md:gap-8 text-[6vw] md:text-[5vw] font-bold text-zinc-300 hover:text-white transition-colors tracking-tighter leading-none"
                >
                    <span>anshitsharma82002@gmail.com</span>
                    <ArrowUpRight className="w-[4vw] h-[4vw] opacity-50 group-hover:opacity-100 group-hover:translate-x-4 group-hover:-translate-y-4 transition-all duration-500" />
                </motion.a>

                <div className="flex gap-8 md:gap-16 text-sm md:text-base uppercase tracking-widest text-zinc-500">
                    <a href="https://linkedin.com/in/anshitsharma" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="https://github.com/AnshitSharma" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                    <a href="#" className="hover:text-white transition-colors">Resume</a>
                </div>
            </div>

            <div className="flex justify-between items-end text-xs text-zinc-800 uppercase tracking-widest">
                <span>© 2024 Anshit Sharma</span>
                <span>New Delhi, India</span>
            </div>
        </section>
    );
}
