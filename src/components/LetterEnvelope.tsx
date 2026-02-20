"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
import { useState } from "react";

interface LetterEnvelopeProps {
    title: string;
    from: string;
    date: string;
    coverColor?: string;
    onOpen: () => void;
}

export default function LetterEnvelope({
    title,
    from,
    date,
    coverColor = "from-rose-900/60 to-violet-900/60",
    onOpen,
}: LetterEnvelopeProps) {
    const [isOpening, setIsOpening] = useState(false);

    const handleTap = () => {
        if (isOpening) return;
        setIsOpening(true);
        setTimeout(() => onOpen(), 1800);
    };

    return (
        <AnimatePresence>
            {!isOpening ? (
                <motion.div
                    className="flex flex-col items-center justify-center min-h-[100dvh] px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Floating envelope */}
                    <motion.div
                        className="relative cursor-pointer select-none"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        onClick={handleTap}
                    >
                        {/* Envelope body */}
                        <div
                            className={`w-72 h-48 rounded-2xl bg-gradient-to-br ${coverColor} border border-white/10 shadow-2xl relative overflow-hidden`}
                        >
                            {/* Envelope flap (triangle) */}
                            <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
                                <div
                                    className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0"
                                    style={{
                                        borderLeft: "144px solid transparent",
                                        borderRight: "144px solid transparent",
                                        borderTop: "96px solid rgba(167, 139, 250, 0.3)",
                                    }}
                                />
                            </div>

                            {/* Seal */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-pink to-neon-violet flex items-center justify-center shadow-lg glow-pink">
                                    <Mail className="text-white" size={24} />
                                </div>
                            </div>

                            {/* Subtle pattern */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
                        </div>
                    </motion.div>

                    {/* Title below envelope */}
                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h1 className="text-2xl font-playfair italic text-white mb-2">
                            {title}
                        </h1>
                        <p className="text-xs text-slate-500 uppercase tracking-[0.3em]">
                            De {from} - {date}
                        </p>
                    </motion.div>

                    {/* Tap hint */}
                    <motion.p
                        className="mt-12 text-xs text-slate-600 uppercase tracking-[0.2em]"
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Toca para abrir
                    </motion.p>
                </motion.div>
            ) : (
                /* Opening animation */
                <motion.div
                    className="flex items-center justify-center min-h-[100dvh]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div className="relative">
                        {/* Envelope splits open */}
                        <motion.div
                            className={`w-72 h-48 rounded-2xl bg-gradient-to-br ${coverColor} border border-white/10 shadow-2xl`}
                            animate={{
                                scale: [1, 1.05, 0.9],
                                opacity: [1, 1, 0],
                                rotateY: [0, 0, 90],
                            }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />

                        {/* Light burst */}
                        <motion.div
                            className="absolute inset-0 rounded-2xl"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 0.8, 0],
                                scale: [1, 2.5],
                            }}
                            transition={{ duration: 1.5, delay: 0.3 }}
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(244,114,182,0.4) 0%, transparent 70%)",
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
