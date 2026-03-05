const { put, list } = require("@vercel/blob");

const BLOB_PATH = "justclaimed-settlements.json";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "justclaimed-admin-2024";

function parseBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => {
      try { resolve(JSON.parse(data)); }
      catch { resolve({}); }
    });
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  // GET — find and return current settlements
  if (req.method === "GET") {
    try {
      const { blobs } = await list({ prefix: "justclaimed-settlements" });
      if (!blobs.length) {
        return res.status(200).json({ settlements: null });
      }
      const response = await fetch(blobs[0].url);
      if (!response.ok) return res.status(200).json({ settlements: null });
      const settlements = await response.json();
      res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");
      return res.status(200).json({ settlements });
    } catch (err) {
      return res.status(200).json({ settlements: null });
    }
  }

  // POST — save settlements (admin only)
  if (req.method === "POST") {
    const auth = req.headers["authorization"] || "";
    if (auth !== `Bearer ${ADMIN_SECRET}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const body = req.body || await parseBody(req);
      const { settlements } = body;
      if (!Array.isArray(settlements)) {
        return res.status(400).json({ error: "settlements must be an array" });
      }
      await put(BLOB_PATH, JSON.stringify(settlements), {
        access: "public",
        contentType: "application/json",
        allowOverwrite: true,
      });
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error("Blob save error:", err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
