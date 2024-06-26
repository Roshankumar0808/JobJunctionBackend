import { catchAsyncErrors } from '../middlewares/catchAsyncError.js'; 
import ErrorHandeler from '../middlewares/error.js';
import { User } from '../models/userSchema.js';
import { sendToken } from '../utils/jwtToken.js'; 
export const register= catchAsyncErrors(async(req,res,next)=>{
  const {name, email, phone,role,password}=req.body;
  if(!name||!email||!phone||!role||!password){
    return next(new ErrorHandeler("Please fill full registration form!"));
  }
   const isEmail=await User.findOne({ email });
   if(isEmail){
    return next(new ErrorHandeler("Email already exist!"));
   }
   const user= await User.create({
    name,
    email,
    phone,
    role,
    password,
   });
   sendToken(user,200,res,"User Registered Successfully!");
});
