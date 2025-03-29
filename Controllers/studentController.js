// Controllers/studentController.js
import Student from "../Models/studentSchema.js";
import Mentor from "../Models/mentorSchema.js";

// Create Student
export const createStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }
    const newStudent = new Student({ name, email });
    await newStudent.save();
    res
      .status(201)
      .json({ message: "Student created successfully", data: newStudent }); // Use 201 for creation
  } catch (error) {
    console.error("Error creating student:", error);
    if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to create student. Please try again." });
    }
  }
};

// Get Students without Mentor
export const getStudentsWithoutMentor = async (req, res) => {
  try {
    const students = await Student.find({ mentor: null });
    res.status(200).json({ data: students });
  } catch (error) {
    console.error("Error getting students without mentor:", error);
    res.status(500).json({ message: "Failed to get students without mentor." });
  }
};

// Get Previously Assigned Mentor
export const getPreviousMentor = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate(
      "previousMentor"
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ data: student.previousMentor });
  } catch (error) {
    console.error("Error getting previous mentor:", error);
    res.status(500).json({ message: "Failed to get previous mentor." });
  }
};

// Assign Student to Mentor
export const assignStudentToMentor = async (req, res) => {
  try {
    const { mentorId } = req.body;
    const student = await Student.findById(req.params.studentId);
    const mentor = await Mentor.findById(mentorId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    if (student.mentor) {
      student.previousMentor = student.mentor;
    }
    student.mentor = mentorId;
    await student.save();
    const populatedStudent = await Student.findById(
      req.params.studentId
    ).populate("mentor");
    res
      .status(200)
      .json({ message: "Student assigned", data: populatedStudent });
  } catch (error) {
    console.error("Error assigning student to mentor:", error);
    res.status(500).json({ message: "Failed to assign student to mentor." });
  }
};

// Get all Students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ message: "Failed to get all students." });
  }
};
