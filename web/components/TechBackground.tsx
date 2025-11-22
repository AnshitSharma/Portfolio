"use client";

import { useEffect, useRef } from "react";

export default function TechBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", resize);
        resize();

        // Configuration
        const gridSpacing = 40;
        const streamCount = 15;
        const streams: { x: number; y: number; speed: number; length: number; chars: string[] }[] = [];

        // Initialize streams
        const chars = "0123456789ABCDEF";
        for (let i = 0; i < streamCount; i++) {
            streams.push({
                x: Math.random() * width,
                y: Math.random() * height,
                speed: 1 + Math.random() * 3,
                length: 10 + Math.random() * 20,
                chars: Array.from({ length: 30 }, () => chars[Math.floor(Math.random() * chars.length)]),
            });
        }

        const draw = () => {
            ctx.fillStyle = "#0a0a0a";
            ctx.fillRect(0, 0, width, height);

            // Draw Grid
            ctx.strokeStyle = "rgba(40, 40, 60, 0.3)";
            ctx.lineWidth = 1;

            // Perspective Grid
            const time = Date.now() * 0.0005;
            const horizon = height * 0.6;

            // Vertical lines (perspective)
            for (let i = -width; i < width * 2; i += gridSpacing * 2) {
                ctx.beginPath();
                ctx.moveTo(i + (width / 2 - i) * 0.5, horizon);
                ctx.lineTo(i - (width / 2 - i) * 2, height);
                ctx.stroke();
            }

            // Horizontal lines (moving)
            const offset = (Date.now() * 0.05) % gridSpacing;
            for (let y = horizon; y < height; y += gridSpacing * 0.5 + (y - horizon) * 0.1) {
                const yPos = y + offset * ((y - horizon) / height);
                if (yPos > height) continue;

                ctx.beginPath();
                ctx.moveTo(0, yPos);
                ctx.lineTo(width, yPos);
                ctx.stroke();
            }

            // Draw Data Streams
            ctx.font = "12px monospace";
            streams.forEach((stream) => {
                stream.y += stream.speed;
                if (stream.y > height + 100) {
                    stream.y = -100;
                    stream.x = Math.random() * width;
                }

                for (let i = 0; i < stream.length; i++) {
                    const charY = stream.y - i * 14;
                    const alpha = 1 - i / stream.length;

                    if (i === 0) {
                        ctx.fillStyle = `rgba(200, 255, 255, ${alpha})`; // Head is bright
                    } else {
                        ctx.fillStyle = `rgba(0, 150, 255, ${alpha * 0.5})`; // Tail is dim blue
                    }

                    // Randomly flip characters
                    if (Math.random() > 0.95) {
                        stream.chars[i] = chars[Math.floor(Math.random() * chars.length)];
                    }

                    ctx.fillText(stream.chars[i], stream.x, charY);
                }
            });

            // Vignette
            const gradient = ctx.createRadialGradient(width / 2, height / 2, height * 0.4, width / 2, height / 2, height);
            gradient.addColorStop(0, "transparent");
            gradient.addColorStop(1, "rgba(10, 10, 10, 0.9)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 opacity-40 pointer-events-none" />;
}
