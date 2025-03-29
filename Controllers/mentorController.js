// Controllers/mentorController.js
import Mentor from "../Models/mentorSchema.js";
import Student from "../Models/studentSchema.js";

// Create Mentor
export const createMentor = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }
    const newMentor = new Mentor({ name, email });
    await newMentor.save();
    res
      .status(201)
      .json({ message: "Mentor created successfully", data: newMentor }); // Use 201 for creation
  } catch (error) {
    console.error("Error creating mentor:", error);
    if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to create mentor. Please try again." });
    }
  }
};

//Select one mentor and Add multiple Student
export const addMultipleStudentsToMentor = async (req, res) => {
  try {
    const { studentIds } = req.body;
    const mentor = await Mentor.findById(req.params.mentorId);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    const updated = await Student.updateMany(
      { _id: { $in: studentIds }, mentor: null },
      { mentor: req.params.mentorId }
    );
    const updatedStudents = await Student.find({
      _id: { $in: studentIds },
      mentor: req.params.mentorId,
    }).populate("mentor");
    res.status(200).json({
      message: `${updated.modifiedCount} students assigned`,
      data: updatedStudents,
    });
  } catch (error) {
    console.error("Error adding students to mentor:", error);
    res.status(500).json({
      message: "Internal server error in add multiple Students method",
    });
  }
};

//Get Students for a Particular Mentor
export const studentsforMentor = async (req, res) => {
  try {
    const students = await Student.find({
      mentor: req.params.mentorId,
    }).populate("mentor");
    res.status(200).json({ data: students });
  } catch (error) {
    console.error("Error getting students for mentor:", error);
    res.status(500).json({
      message:
        "Internal server error in Students for a Particular Mentor method",
    });
  }
};

// Get all Mentors
export const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json({ data: mentors });
  } catch (error) {
    console.error("Error getting all mentors:", error);
    res.status(500).json({ message: "Failed to get all mentors." });
  }
};
