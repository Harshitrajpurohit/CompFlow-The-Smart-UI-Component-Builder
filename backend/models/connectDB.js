import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_KEY);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
  }
}

export default ConnectDB;
