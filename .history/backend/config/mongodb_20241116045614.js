import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/healhub`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on("connected", () => {
      console.log("MongoDB is connected");
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
