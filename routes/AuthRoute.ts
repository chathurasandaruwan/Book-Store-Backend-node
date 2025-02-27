import jwt, {Secret} from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from "express";
import {User} from "../interface/User";
import {signUp, userExist, userGetByEmail, verifyUserCredentials} from "../controller/AuthController";

dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
    console.log('Login')
    const email = req.body.user.email;
    const password = req.body.user.password;

    const user:{email: string, password: string}  = {email, password};

    try{
        const isVerified =  await verifyUserCredentials(user);
        const userDetail = await userGetByEmail(email);
        if(isVerified){
            const token = jwt.sign({ email }, process.env.SECRET_KEY as Secret, {expiresIn: "1d"});
            const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN as Secret, {expiresIn: "7d"});
            res.json({accessToken : token, refreshToken : refreshToken,user : userDetail});
        }else{
            res.sendStatus(403).json({message: 'Invalid credentials or your account is blocked by admin'});
        }
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }

})

router.post("/register", async (req, res) => {

    const user : User = req.body.user;
    const email = user.email;
    console.log('register page',user)

    try{
        // check exists
        const exists = await userExist(email);
        if(exists){
            res.status(400).send("User email already exists !!!");
            return;
        }
        // save auther
        const registration = await signUp(user);
        if (registration === null || registration === undefined) {
            res.status(400).json({
                message: "error registering user",
            });
            return;
        }else {
            // generate token
            const token = jwt.sign({ email }, process.env.SECRET_KEY as Secret, {expiresIn: "1d"});
            res.json({accessToken : token, user : registration});
        }
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }

})

router.post("/refresh-token", async (req, res) => {
    const authHeader = req.headers.authorization;
    const refresh_token = authHeader?.split(' ')[1];

    if(!refresh_token){res.status(401).json({message : 'No token provided'}); return}

    try{
        const payload = jwt.verify(refresh_token as string, process.env.REFRESH_TOKEN as Secret) as {email: string, iat: number};
        const token = jwt.sign({ email: payload.email }, process.env.SECRET_KEY as Secret, {expiresIn: "1d"});
        res.json({accessToken : token});
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }
})

export function authenticateToken(req : express.Request, res : express.Response, next : express.NextFunction){
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if(!token){res.status(401).json({message : 'No token provided'}); return}

    try{
        const payload = jwt.verify(token as string, process.env.SECRET_KEY as Secret) as {email: string, iat: number};
        req.body.email = payload.email;
        next();
    }catch(err){
        res.status(401).json(err);
    }
}

export default router;