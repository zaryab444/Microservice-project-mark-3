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

//@desc GET Category
//route GET /api/categories
//@access Private
//api http://localhost:4000/api/categories
const getAllCategories = asyncHandler(async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

//@desc GET CategoryId
//route GET /api/categories/:id
//@access Private
//api http://localhost:4000/api/categories/:id
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req?.params?.id);
  if (!category) {
    return res
      .status(404)
      .send("the category with the given ID cannot be created");
  }
  res.status(200).send(category);
});



//@desc PUT CategoryId
//route PUT /api/categories/:id
//@access Private
//api http://localhost:4000/api/categories/:id
const getUpdateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    {
      new: true,
    }
  );
  if (!category) return res.status(404).send("the category cannot be updated");
  res.send(category);
});

//@desc DELETE CategoryId
//route DELETE /api/categories/:id
//@access Private
//api http://localhost:4000/api/categories/:id
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await Category.deleteOne({ _id: category._id });
    return res.status(200).json({ message: 'Category Deleted' });
});

module.exports = {
  postCategory,
  getAllCategories,
  getCategoryById,
  getUpdateCategory,
  deleteCategory
};
