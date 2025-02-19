import {Book} from "./Book";

export interface Order {
    id:string
    userId:string
    status:'pending' | 'completed'
    books:Book[]
}