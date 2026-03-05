const { put, list, del } = require("@vercel/blob");

const BLOB_PREFIX = "justclaimed-settlements";
const BLOB_PATH   = "justclaimed-settlements.json";
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

async function getLatestBlob() {
  const { blobs } = await list({ prefix: BLOB_PREFIX });
  if (!blobs.length) return null;
  // Sort newest first
  blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
  return blobs[0];
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  // GET — return current settlements
  if (req.method === "GET") {
    try {
      const blob = await getLatestBlob();
      if (!blob) return res.status(200).json({ settlements: null });
      const response = await fetch(blob.url);
      if (!response.ok) return res.status(200).json({ settlements: null });
      const settlements = await response.json();
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json({ settlements });
    } catch (err) {
      console.error("GET error:", err.message);
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

      // Delete old blobs to avoid accumulation
      const { blobs } = await list({ prefix: BLOB_PREFIX });
      if (blobs.length) {
        await del(blobs.map(b => b.url));
      }

      // Write fresh blob
      await put(BLOB_PATH, JSON.stringify(settlements), {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
      });

      return res.status(200).json({ ok: true, count: settlements.length });
    } catch (err) {
      console.error("POST error:", err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
