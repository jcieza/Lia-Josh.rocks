"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { use } from "react";
import { getLetterBySlug } from "@/lib/letters";
import LetterEnvelope from "@/components/LetterEnvelope";
import LetterPage from "@/components/LetterPage";
import YouTubeAudio from "@/components/YouTubeAudio";

export default function LetterDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const letter = getLetterBySlug(slug);
    const [isOpen, setIsOpen] = useState(false);

    if (!letter) {
        notFound();
    }

    return (
        <main className="min-h-[100dvh] bg-background">
            {!isOpen ? (
                <LetterEnvelope
                    title={letter.title}
                    from={letter.from}
                    date={letter.date}
                    coverColor={letter.coverColor}
                    onOpen={() => setIsOpen(true)}
                />
            ) : (
                <>
                    <LetterPage pages={letter.pages} title={letter.title} />
                    {letter.youtubeId && <YouTubeAudio videoId={letter.youtubeId} />}
                </>
            )}
        </main>
    );
}
