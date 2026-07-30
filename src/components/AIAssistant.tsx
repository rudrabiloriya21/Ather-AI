import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Brain, Cpu, Database } from 'lucide-react';
import { ChatMessage } from '../types';
import { cn } from '../lib/utils';

export function AIAssistant({ 
  messages, 
  onSendMessage, 
  isThinking 
}: { 
  messages: ChatMessage[], 
  onSendMessage: (msg: string) => void,
  isThinking: boolean
}) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const [thinkingPhase, setThinkingPhase] = useState(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking, thinkingPhase]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isThinking) {
      setThinkingPhase(0);
      interval = setInterval(() => {
        setThinkingPhase(prev => Math.min(prev + 1, 4));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isThinking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;
    onSendMessage(input);
    setInput("");
  };

  const thinkingMessages = [
    { text: "Analyzing Cognitive Twin...", icon: Cpu },
    { text: "Checking Memory...", icon: Database },
    { text: "Understanding Learning DNA...", icon: Sparkles },
    { text: "Building Personalized Explanation...", icon: Brain },
    { text: "Generating Best Teaching Strategy...", icon: Send }
  ];

  return (
    <motion.div 
      className="glass-panel flex flex-col h-full overflow-hidden relative shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-3xl border border-white/10"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="p-6 border-b border-white/10 flex items-center gap-3 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-md shrink-0 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-aether-blue/10 flex items-center justify-center border border-aether-blue/20 neural-glow relative overflow-hidden">
          <motion.div 
             className="absolute inset-0 bg-aether-blue opacity-20"
             animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <Sparkles className="w-5 h-5 text-aether-blue relative z-10" />
        </div>
        <div>
          <h2 className="text-lg font-light tracking-wide text-glow">AETHER</h2>
          <p className="text-xs text-white/50">Cognitive Twin Engine</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 hidden-scrollbar">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex w-full shrink-0",
              msg.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "max-w-[85%] rounded-2xl flex flex-col gap-2",
              msg.role === 'user' ? "items-end" : "items-start"
            )}>
              <motion.div className={cn(
                "px-5 py-3 text-sm leading-relaxed rounded-2xl shadow-lg whitespace-pre-wrap break-words relative overflow-hidden",
                msg.role === 'user' 
                  ? "bg-gradient-to-br from-aether-blue/30 to-aether-blue/10 text-white border border-aether-blue/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]" 
                  : "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl text-white/90 border border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
              )}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              >
                {msg.role === 'aether' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                )}
                {msg.content}
              </motion.div>
              
              {msg.metadata && msg.role === 'aether' && (
                <div className="flex flex-col gap-1.5 mt-2 ml-2">
                  {msg.metadata.memoryUpdated && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }} className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]" /> ✓ Memory Updated
                    </motion.div>
                  )}
                  {msg.metadata.curiosityIncreased && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }} className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-aether-blue">
                      <span className="w-1.5 h-1.5 rounded-full bg-aether-blue shadow-[0_0_5px_rgba(59,130,246,0.5)]" /> ✓ Curiosity Increased
                    </motion.div>
                  )}
                  {msg.metadata.knowledgeExpanded && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }} className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-purple-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_5px_rgba(167,139,250,0.5)]" /> ✓ Knowledge Expanded
                    </motion.div>
                  )}
                  {msg.metadata.dnaRefined && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }} className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-aether-purple">
                      <span className="w-1.5 h-1.5 rounded-full bg-aether-purple shadow-[0_0_5px_rgba(139,92,246,0.5)]" /> ✓ Learning DNA Refined
                    </motion.div>
                  )}
                  {msg.metadata.brainExpanded && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }} className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-amber-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_5px_rgba(251,191,36,0.5)]" /> ✓ Cognitive Twin Evolved
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        <AnimatePresence mode="wait">
          {isThinking && (
            <motion.div 
              key="thinking"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex w-full justify-start shrink-0"
            >
               <div className="max-w-[85%] rounded-2xl px-5 py-4 bg-white/5 border border-white/10 flex items-center gap-3 backdrop-blur-md">
                  {React.createElement(thinkingMessages[thinkingPhase].icon, { className: "w-4 h-4 text-aether-blue animate-pulse" })}
                  <motion.span 
                    key={thinkingPhase}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs tracking-wider text-white/60 uppercase"
                  >
                    {thinkingMessages[thinkingPhase].text}
                  </motion.span>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md shrink-0">
        <div className="relative flex items-center group">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Engage your Cognitive Twin..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-5 pr-12 text-sm text-white focus:outline-none focus:border-aether-blue/50 focus:bg-white/10 transition-all placeholder:text-white/30 shadow-inner"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isThinking}
            className="absolute right-1.5 p-2.5 rounded-full bg-aether-blue/20 text-aether-blue disabled:opacity-50 disabled:bg-transparent disabled:text-white/20 transition-all hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:bg-aether-blue hover:text-white overflow-hidden relative group"
          >
            <span className="relative z-10"><Send className="w-4 h-4" /></span>
            <motion.div 
              className="absolute inset-0 bg-white/20 translate-y-[100%]"
              whileHover={{ translateY: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
