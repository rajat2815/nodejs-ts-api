import {Request , Response} from "express"
import {Book} from "../models/book"

export interface IResponse{
    success :boolean,
    message :string,
    data?:any
}

export const getBooks = async (req: Request, res:Response)=>{

    return res.status(200).json({success:true , message : "My data is" , data : {id:req.id , role: req.role}})
    try {
        const books = await Book.find()
        if(!books)
        {
            return res.status(404).json({success:false , message:"No books found"} as IResponse)
        }

        return res.status(200).json({success:true , message:"Books Found" , data:books}as IResponse)
        
    } catch (error) {
        return res.status(500).json({success : false , message:"Internal Server error"} as IResponse)
        
    }
    
}
export const addBook = async(req:Request , res:Response)=>{
    if(req.role !== "creator"){
        return res.status(401).json({success:false , message:"You are not eligible", data:null})
    }
    
    const{name , author , publishYear , description} = req.body
    try {
        const book = await Book.create({
            author : author ,
            description : description,
            name:name,
            publishYear:publishYear
        })
        return res.status(201).json({success:true , message:"Book Added" , data:book}as IResponse)    //201 shows that something got created
        
        //STATUS CODES
        // 1XX : Informational
        // 2XX : Success
        // 3XX : Redirectional
        // 4XX : Client Side
        // 5XX : Server side

    } catch (error:any) {
        return res.status(500).json({success:false , message: error.message})
        
    }
}  

export const updateBook = async(req:Request , res:Response)=>{

    const { id } = req.params
    const{name , author , publishYear , description} = req.body
    try {
        const book = await Book.findByIdAndUpdate(id, {name , author, publishYear , description} , {new:true});

        //this new true helps us generate updated data.

        if(!book) return res.status(404).json({success:false , message:"No books found"})

        return res.status(200).json({success:true , message:"Book Updated" , data:book}as IResponse)
        
    } catch (error:any) {

        return res.status(500).json({success:false ,  message:error.message} as IResponse)
    }
}

export const deleteBook = async(req:Request , res:Response) => {
    const { id } = req.params

    try {
    
        const book = await Book.findByIdAndDelete(id);

        if(!book){
            return res.status(404).json({success:false , message:"Book not found"}as IResponse)
        }

        return res.status(200).json({success:false , message:"Book deleted Succesfully"})

        
    } catch (error:any) {
        return res.status(500).json({success:false , message:error.message} as IResponse)
    }
}   