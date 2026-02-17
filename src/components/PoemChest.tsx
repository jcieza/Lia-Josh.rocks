"use client";

import { motion } from "framer-motion";
import { POEMS } from "@/lib/constants";
import { Book, Sparkles } from "lucide-react";

export default function PoemChest() {
    return (
        <section className="space-y-12">
            <div className="flex items-center gap-4 mb-8">
                <Book size={32} className="text-neon-violet" />
                <h2 className="text-3xl font-outfit text-white">Baúl de Versos</h2>
            </div>

            <div className="space-y-24">
                {POEMS.map((poem, index) => (
                    <motion.div
                        key={poem.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="flex flex-col items-center text-center max-w-2xl mx-auto"
                    >
                        <Sparkles className="text-neon-pink mb-4 opacity-50" size={24} />
                        <h3 className="text-xl font-outfit text-neon-violet uppercase tracking-widest mb-6">
                            {poem.title}
                        </h3>
                        <div className="relative">
                            <p className="text-lg font-sans leading-relaxed text-slate-300 whitespace-pre-wrap italic">
                                {poem.content}
                            </p>
                            <div className="absolute -inset-4 bg-neon-violet/5 blur-3xl -z-10 rounded-full" />
                        </div>
                        <div className="mt-8 flex gap-2">
                            {poem.tags.map(tag => (
                                <span key={tag} className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-500 uppercase">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
