"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface GalleryCardProps {
    imageUrl: string;
    description: string;
    from: string;
    date: string;
}

export default function GalleryCard({
    imageUrl,
    description,
    from,
    date,
}: GalleryCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            {/* Card (grid item) */}
            <motion.div
                className="gallery-card cursor-pointer"
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsExpanded(true)}
                layout
            >
                <div className="relative aspect-square w-full">
                    <Image
                        src={imageUrl}
                        alt={description}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 33vw"
                    />
                </div>
                <div className="p-3">
                    <p className="text-xs text-slate-300 line-clamp-2">{description}</p>
                    <p className="text-[10px] text-slate-600 mt-1">
                        {from} - {date}
                    </p>
                </div>
            </motion.div>

            {/* Lightbox (fullscreen) */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/95 flex flex-col"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsExpanded(false)}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 z-60 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:scale-90"
                            onClick={() => setIsExpanded(false)}
                        >
                            <X size={18} className="text-white" />
                        </button>

                        {/* Image */}
                        <div className="flex-1 flex items-center justify-center p-4">
                            <motion.div
                                className="relative w-full max-h-[70vh]"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.8 }}
                                style={{ aspectRatio: "auto" }}
                            >
                                <Image
                                    src={imageUrl}
                                    alt={description}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                    priority
                                />
                            </motion.div>
                        </div>

                        {/* Caption */}
                        <div className="p-6 text-center" onClick={(e) => e.stopPropagation()}>
                            <p className="text-sm text-slate-200 mb-1">{description}</p>
                            <p className="text-[10px] text-slate-600 uppercase tracking-widest">
                                {from} - {date}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
