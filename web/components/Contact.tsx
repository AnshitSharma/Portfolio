"use client";

import { useState, useRef, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    AnimatePresence
} from "framer-motion";
import {
    Mail, Terminal, Minimize2, Maximize2, X,
    Cpu, Wifi, Battery, Globe
} from "lucide-react";
import ParticleField from "./ui/ParticleField";
import HolographicInput from "./ui/HolographicInput";
import MagneticButton from "./ui/MagneticButton";

// Types
type FormState = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export default function Contact() {
    // Form State
    const [formState, setFormState] = useState<FormState>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");
    const [konamiActive, setKonamiActive] = useState(false);

    // Refs & Scroll Animations
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [10, -10]);

    // Konami Code
    useEffect(() => {
        const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
        let konamiIndex = 0;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    setKonamiActive(true);
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage("");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "326683c0-ff35-4da5-94f8-a0d89c4b8a86",
                    ...formState,
                    from_name: "Portfolio Contact Form",
                    botcheck: false,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                setFormState({ name: "", email: "", subject: "", message: "" });
                setTimeout(() => setStatus('idle'), 6000);
            } else {
                setStatus('error');
                setErrorMessage(result.message || "Transmission failed.");
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage("Network error. Check connection.");
        }
    };

    return (
        <section
            ref={containerRef}
            id="contact"
            className="relative min-h-screen py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden bg-[#030303] perspective-1000"
        >
            {/* Background Effects */}
            <ParticleField />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            {/* Konami Easter Egg Overlay */}
            <AnimatePresence>
                {konamiActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center"
                        onClick={() => setKonamiActive(false)}
                    >
                        <h1 className="text-6xl font-bold text-emerald-500 font-mono glitch-text">GOD MODE ACTIVATED</h1>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                style={{ y, opacity, scale, rotateX }}
                className="relative w-full max-w-6xl z-10"
            >
                {/* Terminal Window Frame */}
                <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl rounded-xl border border-zinc-800 shadow-2xl overflow-hidden">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                            </div>
                            <div className="ml-4 flex items-center gap-2 text-xs font-mono text-zinc-500">
                                <Terminal className="w-3 h-3" />
                                <span>user@portfolio:~/contact-form</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-zinc-600">
                            <Wifi className="w-4 h-4" />
                            <Battery className="w-4 h-4" />
                            <span className="text-xs font-mono">v2.0.77</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
                        {/* Left Panel: Info & Visuals */}
                        <div className="lg:col-span-5 p-8 md:p-12 bg-zinc-900/30 border-r border-zinc-800 relative overflow-hidden flex flex-col gap-12">
                            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />

                            <div className="relative z-10 space-y-8">
                                <div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        SYSTEM ONLINE
                                    </motion.div>
                                    <h2 className="text-4xl md:text-5xl font-bold font-outfit text-white mb-4 tracking-tight">
                                        INITIALIZE<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">CONNECTION</span>
                                    </h2>
                                    <p className="text-zinc-400 font-mono text-sm leading-relaxed">
                                        Establish a secure link. Whether for collaboration, inquiries, or just to say hello.
                                    </p>
                                </div>
                            </div>

                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-colors group">
                                    <div className="w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-zinc-500 font-mono">TARGET_EMAIL</div>
                                        <div className="text-sm font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">anshitsharma@example.com</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-colors group">
                                    <div className="w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-zinc-500 font-mono">LOCATION_NODE</div>
                                        <div className="text-sm font-bold text-zinc-200 group-hover:text-cyan-400 transition-colors">Remote / Worldwide</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel: Form */}
                        <div className="lg:col-span-7 p-8 md:p-12 relative bg-[#050505]">
                            <div className="absolute top-0 right-0 p-4 opacity-12">
                                <Cpu className="w-24 h-24 text-emerald-500" />
                            </div>

                            <form onSubmit={handleSubmit} className="relative z-10 space-y-2">
                                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <HolographicInput
                                        label="IDENTITY"
                                        name="name"
                                        type="text"
                                        value={formState.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                    />
                                    <HolographicInput
                                        label="FREQUENCY"
                                        name="email"
                                        type="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <HolographicInput
                                    label="DIRECTIVE"
                                    name="subject"
                                    type="text"
                                    value={formState.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="Project Collaboration"
                                />

                                <div className="mb-8">
                                    <HolographicInput
                                        label="DATA_PACKET"
                                        name="message"
                                        type="textarea"
                                        value={formState.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your message sequence..."
                                    />
                                </div>

                                <div className="pt-4">
                                    <MagneticButton status={status} />
                                </div>

                                <AnimatePresence>
                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-4 text-red-400 text-sm font-mono flex items-center gap-2"
                                        >
                                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                            ERROR: {errorMessage}
                                        </motion.div>
                                    )}
                                    {status === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-4 text-emerald-400 text-sm font-mono flex items-center gap-2"
                                        >
                                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                            TRANSMISSION_COMPLETE
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
