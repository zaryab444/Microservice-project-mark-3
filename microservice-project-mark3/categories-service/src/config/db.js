const mongoose = require("mongoose");

const connectDB = async () => {
    try {
    //   const conn = await mongoose.connect(process.env.MONGO_URI);
    const conn = await mongoose.connect('mongodb://localhost:27017/category-service');
     console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  };
module.exports =  connectDB