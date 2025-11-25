"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "326683c0-ff35-4da5-94f8-a0d89c4b8a86",
                    name: formState.name,
                    email: formState.email,
                    message: formState.message,
                    subject: "New Portfolio Contact Form Submission",
                    from_name: "Portfolio Contact Form",
                    botcheck: false,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setIsSuccess(true);
                setFormState({ name: "", email: "", message: "" });
            } else {
                setError(result.message || "Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("Failed to send message. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[100rem] mx-auto relative overflow-hidden" id="contact">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/10 via-zinc-950 to-zinc-950 -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                        Let's Connect
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                        Have a project in mind or just want to say hi? I'm always open to discussing new ideas and opportunities.
                    </p>

                    <div className="flex flex-col gap-4 mt-8">
                        <div className="flex items-center gap-4 text-zinc-300">
                            <div className="w-12 h-12 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-emerald-400">
                                <Send className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm text-zinc-500">Email Me</div>
                                <div className="font-medium">anshitsharma@example.com</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50" />
                    <form
                        onSubmit={handleSubmit}
                        className="relative p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm space-y-6"
                    >
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12 space-y-4"
                            >
                                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                                <p className="text-zinc-400">Thanks for reaching out. I'll get back to you soon.</p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="text-emerald-400 hover:text-emerald-300 text-sm font-medium mt-4"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-zinc-300 ml-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formState.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-zinc-100 placeholder:text-zinc-600"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-zinc-300 ml-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formState.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-zinc-100 placeholder:text-zinc-600"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-zinc-300 ml-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        value={formState.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-zinc-100 placeholder:text-zinc-600 resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                                        <AlertCircle className="w-4 h-4" />
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </>
                        )}
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
