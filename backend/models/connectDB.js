import mongoose from "mongoose";

async function ConnectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/compflow");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
  }
}

export default ConnectDB;
