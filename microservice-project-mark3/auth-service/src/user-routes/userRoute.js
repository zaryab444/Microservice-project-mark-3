const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    allUsers,
    findUserById,
    updateUser,
    deleteUser,
    getUserCount
} = require("../user-controller/userController");
const isAuthenticated = require ("../../../auth-middleware/isAuthenticated")

router.post('/register',  registerUser);
router.post('/login', loginUser);
router.route('/').get(isAuthenticated,allUsers)
router.get('/:id',findUserById);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
router.get('/get/count', getUserCount);

module.exports = router;