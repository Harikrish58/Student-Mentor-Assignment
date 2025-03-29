// Models/studentSchema.js
import mongoose from "mongoose";

// Define the student schema
const studentSchema = mongoose.Schema({
  name: String,
  email: String,
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor",
    default: null,
  },
  previousMentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor",
    default: null,
  },
});

// Create the Student model
const Student = mongoose.model("Student", studentSchema);
export default Student;
