import express from "express";
import {Book} from "../interface/Book";
import {bookAdd, bookDelete, bookExist, bookGetAll, bookIdExist, bookUpdate} from "../controller/BookController";
import {authenticateToken} from "./AuthRoute";

const router = express.Router();


router.get('/all', async (req, res) => {
    try {
        // get
        const getAllBook = await bookGetAll();
        res.json(getAllBook);
    } catch (e) {
        console.log('error get book : ', e)
        res.status(400).json({
            message: "error get book",
        });
    }
});

router.use(authenticateToken);
router.post('/add', async (req, res) => {
    const book: Book = req.body;
    try {
        // check exists
        const exists = await bookExist(book.title);
        if(exists){
            res.status(400).json("Book title already exists !!!");
            return;
        }
        // add
        const newBook = await bookAdd(book);
        res.json(newBook);
    } catch (e) {
        console.log('error adding book : ', e)
        res.status(400).json({
            message: "error adding book",
        });
    }
});

router.put('/update/:id', async (req, res) => {
    const book: Book = req.body;
    const id = req.params.id
    try {
        // check exists
        const existsId = await bookIdExist(id);
        if(!existsId){
            res.status(400).json("Book doesn't exists !!!");
            return;
        }
        // update
        const updateBook = await bookUpdate(book,id);
        res.json(updateBook);
    } catch (e) {
        console.log('error update book : ', e)
        res.status(400).json({
            message: "error update book",
        });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    try {
        // check exists
        const exists = await bookIdExist(id);
        if(!exists){
            res.status(400).send("Book doesn't exists !!!");
            return;
        }
        // delete
        const deleteBook = await bookDelete(id);
        res.json(deleteBook);
    } catch (e) {
        console.log('error delete book : ', e)
        res.status(400).json({
            message: "error delete book",
        });
    }
});

export default router