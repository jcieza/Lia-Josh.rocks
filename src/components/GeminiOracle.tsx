"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Loader2, Quote } from "lucide-react";
import { POEMS } from "@/lib/constants";

export default function GeminiOracle() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<{ recommendation: string; poemId?: string } | null>(null);

    const handleConsult = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLoading(true);
        setResponse(null);

        try {
            // simulate API call for now, in a real scenario we'd call a Next.js API route
            // that uses the Gemini SDK to analyze sentiment and match with POEMS
            const res = await fetch("/api/oracle", {
                method: "POST",
                body: JSON.stringify({ sentiment: input }),
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error("Error consulting the oracle:", error);
            // Fallback
            setResponse({
                recommendation: "Hoy tu luz brilla con una intensidad especial. Recuerda que no importa el peso, sino la arquitectura de tu alma.",
                poemId: "luz-ciego"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass p-8 rounded-3xl glow-violet max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-neon-violet" size={24} />
                <h2 className="text-xl font-outfit text-white">El Oráculo de Nosotros</h2>
            </div>

            <p className="text-sm text-slate-400 mb-6 italic">
                Escribe cómo te sientes hoy... deja que nuestra historia te responda.
            </p>

            <form onSubmit={handleConsult} className="relative mb-8">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Me siento un poco ansiosa..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 pr-14 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-neon-violet/50 transition-all font-sans"
                />
                <button
                    disabled={loading || !input.trim()}
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-neon-violet rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95 transition-all"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                </button>
            </form>

            <AnimatePresence>
                {response && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 bg-white/5 border border-white/10 rounded-2xl relative"
                    >
                        <Quote className="text-neon-pink absolute top-4 left-4 opacity-20" size={32} />
                        <div className="pl-8">
                            <p className="text-lg font-outfit text-slate-100 leading-relaxed mb-4 italic">
                                {response.recommendation}
                            </p>
                            {response.poemId && (
                                <div className="flex justify-end">
                                    <a
                                        href={`#${response.poemId}`}
                                        className="text-[10px] text-neon-pink uppercase tracking-widest hover:underline transition-all"
                                    >
                                        Ver verso relacionado →
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
