import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);

router.post(
    "/webhook",
    bodyParser.raw({ type: "application/json" }),
    async (req, res) => {
        const sig = req.headers["stripe-signature"] as string;
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        let event: Stripe.Event;

        try {
            if (!endpointSecret) {
                throw new Error("Missing webhook secret!");
            }
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        } catch (err: any) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return; // Add a return statement here
        }

        // Handle different event types
        switch (event.type) {
            case "payment_intent.succeeded":
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                console.log("Payment successful:", paymentIntent.id);
                break;
            case "payment_intent.payment_failed":
                const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
                console.log("Payment failed:", failedPaymentIntent.last_payment_error?.message);
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
    }
);
export default router;
