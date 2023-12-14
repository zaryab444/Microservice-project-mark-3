const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const cookieParser = require("cookie-parser");
const userRoutes = require("./src/user-routes/userRoute");

dotenv.config();

connectDB();

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Cookie parser middleware
app.use(cookieParser());

// // User Api routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`User Server running in development mode on port ${PORT}`)
);
