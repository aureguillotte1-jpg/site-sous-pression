// server.js
const express = require('express');
const stripe = require('stripe')('sk_test_VOTRE_CLE_SECRETE'); // clé secrète Stripe
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Nom de votre produit',
            },
            unit_amount: 2000, // montant en centimes (ici 20,00 €)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/succes.html`,
      cancel_url: `${req.headers.origin}/annulation.html`,
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4242, () => console.log('Serveur lancé sur le port 4242'));