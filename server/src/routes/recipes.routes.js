import {Router} from 'express';
import mongoose from 'mongoose';
import Recipe from '../models/Recipes.js';
import User from '../models/Users.js';

const router = Router();

router.get('/',async(req,res)=>{
  try {
    const response = await Recipe.find({});
    res.json(response);
  } catch (error) {
    res.json(error)
  }
})

router.post('/',async(req,res)=>{
  const recipe = new Recipe(req.body)
  try {
    const response = await recipe.save();
    return res.status(201).json(response)
  } catch (error) {
    res.json(error)
  }
})

router.put('/',async(req,res)=>{
  try {
      const recipe = await Recipe.findById(req.body.recipeID)
  const user = await User.findById(req.body.userID)
  user.savedRecipes.push(recipe);
  await user.save();
  res.json({savedRecipes:user.savedRecipes})
  } catch (error) {
    res.json(error)
  }

})

router.get("/savedRecipes/id",async(req,res)=>{
  try {
    const user = await User.findById(req.body.userID)
    res.json({savedRecipes:user?.savedRecipes})
  } catch (error) {
    res.json(error)
  }
})

router.get("/savedRecipes",async(req,res)=>{
  try {
    const user = await User.findById(req.body.userID);
    const savedRecipes = await Recipe.find({
      _id:{$in:user.savedRecipes}
    });

    res.json({savedRecipes})
  } catch (error) {
    res.json(error)
  }
})
export default router;
