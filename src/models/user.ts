import{model , Schema,Types} from "mongoose";

interface IUser{
    name:string,
    email:string,
    phone:string,
    username:string,
    password:string,
    booksAdded?:string[],
    role:string
}

const userSchema = new Schema({
    name:{
        type: String,
        trim:true,
        required:true
    },
     email:{
        type: String,
        trim:true,
        required:true,
        unique:true
    },
     phone:{
        type: String,
        trim:true,
        required:true
    },
     username:{
        type: String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type: String,
        trim:true,
        required:true
    },
    role:{
        type: String,
        enum:["creator" , "admin","visitor"]
    },
    booksAdded:[
        {
        type: Schema.Types.ObjectId,
        ref:"Book "
    }
]
})


const User = model<IUser>("User" , userSchema)
export{User , IUser};

