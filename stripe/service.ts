import dotenv from "dotenv";

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


export const createPaymentIntent = async (amount: number, currency: string, metadata: any) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency,
            metadata,
        });
        return paymentIntent;
    } catch (error) {
        console.error("Error creating payment intent:", error);
        throw new Error("Payment Intent Creation Failed");
    }
};
