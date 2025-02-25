import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);


export const createPaymentIntent = async (amount: number, currency: string) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency,
        });
        return paymentIntent;
    } catch (error) {
        console.error("Error creating payment intent:", error);
        throw new Error("Payment Intent Creation Failed");
    }
};
