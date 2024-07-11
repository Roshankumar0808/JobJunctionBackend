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
   sendToken(user,201,res,"User Registered Successfully!");
});

export const login=catchAsyncErrors(async(req,res,next)=>{
const {email,password,role}=req.body;
if(!email||!password||!role){
  return next(new ErrorHandler("Please Provide email,password and role."))
}
const user=await User.findOne({email}).select("+password");
if(!user){
  new next(new ErrorHandler("Invalid Email or Password",400));

}
const isPasswordMatched=await user.comparepassword(password);
if(!isPasswordMatched){
  return next(new ErrorHandler("Invalid Email or Password.",400));
}
if(user.role!==role){
  return next(
  new ErrorHandler("User With This Role Not Found!",404)
  );

}
sendToken(user,201,res,"User logged in successfully!");
})
