import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LearningDNA } from '../types';
import { Brain, Sparkles, Network, Lightbulb, Compass } from 'lucide-react';
import { cn } from '../lib/utils';

const AnimatedStat: React.FC<{ stat: any, value: number }> = ({ stat, value }) => {
  const [prev, setPrev] = useState(value);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    if (value > prev) {
      setIsPulsing(true);
      const t = setTimeout(() => setIsPulsing(false), 2000);
      setPrev(value);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  return (
    <div className="flex flex-col gap-2 group">
      <div className="flex justify-between items-center text-sm">
        <span className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors duration-300">
          <motion.div
            animate={isPulsing ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <stat.icon className={cn("w-4 h-4", stat.color)} />
          </motion.div>
          {stat.label}
        </span>
        <motion.span 
          className={cn("font-medium", isPulsing ? stat.color : "text-white/90")}
          animate={isPulsing ? { scale: [1, 1.2, 1] } : {}}
        >
          {value}%
        </motion.span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative shadow-inner">
        <motion.div 
          className={cn("absolute top-0 left-0 h-full rounded-full", stat.bg)}
          style={{ boxShadow: `0 0 10px var(--tw-shadow-color)` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
        >
          {isPulsing && (
            <motion.div 
              className="absolute inset-0 bg-white/50"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1, ease: "linear" }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export function DNAStats({ dna }: { dna: LearningDNA }) {
  const stats = [
    { key: "curiosity", label: "Curiosity", icon: Compass, color: "text-aether-blue", bg: "bg-aether-blue shadow-aether-blue/50" },
    { key: "creativity", label: "Creativity", icon: Sparkles, color: "text-aether-purple", bg: "bg-aether-purple shadow-aether-purple/50" },
    { key: "logic", label: "Logic", icon: Network, color: "text-indigo-400", bg: "bg-indigo-400 shadow-indigo-400/50" },
    { key: "memory", label: "Memory", icon: Brain, color: "text-emerald-400", bg: "bg-emerald-400 shadow-emerald-400/50" },
    { key: "wonder", label: "Wonder", icon: Lightbulb, color: "text-amber-400", bg: "bg-amber-400 shadow-amber-400/50" },
    { key: "focus", label: "Focus", icon: Brain, color: "text-rose-400", bg: "bg-rose-400 shadow-rose-400/50" },
  ];

  return (
    <motion.div 
      className="glass-panel p-6 w-full flex flex-col gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(59,130,246,0.15)] transition-all duration-500 rounded-3xl border border-white/10 hover:-translate-y-1 bg-gradient-to-b from-white/[0.03] to-transparent relative overflow-hidden group/card"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-aether-blue/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="flex items-center gap-3 border-b border-white/10 pb-4 relative z-10">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="p-2.5 rounded-xl bg-aether-blue/10 border border-aether-blue/20">
          <Brain className="w-5 h-5 text-aether-blue" />
        </motion.div>
        <div>
          <h2 className="text-xl font-light tracking-wide text-glow">Learning DNA</h2>
          <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase mt-0.5">Live Cognitive State</p>
        </div>
        <motion.div 
          className="absolute right-0 w-1.5 h-1.5 rounded-full bg-aether-blue shadow-[0_0_8px_rgba(59,130,246,0.8)]"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="flex flex-col gap-5 relative z-10">
        {stats.map((stat) => (
          <AnimatedStat key={stat.key} stat={stat} value={dna[stat.key as keyof LearningDNA]} />
        ))}
      </div>
    </motion.div>
  );
}
