export const sendToken=(user,statusCode,res,message)=>{
    const Token=user.getJWTToken();
    const option ={
        expires:new Date(
        Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true,
    };
        res.status(statusCode).cookie("token",token,options).json({
            success:true,
            user,
            message,
            Token,
        });
    }
