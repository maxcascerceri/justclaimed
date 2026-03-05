const { put, list, del } = require("@vercel/blob");

const BLOB_PREFIX   = "justclaimed-settlements";
const ADMIN_SECRET  = process.env.ADMIN_SECRET || "justclaimed-admin-2024";

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
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(200).end();

  // GET — return latest settlements
  if (req.method === "GET") {
    try {
      const { blobs } = await list({ prefix: BLOB_PREFIX });
      if (!blobs.length) return res.status(200).json({ settlements: null });

      // Sort newest first and fetch the latest
      blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
      const r = await fetch(blobs[0].url, {
        headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      });
      if (!r.ok) return res.status(200).json({ settlements: null });

      const settlements = await r.json();
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

      // Write new blob (random suffix = no conflicts)
      const blob = await put(
        BLOB_PREFIX + ".json",
        JSON.stringify(settlements),
        { access: "private", contentType: "application/json" }
      );

      // Clean up older blobs in background (don't await — keep response fast)
      list({ prefix: BLOB_PREFIX }).then(({ blobs }) => {
        const old = blobs.filter(b => b.url !== blob.url);
        if (old.length) del(old.map(b => b.url)).catch(() => {});
      }).catch(() => {});

      return res.status(200).json({ ok: true, count: settlements.length });
    } catch (err) {
      console.error("POST error:", err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
