import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {orderAdd} from "../../controller/OrdreController";
import {Order} from "../../interface/Order";

dotenv.config();

const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);

router.post(
    "/webhook",
    bodyParser.raw({ type: "application/json" }),
    async (req, res) => {
        const sig = req.headers["stripe-signature"] as string;
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        let event;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            // console.log('Received event:', event);
            // Handle different event types
            switch (event.type) {
                case "payment_intent.succeeded":
                    const paymentIntent = event.data.object as Stripe.PaymentIntent;
                    console.log("Payment successful:", paymentIntent.id);
                    const newOrder: Order = {
                        id: paymentIntent.metadata.orderId || "",
                        status: "pending",
                        userId: paymentIntent.metadata.userId || "",
                        books: paymentIntent.metadata.books ? JSON.parse(paymentIntent.metadata.books) : [] // Parse books from metadata if needed
                    };

                    try {
                        // Add order to database
                        const addedOrder = await orderAdd(newOrder);
                        // res.json(addedOrder);
                    } catch (e) {
                        console.log("Error adding order:", e);
                        /*res.status(400).json({
                            message: "Error adding order",
                        });*/
                    }
                    break;
                case "payment_intent.payment_failed":
                    const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
                    console.log("Payment failed:", failedPaymentIntent.last_payment_error?.message);
                    break;
                default:
                    console.log(`Unhandled event type: ${event.type}`);
            }
        } catch (err: any) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return; // Add a return statement here
        }
        res.json({ received: true });
    }
);
export default router;
