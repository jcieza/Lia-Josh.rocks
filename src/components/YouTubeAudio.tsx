"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface YouTubeAudioProps {
    videoId: string;
}

export default function YouTubeAudio({ videoId }: YouTubeAudioProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const togglePlay = useCallback(() => {
        if (!hasInteracted) {
            setHasInteracted(true);
            setIsPlaying(true);
            return;
        }
        setIsPlaying((prev) => !prev);
    }, [hasInteracted]);

    // YouTube embed URL with parameters for audio-only experience
    const embedUrl = isPlaying
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1`
        : "";

    useEffect(() => {
        // Cleanup on unmount
        return () => setIsPlaying(false);
    }, []);

    return (
        <>
            {/* Hidden YouTube iframe */}
            {hasInteracted && (
                <iframe
                    ref={iframeRef}
                    src={embedUrl}
                    className="hidden"
                    allow="autoplay; encrypted-media"
                    title="Background music"
                />
            )}

            {/* Floating music button */}
            <button
                onClick={togglePlay}
                className="fixed bottom-24 right-4 z-50 w-10 h-10 rounded-full glass flex items-center justify-center active:scale-90 transition-transform"
                aria-label={isPlaying ? "Silenciar musica" : "Reproducir musica"}
            >
                {isPlaying ? (
                    <Volume2 size={16} className="text-neon-pink" />
                ) : (
                    <VolumeX size={16} className="text-slate-500" />
                )}
            </button>
        </>
    );
}
