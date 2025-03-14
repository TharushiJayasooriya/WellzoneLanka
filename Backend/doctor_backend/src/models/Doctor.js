import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialization: String,
  availability: { type: Boolean, default: false },
});

export default mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
