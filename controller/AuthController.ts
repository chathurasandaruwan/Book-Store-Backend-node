import {PrismaClient} from "@prisma/client";
import {User} from "../interface/User";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function signUp(user : User) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const id = await generateUserId();
    const addedUser = await prisma.user.create({
        data: {
            id: id,
            name: user.name,
            email: user.email,
            password: hashedPassword,
            role: user.role,
            status: user.status,
        },
    });
    console.log("User created:", addedUser);
}

export async function verifyUserCredentials(verifyUser: {email: string, password: string}) {
    const user   = await prisma.user.findUnique({
        where: { email: verifyUser.email },
    });
    if (!user) {
        return false;
    }

    return await bcrypt.compare(verifyUser.password, user.password);
}
//check user email exist
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
}