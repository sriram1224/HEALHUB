import express from "express";

import cors from "cors";
import "dotenv/config";

//app config
const app = express();

const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
// to connect backend to frontend
app.use(cors());

app.get("/", (req, res) => {
  res.set("Api is working");
});
