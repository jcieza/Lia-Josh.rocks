"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Camera, User } from "lucide-react";
import { useState, useRef } from "react";
import { storage, db } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface GalleryUploadProps {
    isOpen: boolean;
    onClose: () => void;
    onUploaded: () => void;
}

const SHARED_PIN = process.env.NEXT_PUBLIC_GALLERY_PIN || "1234";

export default function GalleryUpload({
    isOpen,
    onClose,
    onUploaded,
}: GalleryUploadProps) {
    const [step, setStep] = useState<"pin" | "form">("pin");
    const [pin, setPin] = useState("");
    const [pinError, setPinError] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [description, setDescription] = useState("");
    const [from, setFrom] = useState<"Josh" | "Lia">("Josh");
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const handlePinSubmit = () => {
        if (pin === SHARED_PIN) {
            setStep("form");
            setPinError(false);
        } else {
            setPinError(true);
            setPin("");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            const reader = new FileReader();
            reader.onload = (ev) => setPreview(ev.target?.result as string);
            reader.readAsDataURL(selected);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);

        try {
            // Upload to Firebase Storage
            const timestamp = Date.now();
            const storageRef = ref(storage, `gallery/${timestamp}_${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            // Save metadata to Firestore
            await addDoc(collection(db, "gallery"), {
                imageUrl: downloadURL,
                description: description.trim() || "Sin descripcion",
                from,
                createdAt: serverTimestamp(),
            });

            // Reset and close
            setFile(null);
            setPreview(null);
            setDescription("");
            setStep("pin");
            setPin("");
            onUploaded();
            onClose();
        } catch (error) {
            console.error("Upload error:", error);
            alert("Error al subir la foto. Intenta de nuevo.");
        } finally {
            setUploading(false);
        }
    };

    const handleClose = () => {
        setStep("pin");
        setPin("");
        setFile(null);
        setPreview(null);
        setDescription("");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={handleClose}
                    />

                    {/* Bottom sheet */}
                    <motion.div
                        className="relative w-full bg-slate-900 rounded-t-3xl border-t border-white/10 max-h-[85vh] overflow-y-auto"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    >
                        {/* Handle */}
                        <div className="flex justify-center pt-3 pb-2">
                            <div className="w-10 h-1 rounded-full bg-slate-700" />
                        </div>

                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"
                        >
                            <X size={16} className="text-slate-400" />
                        </button>

                        <div className="px-6 pb-8">
                            {step === "pin" ? (
                                /* PIN Step */
                                <div className="py-8 text-center">
                                    <h3 className="text-lg font-outfit text-white mb-2">
                                        Ingresa el PIN
                                    </h3>
                                    <p className="text-xs text-slate-500 mb-6">
                                        Solo nosotros podemos subir fotos
                                    </p>

                                    <input
                                        type="password"
                                        inputMode="numeric"
                                        maxLength={4}
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                                        onKeyDown={(e) => e.key === "Enter" && handlePinSubmit()}
                                        className={`w-40 text-center text-2xl tracking-[0.5em] bg-transparent border-b-2 ${pinError ? "border-red-500" : "border-slate-700"
                                            } text-white py-3 outline-none focus:border-neon-violet transition-colors`}
                                        placeholder="----"
                                        autoFocus
                                    />

                                    {pinError && (
                                        <p className="text-xs text-red-400 mt-3">
                                            PIN incorrecto
                                        </p>
                                    )}

                                    <button
                                        onClick={handlePinSubmit}
                                        disabled={pin.length < 4}
                                        className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-violet text-white font-outfit text-sm disabled:opacity-30 active:scale-[0.98] transition-all"
                                    >
                                        Continuar
                                    </button>
                                </div>
                            ) : (
                                /* Upload Form */
                                <div className="py-4">
                                    <h3 className="text-lg font-outfit text-white mb-4">
                                        Subir Foto
                                    </h3>

                                    {/* File picker */}
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept="image/*"
                                        capture="environment"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />

                                    {!preview ? (
                                        <button
                                            onClick={() => fileRef.current?.click()}
                                            className="w-full aspect-video rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center gap-3 active:border-neon-violet transition-colors"
                                        >
                                            <Camera size={32} className="text-slate-600" />
                                            <span className="text-xs text-slate-500">
                                                Toca para tomar o elegir foto
                                            </span>
                                        </button>
                                    ) : (
                                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                onClick={() => {
                                                    setFile(null);
                                                    setPreview(null);
                                                }}
                                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center"
                                            >
                                                <X size={14} className="text-white" />
                                            </button>
                                        </div>
                                    )}

                                    {/* Description */}
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe este momento..."
                                        rows={2}
                                        className="w-full mt-4 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-neon-violet resize-none transition-colors"
                                    />

                                    {/* From selector */}
                                    <div className="flex gap-3 mt-4">
                                        {(["Josh", "Lia"] as const).map((name) => (
                                            <button
                                                key={name}
                                                onClick={() => setFrom(name)}
                                                className={`flex-1 py-3 rounded-xl text-sm font-outfit flex items-center justify-center gap-2 transition-all ${from === name
                                                        ? "bg-gradient-to-r from-neon-pink/20 to-neon-violet/20 border border-neon-violet/40 text-white"
                                                        : "bg-slate-800/30 border border-slate-800 text-slate-500"
                                                    }`}
                                            >
                                                <User size={14} />
                                                {name}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Upload button */}
                                    <button
                                        onClick={handleUpload}
                                        disabled={!file || uploading}
                                        className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-neon-pink to-neon-violet text-white font-outfit text-sm flex items-center justify-center gap-2 disabled:opacity-30 active:scale-[0.98] transition-all"
                                    >
                                        {uploading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Upload size={16} />
                                                Subir Foto
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
