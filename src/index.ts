import express,{Express , Request , Response } from "express";
import {config} from "dotenv";
import cors from "cors"
import {connectDb} from "./utils/db"
import bookRouter from "./routes/bookRoute"
import authRouter from "./routes/authRoute"
import routes from "./routes";

const app:Express = express() 

config() 
const port = process.env.PORT || 8080

//DB Connection
connectDb();

//Middlewares
//1.//
app.use(cors({
    origin:process.env.HOST_URL || "*"    //request kaha se aani chahiye
    //local host pe jo HOST_URL pe chal rha wo app isse accesskar sakta h
}))

app.use(express.json())

//2.//
app.use("/api/book", bookRouter)
app.use("/api" , routes);
app.use("/api/auth", authRouter);



//basic endpoint
app.get("/" , (req:Request , res:Response) => {  
    res.send("Hello World");
    // res.json({success : true , message:"Hello World"})
})

app.listen(port, () => console.log(`server is running on port port ${port}`))