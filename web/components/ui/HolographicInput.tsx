"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, AlertCircle } from "lucide-react";

interface HolographicInputProps {
    label: string;
    name: string;
    type: "text" | "email" | "textarea";
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
    placeholder?: string;
}

export default function HolographicInput({
    label,
    name,
    type,
    value,
    onChange,
    required,
    placeholder
}: HolographicInputProps) {
    const [focused, setFocused] = useState(false);
    const isFilled = value.length > 0;

    return (
        <div className="relative group mb-6">
            <div className="flex justify-between items-end mb-2">
                <label className={`text-sm font-mono tracking-wider transition-colors duration-300 ${focused ? 'text-emerald-400' : 'text-zinc-500'}`}>
                    <span className="text-emerald-500 mr-2">{">"}</span>
                    {label}
                </label>
                <AnimatePresence>
                    {focused && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="text-xs font-mono text-emerald-500/50"
                        >
                            [INPUT_ACTIVE]
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            <div className="relative">
                {/* Holographic Background */}
                <div className={`absolute inset-0 bg-emerald-500/5 rounded-lg transition-opacity duration-300 ${focused ? 'opacity-100' : 'opacity-0'}`} />

                {/* Border Container */}
                <div className={`absolute inset-0 border rounded-lg transition-colors duration-300 ${focused ? 'border-emerald-500/50' : 'border-zinc-800'}`} />

                {/* Scanline Effect */}
                {focused && (
                    <motion.div
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent skew-x-12 pointer-events-none"
                    />
                )}

                {/* Input Element */}
                {type === "textarea" ? (
                    <textarea
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        required={required}
                        placeholder={placeholder}
                        rows={5}
                        className="relative w-full bg-transparent text-zinc-100 px-4 py-3 outline-none resize-none font-mono placeholder:text-zinc-700 z-10 custom-scrollbar"
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        required={required}
                        placeholder={placeholder}
                        className="relative w-full bg-transparent text-zinc-100 px-4 py-3 outline-none font-mono placeholder:text-zinc-700 z-10"
                    />
                )}

                {/* Corner Accents */}
                <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors duration-300 ${focused ? 'border-emerald-400' : 'border-zinc-700'}`} />
                <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors duration-300 ${focused ? 'border-emerald-400' : 'border-zinc-700'}`} />
                <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-colors duration-300 ${focused ? 'border-emerald-400' : 'border-zinc-700'}`} />
                <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors duration-300 ${focused ? 'border-emerald-400' : 'border-zinc-700'}`} />
            </div>
        </div>
    );
}
