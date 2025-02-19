import express from 'express'
import dotenv from 'dotenv'
import BookRoute from "./routes/BookRoute";
import UserRoute from "./routes/UserRoute";
import OrderRoute from "./routes/OrderRoute";

dotenv.config();
const port = process.env.PORT || 3000
const app = express()

app.use(express.json())

app.use('/',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type');
    next();
});
app.use('/book',BookRoute);
app.use('/user',UserRoute);
app.use('/order',OrderRoute);
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
app.use('/',(req,res,next)=>{
    res.status(404).send('Not Found');
})