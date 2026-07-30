import { processAetherChat } from "../server/chatHandler";

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
    const result = await processAetherChat(body);
    return res.status(200).json(result);
  } catch (err: any) {
    console.error("Vercel Serverless Function Error:", err);
    return res.status(500).json({
      error: "Cognitive connection disrupted.",
      details: err?.message || String(err)
    });
  }
}
