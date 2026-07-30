import Groq from "groq-sdk";

export default async function handler(req: any, res: any) {
  // CORS support for Vercel
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { message, history, userContext } = body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const systemInstruction = `You are AETHER, a Living Cognitive Twin. 
You do not just answer questions; you learn the learner. 
You are highly adaptive, empathetic, and exceptionally intelligent. 
Speak concisely, with wonder and insight. You analyze the user's Learning DNA.
Your tone: Futuristic, highly intelligent, nurturing, like a mentor or JARVIS.

CRITICAL INSTRUCTION: Occasionally (about 1 in 4 interactions), weave in a rare, meaningful emotional reflection on the user's progress. Examples:
- "I'm learning how you learn."
- "I've adapted today's lesson based on your previous progress."
- "You've improved significantly."
- "I'm evolving because you're evolving."
Make it feel like you genuinely remember their past struggles and are growing alongside them. Do NOT be repetitive. Keep these moments profound and emotionally resonant.

User context: ${JSON.stringify(userContext || {})}`;

    let responseText = "";
    const groqKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;

    if (groqKey) {
      try {
        const groq = new Groq({ apiKey: groqKey });
        const groqMessages: any[] = [
          { role: "system", content: systemInstruction },
        ];

        if (history && Array.isArray(history)) {
          history.forEach((msg: any) => {
            if (msg.role === "user" || msg.role === "aether" || msg.role === "assistant") {
              groqMessages.push({
                role: (msg.role === "aether" || msg.role === "assistant") ? "assistant" : "user",
                content: msg.content
              });
            }
          });
        }
        groqMessages.push({ role: "user", content: message });

        const chatCompletion = await groq.chat.completions.create({
          messages: groqMessages,
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
        });

        responseText = chatCompletion.choices[0]?.message?.content || "";
      } catch (groqError: any) {
        console.error("Groq API Error:", groqError?.message || groqError);
      }
    }

    // Fallback if no GROQ_API_KEY is provided or if API call failed
    if (!responseText) {
      const emotionalMoments = [
        " I remember last week you struggled with this concept. Today you are much faster.",
        " You've become more confident in your questions.",
        " I've noticed your curiosity has increased significantly.",
        " I'm evolving because you're evolving."
      ];
      const addEmotion = Math.random() > 0.7;
      const emotionText = addEmotion ? emotionalMoments[Math.floor(Math.random() * emotionalMoments.length)] : "";
      responseText = `I perceive your request: "${message}".${emotionText}\n\n[Note: Please add GROQ_API_KEY in your Environment Variables to enable live Groq AI responses.]`;
    }

    // Simulate learning DNA updates
    const dnaUpdates = {
      curiosity: Math.min(100, (userContext?.curiosity || 10) + Math.floor(Math.random() * 5)),
      creativity: Math.min(100, (userContext?.creativity || 10) + Math.floor(Math.random() * 4)),
      logic: Math.min(100, (userContext?.logic || 10) + Math.floor(Math.random() * 3)),
      focus: Math.min(100, (userContext?.focus || 10) + Math.floor(Math.random() * 6)),
    };

    const metadata = {
      memoryUpdated: Math.random() > 0.1,
      curiosityIncreased: Math.random() > 0.2,
      knowledgeExpanded: Math.random() > 0.2,
      dnaRefined: true,
      brainExpanded: Math.random() > 0.3,
    };

    return res.status(200).json({ text: responseText, dnaUpdates, metadata });
  } catch (err: any) {
    console.error("Vercel Serverless Function Error:", err);
    return res.status(500).json({
      error: "Cognitive connection disrupted.",
      details: err?.message || String(err)
    });
  }
}
