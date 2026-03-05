const { put, head, getDownloadUrl } = require("@vercel/blob");

const BLOB_KEY = "justclaimed-settlements.json";
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

  // GET — return current settlements
  if (req.method === "GET") {
    try {
      const blobUrl = process.env.SETTLEMENTS_BLOB_URL;
      if (!blobUrl) {
        // No blob saved yet — return null so app falls back to built-in defaults
        return res.status(200).json({ settlements: null });
      }
      const response = await fetch(blobUrl);
      if (!response.ok) return res.status(200).json({ settlements: null });
      const data = await response.json();
      return res.status(200).json({ settlements: data });
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

      const blob = await put(BLOB_KEY, JSON.stringify(settlements), {
        access: "public",
        contentType: "application/json",
        allowOverwrite: true,
      });

      // Store URL in env hint (user must set SETTLEMENTS_BLOB_URL after first save)
      return res.status(200).json({ ok: true, url: blob.url });
    } catch (err) {
      console.error("Blob save error:", err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
