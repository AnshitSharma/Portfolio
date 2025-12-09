"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";


export default function Navbar() {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const viewportHeight = window.innerHeight;
        // Show navbar after scrolling past 80% of the viewport (past hero)
        if (latest > viewportHeight * 0.8) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    });

    const navLinks = [
        { name: "Home", href: "#hero" },
        { name: "Work", href: "#work" },
        { name: "Skills", href: "#skills" },
        { name: "Contact", href: "#contact" },
        { name: "Resume", href: "https://drive.google.com/file/d/1VoXJA6BPGrDrP6JHqNkmw4tQR3eF67jH/view?usp=drive_link" },
    ];

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.replace("#", "");
            const elem = document.getElementById(targetId);
            elem?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{
                y: isVisible ? 0 : -100,
                opacity: isVisible ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 pointer-events-none"
        >
            <div className="pointer-events-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2 flex items-center gap-1 shadow-lg shadow-black/10 ring-1 ring-white/5">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleClick(e, link.href)}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-full transition-all duration-300 uppercase tracking-widest text-[11px]"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </motion.nav>
    );
}
