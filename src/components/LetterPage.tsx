"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback } from "react";

interface LetterPageProps {
    pages: string[];
    title: string;
}

export default function LetterPage({ pages, title }: LetterPageProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(0);

    const paginate = useCallback(
        (newDirection: number) => {
            const nextPage = currentPage + newDirection;
            if (nextPage >= 0 && nextPage < pages.length) {
                setDirection(newDirection);
                setCurrentPage(nextPage);
            }
        },
        [currentPage, pages.length]
    );

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        const threshold = 50;
        if (info.offset.x < -threshold) {
            paginate(1);
        } else if (info.offset.x > threshold) {
            paginate(-1);
        }
    };

    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir < 0 ? "100%" : "-100%",
            opacity: 0,
        }),
    };

    return (
        <div className="min-h-[100dvh] flex flex-col bg-background relative overflow-hidden">
            {/* Header */}
            <div className="pt-6 pb-4 px-6 text-center relative z-20">
                <p className="text-[10px] text-slate-600 uppercase tracking-[0.4em] mb-1">
                    {title}
                </p>
                <p className="text-xs text-neon-violet font-outfit">
                    {currentPage + 1} de {pages.length}
                </p>
            </div>

            {/* Page content area */}
            <div className="flex-1 relative px-4 pb-20 overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentPage}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        className="absolute inset-x-4 top-0 bottom-20"
                    >
                        <div className="letter-paper rounded-2xl p-6 sm:p-8 h-full overflow-y-auto no-scrollbar">
                            <p className="letter-serif text-base sm:text-lg text-slate-200/90 whitespace-pre-wrap leading-relaxed">
                                {pages[currentPage]}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Ambient glow behind the letter */}
                <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
                    <div className="w-64 h-64 rounded-full bg-neon-violet/5 blur-3xl" />
                </div>
            </div>

            {/* Navigation bar (fixed at bottom) */}
            <div className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-background via-background/95 to-transparent pt-8 pb-6 px-6">
                <div className="flex items-center justify-between max-w-sm mx-auto">
                    <button
                        onClick={() => paginate(-1)}
                        disabled={currentPage === 0}
                        className="w-12 h-12 rounded-full glass flex items-center justify-center disabled:opacity-20 active:scale-90 transition-all"
                    >
                        <ChevronLeft size={20} className="text-white" />
                    </button>

                    {/* Progress dots */}
                    <div className="flex gap-1.5 items-center">
                        {pages.map((_, i) => (
                            <div
                                key={i}
                                className={`rounded-full transition-all duration-300 ${i === currentPage
                                        ? "w-6 h-1.5 bg-neon-pink"
                                        : "w-1.5 h-1.5 bg-slate-700"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => paginate(1)}
                        disabled={currentPage === pages.length - 1}
                        className="w-12 h-12 rounded-full glass flex items-center justify-center disabled:opacity-20 active:scale-90 transition-all"
                    >
                        <ChevronRight size={20} className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
