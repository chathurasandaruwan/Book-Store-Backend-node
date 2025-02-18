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
// update book

export async function bookUpdate(bookData: Book,title:string){
    try{
        const updateCustomer  = await prisma.book.update({
            where:{
                title:title
            },
            data:{
                author:bookData.author,
                price:bookData.price,
                description:bookData.description,
                category:bookData.category,
                image:bookData.image,
                stock:bookData.stock
            }
        })
        console.log('Customer Updated :',updateCustomer)
        return updateCustomer;
    }catch(err) {
        console.log("error updating customer", err);
    }
}

// delete book
export async function bookDelete(title:string){
    try{
        const deleteCustomer  = await prisma.book.delete({
            where:{
                title:title
            }
        })
        console.log('Customer Deleted :',deleteCustomer)
        return deleteCustomer;
    }catch(err) {
        console.log("error deleting customer", err);
    }
}