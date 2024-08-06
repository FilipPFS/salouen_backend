import { Request, Response, Router } from "express";
import User from "../mg-models/User";
import Stripe from "stripe";
import bodyParser from "body-parser";
import Command from "../mg-models/Command.";

require("dotenv").config();
const express = require("express");
const router: Router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

router.post("/", (req, res) => {
  const sig = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.WEBHOOK_SECRET!
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return res.status(400).send(`Webhook Error: ${errorMessage}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    (async () => {
      await createNewCommand(session);
      handleCheckoutSession(session);
    })();
  }

  res.json({ received: true });
});

const createNewCommand = async (session: Stripe.Checkout.Session) => {
  const userId = session.metadata?.userId;
  if (!userId) {
    console.error("No user ID in session metadata");
    return;
  }

  try {
    const user = await User.findById(userId);

    const newComamnd = new Command({
      userId: userId,
      email: user?.email,
      products: user?.cart,
      amount: user?.cart?.reduce((total, item) => total + item.price, 0) || 0,
    });

    await newComamnd.save();

    console.log("Successfully created new command.");
  } catch (error) {
    console.error("Error updating user cart:", error);
  }
};

const handleCheckoutSession = async (session: Stripe.Checkout.Session) => {
  const userId = session.metadata?.userId;
  if (!userId) {
    console.error("No user ID in session metadata");
    return;
  }

  try {
    const result = await User.findByIdAndUpdate(
      userId,
      { $set: { cart: [] } },
      { new: true }
    );

    if (!result) {
      console.error("User not found or cart update failed");
    } else {
      console.log("Cart successfully cleared for user:", userId);
    }
  } catch (error) {
    console.error("Error updating user cart:", error);
  }
};

module.exports = router;
