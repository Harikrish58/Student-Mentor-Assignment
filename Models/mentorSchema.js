// Models/mentorSchema.js
import mongoose from "mongoose";

// Define the mentor schema
const mentorSchema = mongoose.Schema({
  name: String,
  email: String,
});

// Create the Mentor model
const Mentor = mongoose.model("Mentor", mentorSchema);

export default Mentor;