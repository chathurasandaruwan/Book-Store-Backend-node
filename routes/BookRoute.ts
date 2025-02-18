import express from "express";
import {Book} from "../interface/Book";
import {bookAdd, bookDelete, bookExist, bookGetAll, bookUpdate} from "../controller/BookController";

const router = express.Router();

router.post('/add', async (req, res) => {
    const book: Book = req.body;
    try {
        // check exists
        const exists = await bookExist(book.title);
        if(exists){
            res.status(400).send("Book already exists !!!");
            return;
        }
        // add
        const newBook = await bookAdd(book);
        res.status(201).json({
            message: "book added successfully",
            book: newBook,
        });
    } catch (e) {
        console.log('error adding book : ', e)
        res.status(400).json({
            message: "error adding book",
        });
    }
});
router.get('/all', async (req, res) => {
    try {
        // get
        const getAllBook = await bookGetAll();
        res.status(200).json({
            message: "book get successfully",
            books: getAllBook
        });
    } catch (e) {
        console.log('error get book : ', e)
        res.status(400).json({
            message: "error get book",
        });
    }
});

router.put('/update/:title', async (req, res) => {
    const book: Book = req.body;
    const title = req.params.title
    try {
        // check exists
        const exists = await bookExist(title);
        if(!exists){
            res.status(400).send("Book doesn't exists !!!");
            return;
        }
        // update
        const updateBook = await bookUpdate(book,title);
        res.status(200).json({
            message: "book update successfully",
            book: updateBook,
            title: title
        });
    } catch (e) {
        console.log('error update book : ', e)
        res.status(400).json({
            message: "error update book",
        });
    }
});

router.delete('/delete/:name', async (req, res) => {
    const name = req.params.name
    try {
        // check exists
        const exists = await bookExist(name);
        if(!exists){
            res.status(400).send("Book doesn't exists !!!");
            return;
        }
        // delete
        const deleteBook = await bookDelete(name);
        res.status(200).json({
            message: "book delete successfully",
            deletedBook: deleteBook
        });
    } catch (e) {
        console.log('error delete book : ', e)
        res.status(400).json({
            message: "error delete book",
        });
    }
});

export default router