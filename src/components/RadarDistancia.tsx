"use client";

import { useEffect, useState } from "react";
import { intervalToDuration, formatDuration } from "date-fns";
import { es } from "date-fns/locale";
import { MapPin, Plane } from "lucide-react";

interface RadarDistanciaProps {
    targetDate: string; // ISO format
    destination: string;
}

export default function RadarDistancia({ targetDate, destination }: RadarDistanciaProps) {
    const [timeLeft, setTimeLeft] = useState<Duration | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const target = new Date(targetDate);
            if (now < target) {
                setTimeLeft(intervalToDuration({ start: now, end: target }));
            } else {
                setTimeLeft(null);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) return null;

    return (
        <div className="glass p-6 rounded-2xl glow-pink relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Plane size={80} className="rotate-45" />
            </div>

            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-neon-pink/20 rounded-lg">
                    <MapPin size={24} className="text-neon-pink" />
                </div>
                <div>
                    <h3 className="text-xs font-sans text-neon-pink uppercase tracking-widest">Próxima Parada</h3>
                    <p className="text-lg font-outfit text-white">{destination}</p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {[
                    { label: "Días", value: timeLeft.days },
                    { label: "Horas", value: timeLeft.hours },
                    { label: "Minutos", value: timeLeft.minutes },
                    { label: "Segundos", value: timeLeft.seconds },
                ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center p-2 bg-white/5 rounded-lg border border-white/10">
                        <span className="text-2xl font-outfit font-bold text-white leading-none">
                            {item.value?.toString().padStart(2, "0") || "00"}
                        </span>
                        <span className="text-[10px] uppercase tracking-tighter text-slate-400 mt-1">{item.label}</span>
                    </div>
                ))}
            </div>

            <p className="mt-4 text-[10px] text-center text-slate-500 font-sans tracking-[0.2em] uppercase">
                Faltan para verte
            </p>
        </div>
    );
}
