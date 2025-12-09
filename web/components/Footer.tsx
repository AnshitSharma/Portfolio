"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Twitter } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            };
            setTime(now.toLocaleTimeString("en-US", options));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const currentYear = new Date().getFullYear();

    return (
        <footer ref={containerRef} className="relative bg-[#050505] overflow-hidden pt-20 pb-10">
            {/* Background Grain */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />



            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                    {/* Brand & Time */}
                    <div className="md:col-span-6 flex flex-col justify-between h-full space-y-8">
                        <div>
                            <h2 className="text-7xl md:text-9xl font-bold font-serif text-zinc-100 tracking-tighter leading-[0.8]">
                                ANSHIT<br />
                                <span className="text-zinc-800">SHARMA</span>
                            </h2>
                        </div>
                        <div className="flex flex-col gap-2 font-mono text-zinc-400">
                            <span className="text-xs uppercase tracking-wider text-emerald-500">Local Time (New Delhi)</span>
                            <span className="text-2xl text-zinc-200">{time}</span>
                        </div>
                    </div>

                    {/* Socials - Enhanced & Minimalistic */}
                    <div className="md:col-span-6 flex flex-col items-end justify-end gap-6">
                        <div className="flex flex-wrap justify-end gap-4">
                            <MagneticSocialLink href="https://github.com/AnshitSharma" label="GITHUB" icon={<Github className="w-5 h-5" />} />
                            <MagneticSocialLink href="https://linkedin.com/in/anshitsharma" label="LINKEDIN" icon={<Linkedin className="w-5 h-5" />} />
                            <MagneticSocialLink href="mailto:anshitsharma82002@gmail.com" label="EMAIL" icon={<Mail className="w-5 h-5" />} />
                            <MagneticSocialLink href="https://twitter.com" label="TWITTER" icon={<Twitter className="w-5 h-5" />} />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col-reverse md:flex-row justify-between items-end border-t border-zinc-900 pt-8 gap-6">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-zinc-500 font-mono">
                            © {currentYear} Anshit Sharma. All rights reserved.
                        </p>
                        <p className="text-xs text-zinc-600 font-mono">
                            Built with Next.js, Tailwind CSS & Framer Motion.
                        </p>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-emerald-500/30 transition-all duration-300"
                    >
                        <span className="text-xs font-mono tracking-widest uppercase">Back to Top</span>
                        <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
}



function MagneticSocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const rect = ref.current!.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set(distanceX * 0.3);
        y.set(distanceY * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="group relative px-6 py-4 bg-zinc-900/30 border border-zinc-800/50 rounded-lg overflow-hidden backdrop-blur-sm"
        >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative flex items-center gap-3">
                <span className="text-zinc-400 group-hover:text-emerald-400 transition-colors duration-300">
                    {icon}
                </span>
                <span className="text-sm font-mono tracking-widest text-zinc-300 group-hover:text-white transition-colors duration-300">
                    {isHovered ? <ScrambleText text={label} /> : label}
                </span>
            </div>
        </motion.a>
    );
}

function ScrambleText({ text }: { text: string }) {
    const [displayText, setDisplayText] = useState(text);
    const CHARS = "!@#$%^&*()_+-=[]{}|;':,./<>?";

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(prev =>
                text.split("")
                    .map((char, index) => {
                        if (index < iteration) return text[index];
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }
            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return <>{displayText}</>;
}
