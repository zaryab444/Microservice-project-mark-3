const express = require("express");
const router = express.Router();
const {
    postCategory,
    getAllCategories,
    getCategoryById,
    getUpdateCategory,
    deleteCategory
} = require("../categories-controller/categoryController");
const isAuthenticated = require ("../../../auth-middleware/isAuthenticated");

router.get('/',  getAllCategories);
router.route('/:id').put(isAuthenticated,getUpdateCategory);
router.route('/:id').get(isAuthenticated,getCategoryById);
router.route('/post').post(isAuthenticated,postCategory);
router.route('/:id').delete(isAuthenticated,deleteCategory);

module.exports = router;