// connect with DB
import {PrismaClient} from "@prisma/client";
import {User} from "../interface/User";


const prisma = new PrismaClient();
// save user
export async function userAdd(userData: User){
    try{
        const newUser  = await prisma.user.create({
            data:{
                email:userData.email,
                password:userData.password,
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
// update book

export async function userUpdate(userData: User,email:string){
    try{
        const updateUser  = await prisma.user.update({
            where:{
                email:email
            },
            data:{
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

// delete book
export async function userDelete(email:string){
    try{
        const deleteUser  = await prisma.user.delete({
            where:{
                email:email
            }
        });
        console.log('User Deleted :',deleteUser)
        return deleteUser;
    }catch(err) {
        console.log("error deleting User", err);
    }
}

//get All books
export async function userGetAll(){
    try{
        const getUser  = await prisma.user.findMany()
        console.log('User get :',getUser)
        return getUser;
    }catch(err) {
        console.log("error get User", err);
    }
}
//check book exist
export async function userExist(email:string){
    try{
        const getUser  = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        console.log('User get :',getUser)
        return !!getUser;
    }catch(err) {
        console.log("error get User", err);
    }
}