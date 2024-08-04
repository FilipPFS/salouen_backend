import { Router } from "express";

require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const router: Router = express.Router();

interface Product {
  _id: string;
  img: string;
  price: number;
  productId: string;
  quantity: number;
  title: string;
}

router.post("/create-checkout-session", async (req, res) => {
  const { products, userId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((product: Product) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: product.title,
          },
          unit_amount: product.price,
        },
        quantity: product.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      metadata: { userId: userId }, // Add user ID as metadata
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
