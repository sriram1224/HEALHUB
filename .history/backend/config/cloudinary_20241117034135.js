import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: "djqmqawu9",
    api_key: 265645163574516,
    api_secret: "fu_K7um6HTyou7wlIlIF0ZFOM-Y",
  });
  console.log(process.env.CLOUDINARY_API_KEY);
};

export default connectCloudinary;
