import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrainGalaxy } from './components/BrainGalaxy';
import { AIAssistant } from './components/AIAssistant';
import { DNAStats } from './components/DNAStats';
import { PossibleFutures } from './components/PossibleFutures';
import { MemoryEngine } from './components/MemoryEngine';
import { LandingParticles } from './components/LandingParticles';
import { LearningDNA, ChatMessage } from './types';
import { Sparkles, ScanFace, Database, Zap } from 'lucide-react';

export default function App() {
  const [dna, setDna] = useState<LearningDNA>({
    curiosity: 35,
    creativity: 40,
    logic: 25,
    memory: 20,
    wonder: 50,
    focus: 30,
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [appState, setAppState] = useState<'landing' | 'scanning' | 'dashboard' | 'final_demo'>('landing');
  const [scanStep, setScanStep] = useState(0);

  const startScan = () => {
    setAppState('scanning');
    
    setTimeout(() => setScanStep(1), 500); // Scanning Neural Signature...
    setTimeout(() => setScanStep(2), 1000); // Analyzing Learning DNA...
    setTimeout(() => setScanStep(3), 1500); // Building Cognitive Twin...
    setTimeout(() => setScanStep(4), 2000); // Synchronizing Memory...
    setTimeout(() => {
      setAppState('dashboard');
      setMessages([
        {
          id: "1",
          role: "aether",
          content: "I've analyzed your initial neural signature. I am AETHER, your Cognitive Twin. I am ready to learn how you think and adapt to your learning style.",
          timestamp: Date.now()
        }
      ]);
    }, 2500);
  };

  const handleSendMessage = async (msg: string) => {
    if (msg.toLowerCase() === "demo end") {
      setAppState('final_demo');
      return;
    }

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: msg,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newUserMsg]);
    setIsThinking(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: msg, 
          history: messages.slice(-5),
          userContext: dna 
        })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.details || data.error || "Cognitive connection disrupted.");
      }
      
      if (data.dnaUpdates) {
        setDna(prev => ({ ...prev, ...data.dnaUpdates }));
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "aether",
        content: data.text || "My connection to the cognitive stream was interrupted.",
        timestamp: Date.now(),
        metadata: data.metadata
      }]);
    } catch (err: any) {
      let errorMessage = err.message || "I'm experiencing a cognitive disconnect. Please try again.";
      if (err.message && (err.message.includes("suspended") || err.message.includes("API_KEY"))) {
        errorMessage = "My cognitive core requires an API key. Please configure GROQ_API_KEY in Environment Variables.";
      }
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "aether",
        content: errorMessage,
        timestamp: Date.now()
      }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="h-screen w-full relative overflow-hidden bg-aether-black text-aether-white">
      <BrainGalaxy isEvolving={appState === 'final_demo'} />

      <AnimatePresence mode="wait">
        {appState === 'landing' && (
          <motion.div 
            key="landing"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-aether-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {/* Animated aurora gradient */}
            <motion.div 
              className="absolute inset-0 opacity-40"
              animate={{
                background: [
                  "radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.2) 0%, transparent 50%)",
                  "radial-gradient(ellipse at bottom right, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(ellipse at top left, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
                  "radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.2) 0%, transparent 50%)",
                ]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            
            <LandingParticles />
            
            <motion.div 
              className="w-24 h-24 rounded-full border border-aether-blue/30 flex items-center justify-center bg-aether-blue/10 neural-glow relative overflow-hidden mb-8"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div 
                className="absolute inset-0 bg-aether-blue opacity-20"
                animate={{ scale: [1, 2, 1], opacity: [0.1, 0.5, 0.1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <Sparkles className="w-12 h-12 text-aether-blue relative z-10" />
            </motion.div>
            <div className="text-center max-w-2xl px-6 relative z-10">
              <h1 className="text-6xl font-light tracking-[0.2em] text-glow mb-6">AETHER</h1>
              <h2 className="text-2xl font-light tracking-wide text-white/90 mb-4">The World's First Living Cognitive Twin.</h2>
              <p className="text-white/60 text-lg font-light leading-relaxed mb-12">
                An AI that learns how you think, adapts to how you learn, and evolves with you for life.
              </p>
              
              <button 
                onClick={startScan}
                className="px-10 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-aether-blue/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500 text-sm tracking-[0.2em] uppercase text-white/90 cursor-pointer overflow-hidden relative group"
              >
                <span className="relative z-10">Awaken My Cognitive Twin</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-aether-blue/0 via-aether-blue/20 to-aether-blue/0 translate-x-[-100%]"
                  whileHover={{ translateX: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </button>
            </div>
          </motion.div>
        )}

        {appState === 'scanning' && (
          <motion.div
            key="scanning"
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-aether-black/80 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-32 h-32 mb-8">
              <motion.div 
                className="absolute inset-0 border-t-2 border-aether-blue rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-2 border-b-2 border-aether-purple rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-aether-blue">
                {scanStep === 0 && <ScanFace className="w-10 h-10 animate-pulse" />}
                {scanStep === 1 && <Zap className="w-10 h-10 animate-pulse" />}
                {scanStep === 2 && <Database className="w-10 h-10 animate-pulse" />}
              </div>
            </div>
            
            <div className="h-8 overflow-hidden">
              <AnimatePresence mode="wait">
                {scanStep === 0 && (
                  <motion.p key="step0" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="text-white/70 tracking-widest uppercase text-sm">Initiating...</motion.p>
                )}
                {scanStep === 1 && (
                  <motion.p key="step1" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="text-aether-blue tracking-widest uppercase text-sm text-glow">Scanning Neural Signature...</motion.p>
                )}
                {scanStep === 2 && (
                  <motion.p key="step2" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="text-aether-purple tracking-widest uppercase text-sm text-glow">Analyzing Learning DNA...</motion.p>
                )}
                {scanStep === 3 && (
                  <motion.p key="step3" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="text-emerald-400 tracking-widest uppercase text-sm text-glow">Building Cognitive Twin...</motion.p>
                )}
                {scanStep === 4 && (
                  <motion.p key="step4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="text-amber-400 tracking-widest uppercase text-sm text-glow">Synchronizing Memory...</motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {appState === 'dashboard' && (
          <motion.div 
            key="dashboard"
            className="relative z-10 w-full h-full flex flex-col md:flex-row px-4 pb-4 pt-24 md:px-6 md:pb-6 md:pt-24 gap-6 overflow-y-auto md:overflow-hidden"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5 }}
          >
            {/* Header Corner Desktop */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-aether-blue/30 flex items-center justify-center bg-aether-blue/10 neural-glow group cursor-pointer hover:bg-aether-blue/20 transition-all">
                <Sparkles className="w-5 h-5 text-aether-blue group-hover:scale-110 transition-transform" />
              </div>
              <h1 className="text-xl font-light tracking-[0.2em] text-glow">AETHER</h1>
              <div className="hidden sm:flex ml-4 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 items-center gap-2">
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" 
                  animate={isThinking ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] } : { scale: 1, opacity: 1 }}
                  transition={isThinking ? { duration: 1, repeat: Infinity } : { duration: 0.5 }}
                />
                <span className="text-[10px] uppercase tracking-wider text-emerald-400">
                  {isThinking ? "Learning You..." : "Live"}
                </span>
              </div>
            </div>

            {/* Left Column: Stats & Memory */}
            <div className="w-full md:w-[300px] xl:w-80 flex-shrink-0 flex flex-col gap-6 min-h-0 md:h-full overflow-y-auto hidden-scrollbar pb-10 md:pb-0">
              <DNAStats dna={dna} />
              <MemoryEngine />
            </div>

            {/* Center: Open Space for Galaxy viewing */}
            <div className="flex-1 hidden md:flex items-center justify-center flex-col pointer-events-none min-h-0">
              <motion.div 
                className="text-center bg-black/20 p-6 rounded-2xl backdrop-blur-sm border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                 <h2 className="text-3xl font-light tracking-wider text-white/80 mb-2 text-glow">Brain Galaxy</h2>
                 <p className="text-white/40 text-sm tracking-widest uppercase">Expanding Universe of Concepts</p>
              </motion.div>
            </div>

            {/* Right Column: AI Assistant & Futures */}
            <div className="w-full md:w-[350px] lg:w-[400px] xl:w-[450px] flex-shrink-0 flex flex-col gap-6 min-h-0 md:h-full overflow-y-auto hidden-scrollbar pb-10 md:pb-0">
              <div className="flex-none h-[350px]">
                <PossibleFutures />
              </div>
              <div className="flex-none h-[600px]">
                <AIAssistant 
                  messages={messages} 
                  onSendMessage={handleSendMessage} 
                  isThinking={isThinking} 
                />
              </div>
            </div>
          </motion.div>
        )}

        {appState === 'final_demo' && (
          <motion.div
            key="final_demo"
            className="absolute inset-0 z-50 flex items-center justify-center bg-aether-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            <motion.div 
              className="text-center flex flex-col items-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 2 }}
            >
              <div className="w-24 h-24 rounded-full border border-aether-blue/50 flex items-center justify-center bg-aether-blue/20 neural-glow mb-6 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-aether-blue opacity-20"
                  animate={{ scale: [1, 2, 1], opacity: [0.1, 0.5, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <Sparkles className="w-12 h-12 text-aether-blue relative z-10" />
              </div>
              <h1 className="text-5xl font-light tracking-[0.3em] text-glow mb-6">AETHER</h1>
              <motion.h2 
                className="text-2xl font-light tracking-widest text-white/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 2 }}
              >
                The AI That Learns You Before It Teaches You.
              </motion.h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
