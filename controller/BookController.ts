// connect with DB
import {PrismaClient} from "@prisma/client";
import {Book} from "../interface/Book";

const prisma = new PrismaClient();
// save book
export async function bookAdd(bookData: Book){
    try{
        const id = await generateBookId();
        const newBook  = await prisma.book.create({
            data:{
                id:id,
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
//find last book
export async function bookLastId(){
    try{
        const lastBook = await prisma.book.findFirst({
            orderBy: { id: 'desc' },
        });
        console.log('Book get :',lastBook)
        return lastBook;
    }catch(err) {
        console.log("error get Book", err);
    }
}
// generate Id
async function generateBookId() {
    try {
        const lastBook = await bookLastId();
        let newId = "B00-001"; // Default ID for the first record

        if (lastBook) {
            const lastNumber = parseInt(lastBook.id.split("-")[1], 10);
            newId = `B00-${String(lastNumber + 1).padStart(3, "0")}`;
        }

        return newId;
    } catch (e) {

    }
}