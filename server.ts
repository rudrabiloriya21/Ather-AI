import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { processAetherChat } from "./server/chatHandler.js";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Chat Route for AETHER
  app.post("/api/chat", async (req, res) => {
    try {
      const result = await processAetherChat(req.body);
      res.json(result);
    } catch (error: any) {
      console.error("AETHER Engine Error:", error);
      res.status(500).json({ error: "Cognitive connection disrupted.", details: error?.message || String(error) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AETHER Cognitive Engine online on http://0.0.0.0:${PORT}`);
  });
}

startServer();
