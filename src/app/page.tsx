import InteractiveGift from "@/components/InteractiveGift";
import RadarDistancia from "@/components/RadarDistancia";
import PoemChest from "@/components/PoemChest";
import GeminiOracle from "@/components/GeminiOracle";
import { Heart, Stars } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen px-4 pb-24 font-sans">
      {/* Hero Section */}
      <section className="pt-24 pb-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Heart className="text-neon-pink fill-neon-pink animate-pulse" size={48} />
            <Stars className="absolute -top-4 -right-4 text-neon-violet animate-glow" size={24} />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-outfit font-bold mb-4 tracking-tighter text-white">
          Lia <span className="text-neon-pink">&</span> Josh
        </h1>
        <p className="text-sm font-sans text-slate-400 uppercase tracking-[0.3em] mb-12">
          Nuestro Nodo • Est. 2024
        </p>
      </section>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Left Column: Interactive Gift & Oracle */}
        <div className="md:col-span-12 lg:col-span-8 space-y-8">
          <div className="glass rounded-3xl overflow-hidden min-h-[400px] flex items-center justify-center relative bg-slate-900/40">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
            <InteractiveGift
              message="Este es un cupón válido por un abrazo infinito que te daré el primer segundo que te vea en México. No caduca."
              sender="Josh"
            />
          </div>

          <GeminiOracle />
        </div>

        {/* Right Column: Distance Radars */}
        <div className="md:col-span-12 lg:col-span-4 space-y-6">
          <RadarDistancia
            targetDate="2026-03-15T12:00:00"
            destination="MÉXICO (MARZO)"
          />
          <RadarDistancia
            targetDate="2026-06-01T12:00:00"
            destination="EL REENCUENTRO (JUNIO)"
          />

          <div className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <p className="text-xs font-sans text-slate-500 uppercase tracking-widest mb-2">Estado del Nodo</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-sm font-outfit text-white">CONECTADOS • TIEMPO REAL</p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Poem Chest */}
        <div className="md:col-span-12 mt-12 px-4">
          <PoemChest />
        </div>
      </div>

      <footer className="mt-24 text-center text-[10px] text-slate-600 font-sans uppercase tracking-[0.5em]">
        Hecho con amor • Basado en el stack de Estrumetal
      </footer>
    </main>
  );
}
