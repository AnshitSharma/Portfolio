"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface MagneticButtonProps {
    status: 'idle' | 'submitting' | 'success' | 'error';
}

export default function MagneticButton({ status }: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = ref.current!.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set(distanceX * 0.2);
        y.set(distanceY * 0.2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.button
            ref={ref}
            type="submit"
            disabled={status !== 'idle'}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="relative w-full group"
        >
            {/* Glow Effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500 ${status === 'submitting' ? 'animate-pulse opacity-30' : ''}`} />

            {/* Button Container */}
            <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-emerald-500/50">
                {/* Glitch Overlay */}
                <div className="absolute inset-0 bg-emerald-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                <div className="relative px-8 py-4 flex items-center justify-center gap-3">
                    {status === 'submitting' ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                            <span className="font-mono font-bold text-emerald-400 tracking-widest">INITIALIZING...</span>
                        </>
                    ) : status === 'success' ? (
                        <>
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            <span className="font-mono font-bold text-emerald-400 tracking-widest">TRANSMITTED</span>
                        </>
                    ) : status === 'error' ? (
                        <>
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span className="font-mono font-bold text-red-400 tracking-widest">FAILED</span>
                        </>
                    ) : (
                        <>
                            <span className="font-mono font-bold text-white group-hover:text-emerald-400 transition-colors tracking-widest">
                                INITIATE_TRANSMISSION
                            </span>
                            <Send className="w-4 h-4 text-white group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </>
                    )}
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500/0 group-hover:border-emerald-500 transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500/0 group-hover:border-emerald-500 transition-colors duration-300" />
            </div>
        </motion.button>
    );
}
