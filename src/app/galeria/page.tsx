"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Plus, ArrowLeft, ImageIcon } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import {
    collection,
    query,
    orderBy,
    getDocs,
    Timestamp,
} from "firebase/firestore";
import GalleryCard from "@/components/GalleryCard";
import GalleryUpload from "@/components/GalleryUpload";

interface Photo {
    id: string;
    imageUrl: string;
    description: string;
    from: string;
    createdAt: Timestamp;
}

export default function GaleriaPage() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [showUpload, setShowUpload] = useState(false);

    const fetchPhotos = useCallback(async () => {
        try {
            const q = query(
                collection(db, "gallery"),
                orderBy("createdAt", "desc")
            );
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Photo[];
            setPhotos(data);
        } catch (error) {
            console.error("Error fetching photos:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPhotos();
    }, [fetchPhotos]);

    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp?.toDate) return "";
        const d = timestamp.toDate();
        return d.toLocaleDateString("es-MX", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

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
                    Nuestra Galeria
                </h1>
                <p className="text-sm text-slate-500 mt-2">
                    Los momentos que nos pertenecen
                </p>
            </div>

            {/* Photo grid */}
            {loading ? (
                <div className="grid grid-cols-2 gap-3">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="aspect-square rounded-2xl bg-slate-800/50 animate-pulse"
                        />
                    ))}
                </div>
            ) : photos.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <GalleryCard
                                imageUrl={photo.imageUrl}
                                description={photo.description}
                                from={photo.from}
                                date={formatDate(photo.createdAt)}
                            />
                        </motion.div>
                    ))}
                </div>
            ) : (
                /* Empty state */
                <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                    <ImageIcon size={48} className="text-slate-700 mb-4" />
                    <p className="text-sm text-slate-600 mb-1">
                        Aun no hay fotos aqui
                    </p>
                    <p className="text-xs text-slate-700">
                        Toca el boton + para subir la primera
                    </p>
                </div>
            )}

            {/* Floating upload button */}
            <motion.button
                onClick={() => setShowUpload(true)}
                className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-neon-pink to-neon-violet shadow-lg flex items-center justify-center active:scale-90 transition-transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
            >
                <Plus size={24} className="text-white" />
            </motion.button>

            {/* Upload modal */}
            <GalleryUpload
                isOpen={showUpload}
                onClose={() => setShowUpload(false)}
                onUploaded={fetchPhotos}
            />
        </main>
    );
}
