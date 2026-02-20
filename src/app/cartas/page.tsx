"use client";

import { motion } from "framer-motion";
import { LETTERS } from "@/lib/letters";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CartasIndex() {
    return (
        <main className="min-h-[100dvh] bg-background px-4 pb-24">
            {/* Header */}
            <div className="pt-8 pb-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest mb-6 active:text-white transition-colors"
                >
                    <ArrowLeft size={14} />
                    Inicio
                </Link>
                <h1 className="text-3xl font-outfit font-bold text-white">
                    Cartas de Amor
                </h1>
                <p className="text-sm text-slate-500 mt-2">
                    Toca una carta para abrirla
                </p>
            </div>

            {/* Letter cards */}
            <div className="space-y-4">
                {LETTERS.map((letter, index) => (
                    <motion.div
                        key={letter.slug}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Link href={`/cartas/${letter.slug}`}>
                            <div
                                className={`glass rounded-2xl p-5 flex items-center gap-4 active:scale-[0.98] transition-transform`}
                            >
                                {/* Envelope icon */}
                                <div
                                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${letter.coverColor || "from-rose-900/60 to-violet-900/60"
                                        } flex items-center justify-center flex-shrink-0`}
                                >
                                    <Mail size={22} className="text-white/80" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-outfit text-white truncate">
                                        {letter.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        De {letter.from} - {letter.date}
                                    </p>
                                    <p className="text-[10px] text-slate-600 mt-1">
                                        {letter.pages.length} paginas
                                    </p>
                                </div>

                                {/* Arrow */}
                                <div className="text-slate-600">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Empty state hint */}
            {LETTERS.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                    <Mail size={48} className="text-slate-700 mb-4" />
                    <p className="text-sm text-slate-600">
                        Aun no hay cartas aqui...
                    </p>
                </div>
            )}
        </main>
    );
}
