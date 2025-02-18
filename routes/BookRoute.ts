import express from "express";
import {Book} from "../interface/Book";

const router = express.Router();

router.post('/add', (req, res) => {
    const book:Book = req.body;
    try {
        res.status(201).json({
            message: "book added successfully",
            crop: book,
        });
    }catch (e) {
        console.log('error adding book : ',e)
        res.status(400).json({
            message: "error adding book",
        });
    }
});

export default router