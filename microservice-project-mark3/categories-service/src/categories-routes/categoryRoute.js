const express = require("express");
const router = express.Router();
const {
    postCategory,
    getAllCategories
} = require("../categories-controller/categoryController");
const isAuthenticated = require ("../../../auth-middleware/isAuthenticated");

router.get('/',  getAllCategories);
router.route('/post').post(isAuthenticated,postCategory)

module.exports = router;