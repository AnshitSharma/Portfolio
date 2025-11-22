"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { MouseEvent } from "react";

type ExperienceCardProps = {
    company: string;
    role: string;
    period: string;
    location: string;
    description: string[];
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

export default function ExperienceCard({ company, role, period, location, description }: ExperienceCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;

        x.set(xPct);
        y.set(yPct);

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
        mouseX.set(0);
        mouseY.set(0);
    }

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const rotateXSpring = useSpring(rotateX, { stiffness: 300, damping: 30 });
    const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 30 });

    const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateXSpring}deg) rotateY(${rotateYSpring}deg)`;

    const handleMouseMove3D = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!e.currentTarget) return;

        const rect = e.currentTarget.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const rX = (mouseY / height - 0.5) * ROTATION_RANGE * -1;
        const rY = (mouseX / width - 0.5) * ROTATION_RANGE;

        rotateX.set(rX);
        rotateY.set(rY);
    };

    const handleMouseLeave3D = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove3D}
            onMouseLeave={handleMouseLeave3D}
            style={{ transformStyle: "preserve-3d", transform }}
            className="relative h-full w-full rounded-xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm transition-colors hover:bg-zinc-800/50 group"
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
                }}
                onMouseMove={handleMouseMove}
            />

            <div className="relative p-6 md:p-8 flex flex-col h-full" style={{ transform: "translateZ(50px)" }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-white transition-colors">{company}</h3>
                        <span className="text-lg text-zinc-400 font-medium group-hover:text-zinc-300 transition-colors">{role}</span>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-sm text-zinc-500 font-mono uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {period}
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {location}
                        </div>
                    </div>
                </div>

                <ul className="space-y-3 text-zinc-400 leading-relaxed list-disc list-outside ml-4 flex-grow">
                    {description.map((item, i) => (
                        <li key={i} className="group-hover:text-zinc-300 transition-colors">{item}</li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}
