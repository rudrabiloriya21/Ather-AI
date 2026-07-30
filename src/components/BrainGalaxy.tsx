import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "motion/react";
import { GalaxyNode } from "../types";

// Generate a clustered galaxy
const generateGalaxy = (): GalaxyNode[] => {
  const nodes: GalaxyNode[] = [];
  const subjects = ['Physics', 'Philosophy', 'Computer Science', 'Art History'];
  const clusters = subjects.map((subj, i) => ({
    cx: 20 + i * 20,
    cy: 30 + (i % 2) * 40,
    name: subj,
    color: i % 2 === 0 ? "bg-aether-blue" : "bg-aether-purple",
    glow: i % 2 === 0 ? "rgba(59, 130, 246, 0.5)" : "rgba(139, 92, 246, 0.5)"
  }));

  let idCounter = 0;
  clusters.forEach(cluster => {
    // Core node
    const coreId = `node-${idCounter++}`;
    nodes.push({
      id: coreId,
      x: cluster.cx,
      y: cluster.cy,
      size: 16,
      color: cluster.color,
      label: cluster.name,
      mastery: 0.9,
      connections: [],
      glowColor: cluster.glow
    });

    // Satellite nodes
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 8 + Math.random() * 6;
      const childId = `node-${idCounter++}`;
      nodes.push({
        id: childId,
        x: cluster.cx + Math.cos(angle) * radius,
        y: cluster.cy + Math.sin(angle) * radius,
        size: 4 + Math.random() * 4,
        color: "bg-white",
        label: `Concept ${idCounter}`,
        mastery: Math.random() * 0.8 + 0.2,
        connections: [coreId],
        glowColor: "rgba(255,255,255,0.5)"
      });
    }
  });

  return nodes;
};

export function BrainGalaxy({ isEvolving = false }: { isEvolving?: boolean }) {
  const [nodes, setNodes] = useState<GalaxyNode[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setNodes(generateGalaxy());
  }, []);

  useEffect(() => {
    if (isEvolving) {
      controls.start({
        scale: [1, 1.2, 2.5],
        opacity: [0.3, 0.8, 0],
        transition: { duration: 4, ease: [0.22, 1, 0.36, 1] } // Premium easing
      });
    }
  }, [isEvolving, controls]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25; // Parallax intensity
    const y = (e.clientY - top - height / 2) / 25;
    setMousePos({ x, y });
  };

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-auto" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Background ambient animation */}
      <motion.div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.2) 0%, transparent 60%)",
            "radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 60%)",
            "radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.2) 0%, transparent 60%)"
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white/30 pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30 - Math.random() * 50, 0],
            x: [0, (Math.random() - 0.5) * 50, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      <motion.div 
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" 
        animate={{ ...controls, x: mousePos.x, y: mousePos.y }}
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        whileHover={{ scale: 1.02 }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map(node => 
            node.connections.map(targetId => {
              const target = nodes.find(n => n.id === targetId);
              if (!target) return null;
              const isHovered = hoveredNode === node.id || hoveredNode === target.id;
              return (
                <motion.line
                  key={`${node.id}-${targetId}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke={isHovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}
                  strokeWidth={isHovered ? 2 : 1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: 1,
                    strokeDasharray: isHovered ? ["4, 4"] : ["none"],
                    strokeDashoffset: isHovered ? [0, -20] : 0
                  }}
                  transition={{ duration: 2, strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" } }}
                />
              );
            })
          )}
        </svg>

        {nodes.map((node) => {
          const isHovered = hoveredNode === node.id;
          return (
            <motion.div
              key={node.id}
              className={`absolute rounded-full flex items-center justify-center ${node.color} ${node.mastery > 0.7 ? 'neural-glow' : 'opacity-80'}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: node.size,
                height: node.size,
                boxShadow: `0 0 ${node.size * 2}px ${node.glowColor || 'currentColor'}`,
                transform: "translate(-50%, -50%)"
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isEvolving ? 1 : (isHovered ? 1 : [0.5, 1, 0.5]),
                scale: isEvolving ? [1, 2, 4] : (isHovered ? 1.5 : [1, 1.1, 1]),
              }}
              transition={{
                duration: isEvolving ? 3 : Math.random() * 4 + 3,
                repeat: (isEvolving || isHovered) ? 0 : Infinity,
                delay: isEvolving ? 0 : Math.random() * 2,
                ease: "easeInOut"
              }}
              onHoverStart={() => setHoveredNode(node.id)}
              onHoverEnd={() => setHoveredNode(null)}
            >
              {isHovered && node.label && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 20 }}
                  className="absolute whitespace-nowrap px-3 py-1 bg-black/80 backdrop-blur-md rounded-md border border-white/10 text-xs text-white/90 shadow-xl pointer-events-none z-50"
                >
                  {node.label}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
