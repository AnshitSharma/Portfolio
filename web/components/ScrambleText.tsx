"use client";

import { useEffect, useRef, useState } from "react";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

type Props = {
    text: string;
    className?: string;
};

export default function ScrambleText({ text, className }: Props) {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
        let pos = 0;

        intervalRef.current = setInterval(() => {
            const scrambled = text
                .split("")
                .map((char, index) => {
                    if (pos / CYCLES_PER_LETTER > index) {
                        return char;
                    }

                    const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
                    return randomChar;
                })
                .join("");

            setDisplayText(scrambled);
            pos++;

            if (pos >= text.length * CYCLES_PER_LETTER) {
                clearInterval(intervalRef.current!);
            }
        }, SHUFFLE_TIME);

        return () => clearInterval(intervalRef.current!);
    }, [text]);

    return <span className={className}>{displayText}</span>;
}
