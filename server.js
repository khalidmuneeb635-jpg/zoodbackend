const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // New package we will install
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Allows your frontend (React/HTML) to talk to this server

// --- DATABASE CONNECTION ---
// (Keep your actual connection string from before!)
const MONGO_URI =
  "mongodb+srv://khalidmuneeb635_db_user:zood123@cluster0.xkmgehv.mongodb.net/?appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// --- MODEL ---
const StudentSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  rollNo: String,
  course: String,
  fees: Number,
});
const Student = mongoose.model("Student", StudentSchema);

// --- ROUTES ---

// 1. ADD STUDENT (POST) - The Real Deal
// This accepts data sent from your App/Website
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = new Student(req.body); // "req.body" is the data sent by the user
    await newStudent.save();
    res.json({ message: "Student Added Successfully!", student: newStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET STUDENTS (GET)
app.get("/api/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
