import express from 'express'
import dotenv from 'dotenv'
import BookRoute from "./routes/BookRoute";
import UserRoute from "./routes/UserRoute";
import OrderRoute from "./routes/OrderRoute";
import PaymentRoute from "./routes/payment/PaymentRoute";
import WebhookRoute from "./routes/payment/WebhookRoute";
import bodyParser from "body-parser";
import AuthRoute, {authenticateToken} from "./routes/AuthRoute";

dotenv.config();

const port = process.env.PORT || 3000
const app = express()

//link webhook route
app.use("/api/webhooks", bodyParser.raw({ type: "application/json" }), WebhookRoute);


app.use(express.json({ limit: "50mb" })); // Increase limit to 50MB
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use('/',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type');
    next();
});

app.use('/auth', AuthRoute);
app.use('/book',BookRoute);

app.use(authenticateToken);



// app.use('/book',BookRoute);
app.use('/user',UserRoute);
app.use('/order',OrderRoute);
app.use("/api/payments", PaymentRoute);
// app.use("/api/webhooks", WebhookRoute ,bodyParser.raw());
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
app.use('/',(req,res,next)=>{
    res.status(404).send('Not Found');
})