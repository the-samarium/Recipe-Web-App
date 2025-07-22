const { Recipe } = require("../model/recipeSchema")


const fs = require('fs');

const recipe_post = async (req, res) => {
    try {
        const { title, ingredients, procedure } = req.body;

        const newRecipe = await Recipe.create({
            title,
            ingredients: Array.isArray(ingredients) ? ingredients : ingredients.split(',').map(i => i.trim()),
            process: procedure,  // fix the field name
            createdBy: res.locals.user.name,
            createdAt: Date.now().toString(),
            ID:res.locals.user._id, //Passed in same id for reciepe to match user
        });

        console.log("Recipe stored in collection:", newRecipe);
        return res.redirect('/home');
    }
    catch (err) {
        console.log("Error occured: ", err);
    }

}

const deleteRecipe=async (req,res)=>{
    try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    
  } catch (err) {
    res.status(500).send('Server Error');
  }
}



module.exports = {
    recipe_post,
    deleteRecipe,
   
}