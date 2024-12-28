import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  await mongoose.connect(`{process.env.MONGO_URI}/healhub`);
};

export default connectDB;
