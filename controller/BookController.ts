// connect with DB
import {PrismaClient} from "@prisma/client";
import {Book} from "../interface/Book";

const prisma = new PrismaClient();
// save book
export async function bookAdd(bookData: Book){
    try{
        const newCustomer  = await prisma.book.create({
            data:{
                title:bookData.title,
                author:bookData.author,
                price:bookData.price,
                description:bookData.description,
                category:bookData.category,
                image:bookData.image,
                stock:bookData.stock
            }
        })
        console.log('Customer Added :',newCustomer)
        return newCustomer;
    }catch(err) {
        console.log("error adding customer", err);
    }
}