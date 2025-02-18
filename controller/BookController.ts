// connect with DB
import {PrismaClient} from "@prisma/client";
import {Book} from "../interface/Book";

const prisma = new PrismaClient();
// save book
export async function bookAdd(bookData: Book){
    try{
        const newBook  = await prisma.book.create({
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
        console.log('Book Added :',newBook)
        return newBook;
    }catch(err) {
        console.log("error adding Book", err);
    }
}
// update book

export async function bookUpdate(bookData: Book,title:string){
    try{
        const updateBook  = await prisma.book.update({
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
        console.log('Book Updated :',updateBook)
        return updateBook;
    }catch(err) {
        console.log("error updating Book", err);
    }
}

// delete book
export async function bookDelete(title:string){
    try{
        const deleteBook  = await prisma.book.delete({
            where:{
                title:title
            }
        })
        console.log('Book Deleted :',deleteBook)
        return deleteBook;
    }catch(err) {
        console.log("error deleting Book", err);
    }
}

//get All books
export async function bookGetAll(){
    try{
        const getBook  = await prisma.book.findMany()
        console.log('Book get :',getBook)
        return getBook;
    }catch(err) {
        console.log("error get Book", err);
    }
}
//check book exist
export async function bookExist(title:string){
    try{
        const getBook  = await prisma.book.findUnique({
            where:{
                title:title
            }
        })
        console.log('Book get :',getBook)
        return !!getBook;
    }catch(err) {
        console.log("error get Book", err);
    }
}