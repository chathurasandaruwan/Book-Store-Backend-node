import express from "express";
import {Order} from "../interface/Order";
import {orderAdd, orderGetAll, orderUpdate} from "../controller/OrdreController";


const router = express.Router();
//place order
router.post('/add', async (req, res) => {
    const order: Order = req.body
    try {
        // add
        const newOrder = await orderAdd(order);
        res.status(201).json({
            message: "order added successfully",
            order: newOrder,
        });
    } catch (e) {
        console.log('error adding order : ', e)
        res.status(400).json({
            message: "error adding order",
        });
    }
});
router.get('/all', async (req, res) => {

    try {
        // get
        const getAllOrder = await orderGetAll();
        res.status(200).json({
            message: "order get successfully",
            orders: getAllOrder
        });
    } catch (e) {
        console.log('error get order : ', e)
        res.status(400).json({
            message: "error get order",
        });
    }
})

router.put('/update/:id', async (req, res) => {
    const order: Order = req.body
    const id = req.params.id
    try {
        // update
        const updateOrder = await orderUpdate(order,id);
        res.status(200).json({
            message: "order update successfully",
            order: updateOrder,
            title: id
        });
    } catch (e) {
        console.log('error update order : ', e)
        res.status(400).json({
            message: "error update order",
        });
    }
})
export default router