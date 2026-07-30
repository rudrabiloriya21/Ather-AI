export interface LearningDNA {
  curiosity: number;
  creativity: number;
  logic: number;
  memory: number;
  wonder: number;
  focus: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "aether";
  content: string;
  timestamp: number;
  metadata?: {
    memoryUpdated?: boolean;
    curiosityIncreased?: boolean;
    knowledgeExpanded?: boolean;
    dnaRefined?: boolean;
    brainExpanded?: boolean;
  };
}

export interface GalaxyNode {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  label: string;
  mastery: number; // 0 to 1
  connections: string[]; // ids of connected nodes
  glowColor?: string;
}
