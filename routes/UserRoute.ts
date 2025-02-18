import express from "express";
import {User} from "../interface/User";
import {userAdd, userDelete, userExist, userGetAll, userUpdate} from "../controller/UserController";

const router = express.Router();

router.post('/add', async (req, res) => {
    const user: User = req.body
    try {
        // check exists
        const exists = await userExist(user.email);
        if(exists){
            res.status(400).send("User already exists !!!");
            return;
        }
        // add
        const newUser = await userAdd(user);
        res.status(201).json({
            message: "user added successfully",
            user: newUser,
        });
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
        res.status(201).json({
            message: "user getting successfully",
            users: AllUser
        });
    } catch (e) {
        console.log('error getting user : ', e)
        res.status(400).json({
            message: "error getting user",
        });
    }
})
router.put('/update/:email', async (req, res) => {
    const user: User = req.body
    const email = req.params.email
    try {
        //check exists
        const exists = await userExist(email);
        if(!exists){
            res.status(400).send("User doesn't exists !!!");
            return;
        }
        // update
        const newUser = await userUpdate(user,email);
        res.status(200).json({
            message: "user update successfully",
            user: newUser,
            email: email
        });
    } catch (e) {
        console.log('error update user : ', e)
        res.status(400).json({
            message: "error update user",
        });
    }
})
router.delete('/delete/:email', async (req, res) => {
    const email = req.params.email
    try {
        // check exists
        const exists = await userExist(email);
        if(!exists){
            res.status(400).send("User doesn't exists !!!");
            return;
        }
        // delete
        const deleteUser = await userDelete(email);
        res.status(200).json({
            message: "user delete successfully",
            email: email,
            deleteUser:deleteUser
        });
    } catch (e) {
        console.log('error delete user : ', e)
        res.status(400).json({
            message: "error delete user",
        });
    }
})

export default router;