import {PrismaClient} from "@prisma/client";
import {Order} from "../interface/Order";


const prisma = new PrismaClient();

//save order
export async function orderAdd(orderData: Order){
    try{
        const id = await generateOrderId();
        const newOrder = await prisma.$transaction(async (tx) => {
            // Create Order
            const order = await tx.order.create({
                data: {
                    id:id,
                    status:orderData.status,
                    user: { connect: { id: orderData.userId } },
                    books: {
                        create: orderData.books.map((book) => ({
                            book: { connect: { id: book.bookId} },
                            quantity: book.quantity,
                            price: book.price,
                        })),
                    },
                },
                include: { books: { include: { book: true } } },
            });

            // Update Book Stock
            for (const book of orderData.books) {
                await tx.book.update({
                    where: { id: book.bookId },
                    data: { stock: { decrement: book.quantity } },
                });
            }
            return order;
        });
        console.log('Order Added :',newOrder)
        return newOrder;
    }catch(err) {
        console.log("error adding Order", err);
    }
}
//update order status
export async function orderUpdate(status: string,id:string){
    try{
        const updateOrder  = await prisma.order.update({
            where:{
                id:id
            },
            data:{
                status:status,
            }
        })
        console.log('Order Updated :',updateOrder)
        return updateOrder;
    }catch(err) {
        console.log("error update Order",err)
    }
}
//get All
export async function orderGetAll(){
    try{
        const getOrders  = await prisma.order.findMany({
            include: {
                books: { include: { book: true } },
            },
        })
        console.log('Orders get :',getOrders)
        return getOrders;
    }catch(err) {
        console.log("error get Orders", err);
    }
}
// find last Order
export async function orderLast(){
    try{
        const lastOrder = await prisma.order.findFirst({
            orderBy: { id: 'desc' },
        })
        console.log('Order get :',lastOrder)
        return lastOrder;
    }catch(err) {
        console.log("error get Order", err);
    }
}
// generate order id
async function generateOrderId(){
    try {
        const lastOrder = await orderLast();
        let newId = "OID-001"; // Default ID for the first record

        if (lastOrder) {
            const lastNumber = parseInt(lastOrder.id.split("-")[1], 10);
            newId = `OID-${String(lastNumber + 1).padStart(3, "0")}`;
        }

        return newId;
    } catch (e) {

    }
}