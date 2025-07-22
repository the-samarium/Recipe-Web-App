const express=require('express')
const bcrypt = require('bcrypt')
const mongoose=require('mongoose')
const {isEmail}=require('validator')
const userschema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter Your name"]
    },
    email:{
        type:String,
        required:[true,"Enter your email"],
        unique:true,
        validate:[isEmail,"Enter a valid email."]
    },
    password:{
        type:String,
        required:[true,"Enter password"],
        unique:true
    },
   

})

//Fire this mongoose hook before saving the data to database
userschema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) return next();
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});


const User=mongoose.model("User",userschema)
module.exports={
    User
}