// connect with DB
import {PrismaClient} from "@prisma/client";
import {User} from "../interface/User";


const prisma = new PrismaClient();
// save user
/*export async function userAdd(userData: User){
    try{
        const id = await generateUserId();
        const newUser  = await prisma.user.create({
            data:{
                id:id,
                name:userData.name,
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
}*/
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

/*
//find last user
export async function userLast(){
    try{
        const lastUser = await prisma.user.findFirst({
            orderBy: { id: 'desc' },
        });
        console.log('User get :',lastUser)
        return lastUser;
    }catch(err) {
        console.log("error get User", err);
    }
}
//generate user id
export async function generateUserId(){
    try{
        const lastUser = await userLast();
        let newId = "U00-001"; // Default for first record

        if (lastUser) {
            const lastNumber = parseInt(lastUser.id.split("-")[1], 10);
            newId = `U00-${String(lastNumber + 1).padStart(3, "0")}`;
        }

        return newId;
    }catch(err) {
        console.log("error get User", err);
    }
}*/
