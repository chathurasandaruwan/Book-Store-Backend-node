// connect with DB
import {PrismaClient} from "@prisma/client";
import {User} from "../interface/User";
import {generateUserId} from "./AuthController";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();
// save user
export async function userAdd(userData: User){
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    try{
        const id = await generateUserId();
        const newUser  = await prisma.user.create({
            data:{
                id:id,
                name:userData.name,
                email:userData.email,
                password:hashedPassword,
                role:userData.role,
                status:userData.status
            }
        })
        console.log('User Added :',newUser)
        return newUser;
    }catch(err) {
        console.log("error adding User", err);
    }
}
// update user

export async function userUpdate(userData: User,id:string){
    try{
        const updateUser  = await prisma.user.update({
            where:{
                id:id
            },
            data:{
                name:userData.name,
                email:userData.email,
                password:userData.password,
                role:userData.role,
                status:userData.status
            }
        })
        console.log('User Updated :',updateUser)
        return updateUser;
    }catch(err) {
        console.log("error updating User", err);
    }
}

// delete user
export async function userDelete(id:string){
    try{
        const deleteUser  = await prisma.user.delete({
            where:{
                id:id
            }
        });
        console.log('User Deleted :',deleteUser)
        return deleteUser;
    }catch(err) {
        console.log("error deleting User", err);
    }
}

//get All users
export async function userGetAll(){
    try{
        const getUser  = await prisma.user.findMany()
        console.log('User get :',getUser)
        return getUser;
    }catch(err) {
        console.log("error get User", err);
    }
}
//check user id exist
export async function userIdExist(id:string){
    try{
        const getUser  = await prisma.user.findUnique({
            where:{
                id:id
            }
        })
        console.log('User get :',getUser)
        return !!getUser;
    }catch(err) {
        console.log("error get User", err);
    }
}
