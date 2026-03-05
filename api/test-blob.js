const { put, list } = require("@vercel/blob");

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const results = {};

  // Test 1: list
  try {
    const { blobs } = await list({ prefix: "justclaimed" });
    results.list = { ok: true, count: blobs.length, blobs: blobs.map(b => b.pathname) };
  } catch (err) {
    results.list = { ok: false, error: err.message };
  }

  // Test 2: put
  try {
    const blob = await put("justclaimed-test.json", JSON.stringify({ test: true, ts: Date.now() }), {
      access: "public",
      contentType: "application/json",
    });
    results.put = { ok: true, url: blob.url };
  } catch (err) {
    results.put = { ok: false, error: err.message, name: err.constructor.name };
  }

  res.status(200).json(results);
};
