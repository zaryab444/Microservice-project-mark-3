const asyncHandler = require("express-async-handler");
const User = require("../user-model/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

//@desc Register user
//route POST /api/users
//@access Public
//api http://localhost:5000/api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country
  } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    return res.json({ message: "User Already Exist" });
  }
  let user = await User.create({
    name,
    email,
    password,
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country
  });
  if (user) {
    user.save();
    return res.json(user);
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

//@desc Login user
//route POST /api/users/login
//@access Public
//api http://localhost:5000/api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign(
      {
        userId: user.id,
        //admin user can only use the token to process operation not user
        isAdmin: user.isAdmin,
      },
      "secret",
      { expiresIn: "1d" }
    );
    res.status(200).send({ user: user.email, token: token });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

//@desc Get all user
//route GET /api/users
//@access Public
//api http://localhost:5000/api/users
const allUsers = asyncHandler(async (req, res) => {
  const userList = await User.find().select("-password");
  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

//@desc Get User by Id
//route GET /api/users/:id
//@access Public
//api http://localhost:5000/api/users/:id
const findUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) {
    res
      .status(500)
      .json({ message: "The user with the given ID was not found." });
  }
  res.status(200).send(user);
});

//@desc Update User by Id
//route PUT /api/users/:id
//@access Public
//api http://localhost:5000/api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const userExist = await User.findById(req.params.id);
  let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.password;
    }
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        },
        { new: true}
    )
    if(!user)
    return res.status(400).send('the user cannot be created!')
    res.send(user);
})

//@desc delete User by Id
//route DELETE /api/users/:id
//@access Public
//api http://localhost:5000/api/users/:id
const deleteUser = asyncHandler(async (req,res) => {
  User.findByIdAndRemove(req.params.id).then(user =>{
    if(user) {
        return res.status(200).json({success: true, message: 'the user is deleted!'})
    } else {
        return res.status(404).json({success: false , message: "user not found!"})
    }
}).catch(err=>{
   return res.status(500).json({success: false, error: err}) 
})
})


//@desc get User count
//route GET /api/users/get/count
//@access Public
//api http://localhost:5000/api/users/get/count
const getUserCount = asyncHandler(async (req, res) => {
  try {
    const userCount = await User.countDocuments();

    if (!userCount) {
      res.status(500).json({ success: false });
    }

    res.send({
      userCount: userCount,
    });
  } catch (error) {
    // Handle errors, e.g., log or send an appropriate response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


module.exports = {
  registerUser,
  loginUser,
  allUsers,
  findUserById,
  updateUser,
  deleteUser,
  getUserCount
};
