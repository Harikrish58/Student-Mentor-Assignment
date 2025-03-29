// index.js (Main application file)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./Database/config.js";
import studentRouter from "./Routers/studentRouter.js";
import mentorRouter from "./Routers/mentorRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // Connect to MongoDB

// Routes
app.use("/api/mentors", mentorRouter);
app.use("/api/students", studentRouter);

// Basic route for testing
app.get("/", (req, res) => {
  res.status(200).send("Student-Mentor assignation");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`App is running in the port`);
});
