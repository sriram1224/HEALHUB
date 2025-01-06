import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: {
    type: String, default: ""

  },
  address: {
    line1: { type: String, default: "" },
    line2: { type: String, default: "" },
  },
  gender: { type: String, default: "Not Selected" },
  dob: { type: Date, default: Date.now },
  phone: { type: String, default: "0000000000" },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "appointment" }],
});

let User;
try {
  User = mongoose.model("users");
} catch (error) {
  User = mongoose.model("users", userSchema);
}

export default User;
