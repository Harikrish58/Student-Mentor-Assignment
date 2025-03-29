// Routers/mentorRouter.js
import express from "express";
import { createMentor, addMultipleStudentsToMentor, studentsforMentor, getAllMentors } from "../Controllers/mentorController.js";

const router = express.Router();

router.post("/create", createMentor);
router.patch("/:mentorId/students", addMultipleStudentsToMentor); 
router.get("/:mentorId/students", studentsforMentor); 
router.get("/", getAllMentors)

export default router;