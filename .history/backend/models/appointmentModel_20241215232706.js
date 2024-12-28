import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  doctorId: { type: String, required: true },
  slotDate: { type: Date, required: true },
  slotTime: { type: String, required: true },
  userData: { type: Object, required: true },
  docData: { type: Object, required: true },
  amount: { type: Number, required: true },
});
