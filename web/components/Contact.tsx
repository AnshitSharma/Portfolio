"use client";

import { useState, useRef, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    useMotionTemplate,
    AnimatePresence
} from "framer-motion";
import {
    Send, Loader2, CheckCircle2, AlertCircle, XCircle,
    Mail, User, Tag, MessageSquare, Sparkles
} from "lucide-react";
import CyberCube from "./ui/CyberCube";

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
    const [focusedField, setFocusedField] = useState<string | null>(null);

    // Refs & Scroll Animations
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

    // Mouse Parallax for Background
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set(clientX / innerWidth);
            mouseY.set(clientY / innerHeight);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const bgX = useTransform(mouseX, [0, 1], ["-10%", "10%"]);
    const bgY = useTransform(mouseY, [0, 1], ["-10%", "10%"]);

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
            className="relative min-h-screen py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden bg-[#030303]"
        >
            {/* Dynamic Background */}
            <motion.div
                style={{ x: bgX, y: bgY }}
                className="absolute inset-[-20%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_50%)] blur-3xl pointer-events-none"
            />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            {/* Digital Rain / Grid Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <motion.div
                style={{ y, opacity, scale }}
                className="relative w-full max-w-7xl z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
                {/* Left Side: Immersive Text */}
                <div className="space-y-10 lg:pr-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
                                <CyberCube />
                            </div>
                            <h2 className="text-6xl md:text-7xl font-bold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-zinc-500 tracking-tighter">
                                LET'S<br />CONNECT
                            </h2>
                        </div>

                        <p className="text-zinc-400 font-mono text-lg md:text-xl leading-relaxed max-w-lg">
                            <span className="text-emerald-500 mr-3">&gt;</span>
                            Initiate a secure connection. Whether it's a project inquiry or a digital handshake, I'm online.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="group flex items-center gap-5 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:border-emerald-500/30 hover:bg-zinc-900/50 transition-all duration-500 cursor-pointer backdrop-blur-sm">
                            <div className="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-emerald-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-500">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-xs text-zinc-500 font-mono tracking-widest mb-1">DIRECT CHANNEL</div>
                                <div className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">anshitsharma@example.com</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-emerald-500/20 font-mono text-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            SYSTEM_STATUS: ONLINE_READY
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Premium Form Card */}
                <TiltCard>
                    <div className="relative bg-[#050505]/80 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-white/5 shadow-2xl shadow-black/50 overflow-hidden">
                        {/* Animated Border Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 opacity-50 pointer-events-none" />

                        <form onSubmit={handleSubmit} className="relative space-y-8 z-10">
                            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <PremiumInput
                                    label="NAME"
                                    name="name"
                                    type="text"
                                    value={formState.name}
                                    onChange={handleChange}
                                    focused={focusedField === 'name'}
                                    setFocused={setFocusedField}
                                    required
                                />
                                <PremiumInput
                                    label="EMAIL"
                                    name="email"
                                    type="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    focused={focusedField === 'email'}
                                    setFocused={setFocusedField}
                                    required
                                />
                            </div>

                            <PremiumInput
                                label="SUBJECT"
                                name="subject"
                                type="text"
                                value={formState.subject}
                                onChange={handleChange}
                                focused={focusedField === 'subject'}
                                setFocused={setFocusedField}
                                required
                            />

                            <div className="space-y-2">
                                <PremiumInput
                                    label="MESSAGE"
                                    name="message"
                                    type="textarea"
                                    value={formState.message}
                                    onChange={handleChange}
                                    focused={focusedField === 'message'}
                                    setFocused={setFocusedField}
                                    required
                                />
                                <div className="flex justify-end">
                                    <span className={`text-xs font-mono ${formState.message.length > 900 ? 'text-red-400' : 'text-zinc-600'}`}>
                                        {formState.message.length}/1000
                                    </span>
                                </div>
                            </div>

                            <PremiumButton status={status} />

                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center text-center p-8 rounded-3xl z-20"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                            className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6"
                                        >
                                            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                                        </motion.div>
                                        <h3 className="text-3xl font-bold text-white mb-2">Message Sent</h3>
                                        <p className="text-zinc-400">Transmission successful. I'll respond shortly.</p>
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3"
                                    >
                                        <AlertCircle className="w-5 h-5 text-red-400" />
                                        <p className="text-red-400 text-sm">{errorMessage}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>
                </TiltCard>
            </motion.div>
        </section>
    );
}

// --- Sub-Components ---

function TiltCard({ children }: { children: React.ReactNode }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative perspective-1000"
        >
            {children}
        </motion.div>
    );
}

function PremiumInput({
    label, name, type, value, onChange, focused, setFocused, required
}: {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    focused: boolean;
    setFocused: (name: string | null) => void;
    required?: boolean;
}) {
    const isFilled = value.length > 0;
    const isActive = focused || isFilled;

    return (
        <div className="relative group">
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg opacity-0 transition-opacity duration-500 ${focused ? 'opacity-30 blur-md' : ''}`} />

            <div className="relative bg-zinc-950 rounded-lg border border-zinc-800 transition-colors duration-300 group-hover:border-zinc-700">
                {type === 'textarea' ? (
                    <textarea
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={() => setFocused(name)}
                        onBlur={() => setFocused(null)}
                        required={required}
                        rows={5}
                        className="w-full bg-transparent text-white px-4 py-4 pt-6 outline-none resize-none custom-scrollbar"
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={() => setFocused(name)}
                        onBlur={() => setFocused(null)}
                        required={required}
                        className="w-full bg-transparent text-white px-4 py-4 pt-6 outline-none"
                    />
                )}

                {/* Floating Label */}
                <motion.label
                    initial={false}
                    animate={{
                        y: isActive ? -8 : 16,
                        x: isActive ? 0 : 16,
                        scale: isActive ? 0.75 : 1,
                        color: focused ? '#34d399' : '#71717a' // emerald-400 : zinc-500
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-4 top-0 pointer-events-none font-mono tracking-wider origin-top-left"
                >
                    {label}
                </motion.label>

                {/* Magnetic Bottom Border */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-800 overflow-hidden">
                    <motion.div
                        initial={false}
                        animate={{
                            scaleX: focused ? 1 : 0,
                            opacity: focused ? 1 : 0
                        }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="w-full h-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent origin-center"
                    />
                </div>
            </div>
        </div>
    );
}

function PremiumButton({ status }: { status: 'idle' | 'submitting' | 'success' | 'error' }) {
    return (
        <button
            type="submit"
            disabled={status !== 'idle'}
            className="relative w-full group overflow-hidden rounded-xl p-[1px]"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 animate-shimmer opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative bg-zinc-950 rounded-xl px-8 py-4 transition-all duration-300 group-hover:bg-zinc-900/90">
                <div className="flex items-center justify-center gap-3">
                    {status === 'submitting' ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                            <span className="text-emerald-400 font-bold tracking-widest">INITIALIZING...</span>
                        </>
                    ) : (
                        <>
                            <span className="text-white font-bold tracking-widest group-hover:text-emerald-400 transition-colors">
                                INITIATE TRANSMISSION
                            </span>
                            <Send className="w-5 h-5 text-white group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-emerald-400 transition-all duration-300" />
                        </>
                    )}
                </div>

                {/* Particle Burst Effect (Simulated with CSS/SVG) */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
                    <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
                </div>
            </div>
        </button>
    );
}
