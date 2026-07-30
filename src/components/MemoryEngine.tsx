import React from 'react';
import { motion } from 'motion/react';
import { Database, Clock, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

export function MemoryEngine() {
  const scheduledReviews = [
    { concept: "Neural Networks", time: "In 2 hours", urgency: "high", color: "text-rose-400" },
    { concept: "Quantum Superposition", time: "Tomorrow", urgency: "medium", color: "text-amber-400" },
    { concept: "Information Theory", time: "Next week", urgency: "low", color: "text-emerald-400" },
  ];

  return (
    <motion.div 
      className="glass-panel p-6 w-full flex flex-col gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(139,92,246,0.15)] transition-all duration-500 rounded-3xl border border-white/10 hover:-translate-y-1 bg-gradient-to-b from-white/[0.03] to-transparent relative overflow-hidden group/card"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-aether-purple/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="flex items-center gap-3 border-b border-white/10 pb-4 relative z-10">
        <motion.div animate={{ rotateY: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="p-2.5 rounded-xl bg-aether-purple/10 border border-aether-purple/20">
          <Database className="w-5 h-5 text-aether-purple" />
        </motion.div>
        <div>
          <h2 className="text-xl font-light tracking-wide text-glow">Memory Engine</h2>
          <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase mt-0.5">Predicting Cognitive Decay</p>
        </div>
      </div>

      <div className="relative pl-3 border-l border-white/10 space-y-6 mt-2">
        {scheduledReviews.map((review, idx) => (
          <motion.div 
            key={idx} 
            className="relative group cursor-default"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className={cn("absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full border border-black shadow-[0_0_8px_currentColor]", review.color)} 
              style={{ backgroundColor: 'currentColor' }} 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, delay: idx * 0.5, repeat: Infinity }}
            />
            <div className="pl-4 flex flex-col gap-1">
              <span className="text-sm font-medium text-white/90 group-hover:text-glow transition-all">{review.concept}</span>
              <span className="text-xs text-white/40 flex items-center gap-1">
                <Clock className="w-3 h-3 group-hover:text-white/60 transition-colors" />
                {review.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
