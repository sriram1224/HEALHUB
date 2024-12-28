import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  await mongoose.connect(`{process.env.MONGO_URI}/healhub`);
  mongoose.connection.on("connected", () => {
    console.log("MongoDB is connected");
  });
};

export default connectDB;
