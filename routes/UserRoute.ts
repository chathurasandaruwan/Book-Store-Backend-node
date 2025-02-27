import express from "express";
import {User} from "../interface/User";
import {userAdd, userDelete, userGetAll, userIdExist, userUpdate} from "../controller/UserController";
import {userExist} from "../controller/AuthController";

const router = express.Router();

router.post('/add', async (req, res) => {
    const user: User = req.body
    try {
        // check exists
        const exists = await userExist(user.email);
        if(exists){
            res.status(400).send("User email already exists !!!");
            return;
        }
        // add
        const newUser = await userAdd(user);
        res.json(newUser);
    } catch (e) {
        console.log('error adding user : ', e)
        res.status(400).json({
            message: "error adding user",
        });
    }
});
router.get('/all', async (req, res) => {
    try {
        // get
        const AllUser = await userGetAll();
        res.json(AllUser);
    } catch (e) {
        console.log('error getting user : ', e)
        res.status(400).json({
            message: "error getting user",
        });
    }
})
router.put('/update/:id', async (req, res) => {
    const user: User = req.body
    const id = req.params.id
    try {
        //check exists
        const existsId = await userIdExist(id);
        if(!existsId){
            res.status(400).send("User doesn't exists !!!");
            return;
        }
        // update
        const updatedUser = await userUpdate(user,id);
        res.json(updatedUser);
    } catch (e) {
        console.log('error update user : ', e)
        res.status(400).json({
            message: "error update user",
        });
    }
})
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    try {
        // check exists
        const exists = await userIdExist(id);
        if(!exists){
            res.status(400).send("User doesn't exists !!!");
            return;
        }
        // delete
        const deletedUser = await userDelete(id);
        res.json(deletedUser);
    } catch (e) {
        console.log('error delete user : ', e)
        res.status(400).json({
            message: "error delete user",
        });
    }
})

export default router;