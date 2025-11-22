"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
            <div className="max-w-[100rem] z-10 mt-20">
                {/* Role Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex items-center gap-4 mb-8"
                >
                    <div className="h-[1px] w-12 bg-zinc-500" />
                    <span className="text-sm md:text-base tracking-[0.2em] uppercase text-zinc-400 font-medium">
                        Frontend Developer & UI Designer
                    </span>
                </motion.div>

                {/* Massive Typography Name */}
                <div className="flex flex-col leading-[0.85] tracking-tighter">
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="text-[12vw] md:text-[11vw] font-serif font-medium text-zinc-100 mix-blend-difference"
                        >
                            ANSHIT
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden self-end md:self-auto md:ml-[15vw]">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="text-[12vw] md:text-[11vw] font-sans font-bold text-zinc-100 mix-blend-difference"
                        >
                            SHARMA
                        </motion.h1>
                    </div>
                </div>

                {/* Bottom Details */}
                <div className="flex flex-col md:flex-row justify-between items-end mt-12 md:mt-24 gap-8">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="max-w-md text-lg md:text-xl text-zinc-400 font-light leading-relaxed"
                    >
                        Based in <span className="text-zinc-100 font-medium">New Delhi</span>.
                        Creating digital experiences that blend <span className="italic font-serif">aesthetics</span> with function.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex items-center gap-4"
                    >
                        <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center animate-bounce">
                            <ArrowDown className="w-5 h-5 text-zinc-400" />
                        </div>
                        <span className="text-sm text-zinc-500 uppercase tracking-widest hidden md:block">Scroll</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
