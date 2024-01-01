const { Category } = require("../categories-model/Category");
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

//@desc Add Category
//route POST /api/categories
//@access Public
//api http://localhost:4000/api/categories/post
const postCategory = asyncHandler(async (req, res) => {
  //this is the promise way logic part1 using async await
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) return res.status(404).send("the category cannot be created");
  res.send(category);
});

const getAllCategories = asyncHandler(async (req, res) => {
    const categoryList = await Category.find();

    if(!categoryList){
        res.status(500).json({success: false})
    }
    res.status(200).send(categoryList)
})

module.exports = {
  postCategory,
  getAllCategories
};
