import express from "express";
import {User} from "../interface/User";

const router = express.Router();

router.post('/add', (req, res) => {
    const user:User = req.body
    try {
        res.status(201).json({
            message: "user added successfully",
            user: user,
        });
    }catch (e) {
        console.log('error adding user : ',e)
        res.status(400).json({
            message: "error adding user",
        });
    }
});
router.get('/all', (req, res) => {
    try {
        res.status(201).json({
            message: "user getting successfully",
        });
    }catch (e) {
        console.log('error getting user : ',e)
        res.status(400).json({
            message: "error getting user",
        });
    }
})
router.put('update/:email', (req, res) => {
    const user:User = req.body
    const email = req.params.email
    try {
        res.status(200).json({
            message: "user update successfully",
            user: user,
            email: email
        });
    }catch (e) {
        console.log('error update user : ',e)
        res.status(400).json({
            message: "error update user",
        });
    }
})
router.delete('/delete/:email', (req, res) => {
    const email = req.params.email
    try {
        res.status(200).json({
            message: "user delete successfully",
            email: email
        });
    }catch (e) {
        console.log('error delete user : ',e)
        res.status(400).json({
            message: "error delete user",
        });
    }
})