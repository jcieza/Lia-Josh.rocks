"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveGiftProps {
    message: string;
    sender?: string;
}

export default function InteractiveGift({ message, sender }: InteractiveGiftProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#f472b6", "#a78bfa", "#22d3ee"],
        });
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="closed"
                        initial={{ scale: 0.8, rotate: -5 }}
                        animate={{ scale: 1, rotate: 0 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleOpen}
                        className="cursor-pointer relative"
                    >
                        <div className="w-40 h-40 bg-neon-pink rounded-xl flex items-center justify-center glow-pink relative overflow-hidden">
                            {/* Ribbon */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-neon-violet opacity-80" />
                            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-8 bg-neon-violet opacity-80" />
                            <Gift size={64} className="text-white z-10" />
                        </div>
                        <motion.p
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="mt-4 text-sm font-outfit text-neon-pink text-center uppercase tracking-widest"
                        >
                            Toca para abrir
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="open"
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="glass p-8 rounded-2xl max-w-sm w-full text-center relative glow-violet"
                    >
                        <Heart className="absolute -top-6 -right-6 text-neon-pink animate-pulse" size={48} />
                        <p className="text-xl font-outfit leading-relaxed italic text-slate-100">
                            "{message}"
                        </p>
                        {sender && (
                            <p className="mt-6 text-sm font-sans text-neon-violet uppercase tracking-widest">
                                — {sender}
                            </p>
                        )}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(false)}
                            className="mt-8 px-6 py-2 rounded-full border border-white/20 text-xs font-sans hover:bg-white/10 transition-colors"
                        >
                            Cerrar y guardar
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
