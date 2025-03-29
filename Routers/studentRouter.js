// Routers/studentRouter.js
import express from "express";
import {
  createStudent,
  getStudentsWithoutMentor,
  getPreviousMentor,
  assignStudentToMentor,
  getAllStudents,
} from "../Controllers/studentController.js";

const router = express.Router();

router.post("/create", createStudent);
router.get("/withoutmentor", getStudentsWithoutMentor);
router.get("/:studentId/mentor", getPreviousMentor);
router.patch("/:studentId/assign", assignStudentToMentor);
router.get("/", getAllStudents)

export default router;
