import express from 'express'
import dotenv from 'dotenv'

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
app.use('/',(req,res,next)=>{
    res.status(404).send('Not Found');
})