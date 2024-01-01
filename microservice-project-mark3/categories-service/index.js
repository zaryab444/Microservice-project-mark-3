const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const cookieParser = require("cookie-parser");
const categoryRoutes = require("./src/categories-routes/categoryRoute");

dotenv.config();

connectDB();

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Cookie parser middleware
app.use(cookieParser());

// // User Api routes
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(`Category Server running in development mode on port ${PORT}`)
);
