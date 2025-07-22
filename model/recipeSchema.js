const express=require('express')
const mongoose = require('mongoose')

const recipeSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,"Enter Recipe title"]
    },
    ingredients:{
        type:[String],
        required:[true,"Enter Recipe ingredients"]
    },
    process:{
        type:String,
        required:[true,"Enter Recipe procedure"]
    },
    createdBy:{
        type:String,
        required:true
    }, 
    createdAt:{
        type:String,
        required:true
    },
    ID:{
        type:String,
        required:true
    }
})

const Recipe=mongoose.model('Recipe',recipeSchema,'recipes');

module.exports={
    Recipe
}