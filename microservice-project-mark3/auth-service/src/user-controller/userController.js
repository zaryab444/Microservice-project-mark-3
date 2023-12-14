const asyncHandler = require("express-async-handler");
const User = require("../user-model/User");
const jwt = require('jsonwebtoken');

//@desc Register user
//route POST /api/users
//@access Public
//api http://localhost:5000/api/users/register
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    const userExist = await User.findOne({ email });
  
    if (userExist) {
      res.status(400);
      return res.json({ message: "User Already Exist" });
    }
    // if (user) {
        let user = await User.create({
            name,
            email,
            password,
          });
          if(user){
            user.save();
            return res.json(user);
          }
          else {
            return res.status(400).json({message: 'Invalid user data'});
          }
  });

  //@desc Login user
//route POST /api/users/login
//@access Public
//api http://localhost:5000/api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(user && (await user.matchPassword(password))){
    const token = jwt.sign(
      {
          userId: user.id,
          //admin user can only use the token to process operation not user
          isAdmin: user.isAdmin
      },
     'secret',
      {expiresIn : '1d'}
  ) 
  res.status(200).send({user: user.email , token: token}) 
  }
  else {
    return res.status(401).json({message: 'Invalid email or password'});
  }
});


  module.exports = {
    registerUser,
    loginUser
  };