const jwt = require('jsonwebtoken');
const { User } = require('../model/model');
//This middleware verifies the token brfore loading any page,and if not, peotects the page
const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;

    if(token){
        jwt.verify(token,'secretkey',(err,decoded)=>{
            if(err){
                console.log(`Error occured:${err}`);
                res.redirect('/login');
            }
            else{
                // console.log(decoded);
                next();
            }
        })
    }
    else{
         res.redirect('/login');
    }
}

//check current user 
const checkuser= (req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,'secretkey',async (err,decoded)=>{
            if(err){
                console.log(`Error occured:${err}`);
                res.locals.user=null;
                next();
            }
            else{
                const user= await User.findById(decoded.id)
                res.locals.user=user; //local property as user available in ejs files
                console.log("User set in res.locals.user:", user.name);
                next()
            }
        })
    }else{
        res.locals.user=null;
        next();
    }
}

module.exports = { requireAuth, checkuser };