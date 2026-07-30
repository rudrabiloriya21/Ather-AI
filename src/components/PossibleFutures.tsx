import React from 'react';
import { motion } from 'motion/react';
import { Target, ArrowDown, User } from 'lucide-react';

export function PossibleFutures() {
  const futures = [
    { title: "AI Engineer", probability: 89, color: "text-aether-blue", glow: "shadow-aether-blue/30" },
    { title: "Research Scientist", probability: 81, color: "text-aether-purple", glow: "shadow-aether-purple/30" },
    { title: "Founder", probability: 94, color: "text-emerald-400", glow: "shadow-emerald-400/30" },
  ];

  return (
    <motion.div 
      className="glass-panel p-6 w-full flex flex-col gap-5 h-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(251,191,36,0.15)] transition-all duration-500 rounded-3xl border border-white/10 hover:-translate-y-1 bg-gradient-to-b from-white/[0.03] to-transparent relative overflow-hidden group/card"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="flex items-center gap-3 border-b border-white/10 pb-4 relative z-10">
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20">
          <Target className="w-5 h-5 text-amber-400" />
        </motion.div>
        <div>
          <h2 className="text-xl font-light tracking-wide text-glow">Possible Futures</h2>
          <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase mt-0.5">Exploratory Predictions</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 mt-2 overflow-y-auto hidden-scrollbar flex-1 pb-4">
        <motion.div 
          className="bg-white/10 border border-white/20 px-4 py-2 rounded-full flex items-center gap-2 text-sm shadow-inner"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <User className="w-4 h-4 text-white/80" />
          <span className="text-white/90">Current You</span>
        </motion.div>

        {futures.map((future, idx) => (
          <React.Fragment key={idx}>
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.5 + idx * 0.3 }}
            >
              <ArrowDown className="w-4 h-4 text-white/30 my-1 animate-bounce" />
            </motion.div>
            
            <motion.div 
              className={`w-full bg-black/40 border border-white/10 rounded-xl p-3 flex justify-between items-center ${future.glow} hover:bg-white/5 transition-colors cursor-default group`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + idx * 0.3, type: "spring" }}
              whileHover={{ scale: 1.02 }}
            >
              <span className={`text-sm font-medium ${future.color} group-hover:text-glow transition-all`}>
                {future.title}
              </span>
              <span className="text-white/90 text-xs font-mono bg-white/10 px-2 py-1 rounded-md">
                {future.probability}%
              </span>
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
}
