import {Router , Request , Response} from "express";
import { getBooks } from "../controllers/bookController";
import {addBook} from "../controllers/bookController"
import {updateBook} from "../controllers/bookController"
import {deleteBook} from "../controllers/bookController"

const bookRouter = Router()

bookRouter.get("/get-books" , getBooks)
bookRouter.post("/add-book" , addBook)
bookRouter.put("/update-book/:id" , updateBook)
bookRouter.delete("/delete-book/:id" , deleteBook)

export default bookRouter;

