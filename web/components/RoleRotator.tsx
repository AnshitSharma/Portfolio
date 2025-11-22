"use client";

import { useState, useEffect } from "react";
import ScrambleText from "./ScrambleText";

const ROLES = [
    "Full Stack Developer",
    "Software Engineer",
    "UI/UX Designer",
    "Open Source Contributor"
];

export default function RoleRotator() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % ROLES.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <ScrambleText
            text={ROLES[index]}
            className="text-sm md:text-base tracking-[0.2em] uppercase text-zinc-400 font-medium min-w-[280px] inline-block"
        />
    );
}
