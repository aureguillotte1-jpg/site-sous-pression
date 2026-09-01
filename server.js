require("dotenv").config();
console.log(
  "Début de la clé Stripe :",
  process.env.STRIPE_SECRET_KEY?.substring(0, 8)
);

const express = require("express");
const Stripe = require("stripe");

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.static("public"));
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
  mode: "payment",

  shipping_address_collection: {
    allowed_countries: ["FR", "BE", "CH", "LU"]
  },

  line_items: [
    {
      price: "price_1U2a64DBG3c8VENp948y0yT4",
      quantity: 1
    }
  ],

  success_url: "http://localhost:3000/success.html",
  cancel_url: "http://localhost:3000/"
});

 

    res.json({ url: session.url });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la création du paiement"
    });
  }
});

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});