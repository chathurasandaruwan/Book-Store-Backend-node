import express from "express";
import {createPaymentIntent} from "../../stripe/service";


const router = express.Router();

router.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount, currency ,metadata} = req.body;
        const paymentIntent = await createPaymentIntent(amount, currency,metadata);
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
