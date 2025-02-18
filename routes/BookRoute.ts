import express from "express";
import {Book} from "../interface/Book";

const router = express.Router();

router.post('/add', (req, res) => {
    const book:Book = req.body;
    try {
        res.status(201).json({
            message: "book added successfully",
            book: book,
        });
    }catch (e) {
        console.log('error adding book : ',e)
        res.status(400).json({
            message: "error adding book",
        });
    }
});
router.get('/all', (req, res) => {
    try {
        res.status(200).json({
            message: "book get successfully",
        });
    }catch (e) {
        console.log('error get book : ',e)
        res.status(400).json({
            message: "error get book",
        });
    }
});

router.put('/update/:name', (req, res) => {
    const book:Book = req.body;
    const name = req.params.name
    try {
        res.status(200).json({
            message: "book update successfully",
            book: book,
            name: name
        });
    }catch (e) {
        console.log('error update book : ',e)
        res.status(400).json({
            message: "error update book",
        });
    }
});

export default router