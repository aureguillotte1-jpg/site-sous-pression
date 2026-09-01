require('dotenv').config();

const express = require('express');
const Stripe = require('stripe');

const app = express();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Serveur OK');
});

app.listen(3000, () => {
  console.log('Serveur lancé sur http://localhost:3000');
});