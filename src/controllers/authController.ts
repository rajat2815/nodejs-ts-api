import { Request, Response } from "express"
import { IResponse } from "./bookController"
import { User, IUser } from "../models/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {Secret} from "jsonwebtoken"

export const signup = async (req: Request, res: Response) => {

    //destructuring these variables from body
    const { name, email, phone, username, password , role } = req.body


    try {
        if(!name || !email || !phone || !username || !password || !role){
            return res.status(400).json({success:false , message:"Please fill all the fields" , data:null} as IResponse)
        }

        let user : IUser | null;
        user = await User.findOne({email})

        //check if user already exists 

        if(user){
            return res.status(500).json({success:false , message:"Please login" , data:null} as IResponse)
        }
         
        const securePassword = await bcrypt.hash(password , 10);

       
        user = await User.create({
            name , email , phone , username , password: securePassword  , role 
        })

        return res.status(201).json({success:true , message:"Sign up successfull" , data:user}as IResponse)


    } catch (error:any) {
        return res.status(500).json({ success: false, message: error.message , data:null} as IResponse)
    }

}

export const login = async(req:Request , res:Response) =>{
    const{email , password , username} = req.body

    try {

        if((!email && !username )||!password){
            return res.status(500).json({success:false , message:"please try with email and username" , data:null } as IResponse)
        }
        
       
        let user : IUser | null;
        user = await User.findOne({email})

        if(!user)
        {
            return res.status(400).json({success:false , message:"Please Signup!!" , data:null})
        }

        //checking if password is correct or not 
        //compare
        let comparePassword = await bcrypt.compare(password , user.password)
       
        //if incorrect
        if(!comparePassword){
            return res.status(500).json({success:false , message:"Invalid Email or Password" , data:null})
        }

        const payload= {
            id: user._id,
            role: user.role,

        }

        const token = jwt.sign(payload , process.env.JWT_SECRET as Secret , {
            expiresIn : "1hr",
        } )


        //if correct
        return res.status(200).cookie("token" , token).json({success:true , message:"Login Successfull" , data:{email , username , password}} as IResponse)
        
    } catch (error:any) {
        return res.status(500).json({success:false , message:error.message , data:null})
    }
}