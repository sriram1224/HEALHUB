import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};
console.log("Cloudinary Config:", {
  cloud_name: djqmqawu9,
  api_key: 265645163574516,
  api_secret:,
});

export default connectCloudinary;
