const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PRICE_ID = process.env.STRIPE_PRICE_ID || "price_1T6gNGCjBr2i2M8RGsaeUW1c";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: "Stripe secret key not configured." });
  }

  try {
    const origin = req.headers.origin || `https://${req.headers.host}`;
    const { email, settlementId } = req.body || {};

    const sessionParams = {
      ui_mode: "embedded",
      mode: "subscription",
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      subscription_data: { trial_period_days: 7 },
      payment_method_types: ["card"],
      payment_method_collection: "always",
      return_url: `${origin}/dashboard?subscribed=true&session_id={CHECKOUT_SESSION_ID}`,
      billing_address_collection: "auto",
    };

    // Pre-populate email if provided
    if (email && email.trim()) {
      sessionParams.customer_email = email.trim();
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    res.status(200).json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
};
