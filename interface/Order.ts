import {Book} from "./Book";
import {OrderDetail} from "./OrderDetail";

export interface Order {
    id:string
    userId:string
    status:'pending' | 'completed'
    books:OrderDetail[]
}