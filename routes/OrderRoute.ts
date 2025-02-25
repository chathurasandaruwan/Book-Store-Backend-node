import express from "express";
import {Order} from "../interface/Order";
import {orderAdd, orderGetAll, orderUpdate} from "../controller/OrdreController";


const router = express.Router();
//place order
/*router.post('/add', async (req, res) => {
    const order: Order = req.body
    try {
        // add
        const newOrder = await orderAdd(order);
        res.json(newOrder);
    } catch (e) {
        console.log('error adding order : ', e)
        res.status(400).json({
            message: "error adding order",
        });
    }
});*/
router.get('/all', async (req, res) => {

    try {
        // get
        const getAllOrder = await orderGetAll();
        res.json(getAllOrder);
    } catch (e) {
        console.log('error get order : ', e)
        res.status(400).json({
            message: "error get order",
        });
    }
})

router.put('/update/:id', async (req, res) => {
    const { status } = req.body;
    const id = req.params.id
    try {
        // update
        const updatedOrder = await orderUpdate(status,id);
        res.json(updatedOrder);
    } catch (e) {
        console.log('error update order : ', e)
        res.status(400).json({
            message: "error update order",
        });
    }
})
export default router