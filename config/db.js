import pkg from "colors";
const { bgMagenta, bgRed } = pkg;
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `Connected to mongodb database ${conn.connection.host}`.bgMagenta
    );
  } catch (error) {
    console.log(`Error in connecting to database  ${error}`.bgRed.white);
  }
};

export default connectDB;
