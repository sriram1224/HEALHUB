import express from "express";

import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
connectDB();
//app config
const app = express();

const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
// to connect backend to frontend
app.use(cors());

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
